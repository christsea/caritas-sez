const { DateTime } = require("luxon")
const striptags = require("striptags")
const slugify = require("slugify")
const Image = require("@11ty/eleventy-img")
const path = require("path")

module.exports = function (eleventyConfig) {
  /* ─── Filters ─────────────────────────────────────────────────── */
  eleventyConfig.addFilter("date", (dateObj, format = "yyyy") =>
    DateTime.fromJSDate(new Date(dateObj)).toFormat(format)
  )
  eleventyConfig.addFilter("readableDate", (dateObj) =>
    DateTime.fromJSDate(new Date(dateObj)).toFormat("dd LLL yyyy")
  )
  eleventyConfig.addFilter("where", (array = [], prop, val) =>
    array.filter((item) => {
      let v = prop.split(".").reduce((o, k) => (o ? o[k] : undefined), item)
      return v === val
    })
  )
  eleventyConfig.addFilter("byTag", (col, tag) =>
    col.filter((p) => p.data.tags && p.data.tags.includes(tag))
  )
  // URL-safe slug for tags
  eleventyConfig.addFilter("slug", (tag) =>
    slugify(tag, { lower: true, strict: true })
  )

  eleventyConfig.addFilter("striptags", (str) => striptags(str))
  eleventyConfig.addFilter("truncate", (str = "", len = 160, end = "…") =>
    str.length > len ? str.slice(0, len) + end : str
  )
  eleventyConfig.addFilter("breadcrumbs", (url) => {
    if (!url || typeof url !== "string") return []
    const clean = url.replace(/^\/|\/$/g, "")
    if (!clean) return [{ name: "Home", url: "/" }]
    return clean.split("/").reduce(
      (acc, seg) => {
        const prev = acc[acc.length - 1].url
        const name = seg
          .replace(/-/g, " ")
          .replace(/^./, (c) => c.toUpperCase())
        acc.push({ name, url: `${prev}${seg}/` })
        return acc
      },
      [{ name: "Home", url: "/" }]
    )
  })

  /* ─── Collections ─────────────────────────────────────────────── */
  eleventyConfig.addCollection("tagList", (api) => {
    const tags = new Set()
    api
      .getFilteredByGlob("src/blog/*.md")
      .forEach((post) => (post.data.tags || []).forEach((t) => tags.add(t)))
    return [...tags]
  })
  eleventyConfig.addCollection("categoryList", (api) => {
    const cats = new Set()
    api
      .getFilteredByGlob("src/blog/*.md")
      .forEach((post) =>
        (post.data.categories || []).forEach((c) => cats.add(c))
      )
    return [...cats]
  })

  eleventyConfig.addCollection("blog", (collectionApi) => {
    return (
      collectionApi
        // ① match all the markdown in src/blog
        .getFilteredByGlob("src/blog/*.md")
        // ② drop the listing template if it ever sneaks in
        .filter((post) => post.filePathStem !== "/blog/index")
        .reverse()
    ) // newest first
  })

  eleventyConfig.addCollection("newsletters", (api) =>
    api.getFilteredByGlob("src/newsletters/*.md").reverse()
  )
  eleventyConfig.addCollection("galleries", (api) =>
    api.getFilteredByGlob("src/galleries/*.md")
  )
  eleventyConfig.addCollection("events", (api) =>
    api.getFilteredByGlob("src/events/*.md").reverse()
  )
  // Create 'team' collection
  eleventyConfig.addCollection("team", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/team/*.md")
  })
  eleventyConfig.addFilter("sortByOrder", function (collection) {
    if (!collection) return []
    return collection.sort((a, b) => {
      return (a.data.order || 999) - (b.data.order || 999)
    })
  })
  // ① Filter only future events, sorted soonest→latest
  eleventyConfig.addCollection("upcomingEvents", (collectionApi) => {
    let now = Date.now()
    return collectionApi
      .getFilteredByGlob("src/events/*.{md,njk}")
      .filter((evt) => Date.parse(evt.data.date) >= now)
      .sort((a, b) => Date.parse(a.data.date) - Date.parse(b.data.date))
  })

  eleventyConfig.addFilter("ensureLeadingSlash", function (path) {
    return path.startsWith("/") ? path : "/" + path
  })

  eleventyConfig.addFilter("resolveImage", function (imagePath) {
    // Handle both front matter paths and generated images
    if (imagePath.includes("/generated/")) {
      return imagePath
    }
    return `/images/${imagePath.replace(/^\/?images\//, "")}`
  })

  eleventyConfig.on("eleventy.after", async () => {
    const fs = require("fs")
    const testPath = path.join("dist", "images", "blog", "caritas-sey.jpg")
    console.log("Image exists:", fs.existsSync(testPath), "at", testPath)
  })

  eleventyConfig.addFilter("fixImageUrl", function (url) {
    if (!url) return ""
    // Remove any duplicate slashes or incorrect prefixes
    return url
      .replace(/([^:]\/)\/+/g, "$1")
      .replace(/^\/+/, "/")
      .replace(/^\/src/, "")
  })

  /* ─── Passthrough Copy ────────────────────────────────────────── */
  eleventyConfig.addPassthroughCopy("src/css")
  eleventyConfig.addPassthroughCopy("src/js")
  // eleventyConfig.addPassthroughCopy("src/images")
  eleventyConfig.addPassthroughCopy({
    "src/images": "images" // Ensures 1:1 mapping
  })
  eleventyConfig.addPassthroughCopy("src/downloads")
  eleventyConfig.addPassthroughCopy("src/admin")
  eleventyConfig.addPassthroughCopy("src/robots.txt")

  // 1) Define an async shortcode to generate images
  eleventyConfig.addNunjucksAsyncShortcode(
    "image",
    async function (
      src,
      alt = "",
      widths = [400, 800, 1200],
      formats = ["avif", "webp", "jpeg"],
      sizes = "100vw"
    ) {
      let relative = src.replace(/^\/+/, "") // remove leading slashes
      let inputPath = path.join("src", relative) // e.g. "src/images/events/…"
      let metadata = await Image(inputPath, {
        widths,
        formats,
        outputDir: "./dist/images/", // outputDir: "./dist/images/generated/",
        urlPath: "/images/"
      })

      // Pick the smallest jpeg as the fallback src
      let lowestSrc = metadata.jpeg[0]

      // Create srcset strings for each format
      let srcsetStrings = formats.map((format) =>
        metadata[format]
          .map((image) => `${image.url} ${image.width}w`)
          .join(", ")
      )

      // Assemble the <picture> element
      return `
<picture>
  ${formats
    .map(
      (format, i) => `
    <source
      type="image/${format}"
      srcset="${srcsetStrings[i]}"
      sizes="${sizes}"
    >
  `
    )
    .join("")}

  <img
    src="${lowestSrc.url}"
    width="${lowestSrc.width}"
    height="${lowestSrc.height}"
    alt="${alt}"
    loading="lazy"
    decoding="async"
    class="img-fluid rounded"
  >
</picture>
`
    }
  )

  /* ─── Eleventy Config ────────────────────────────────────────── */
  return {
    // Make absolutely sure .md is processed
    templateFormats: ["md", "njk", "html"],

    dir: {
      input: "src",
      includes: "_includes",
      output: "dist"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  }
}
