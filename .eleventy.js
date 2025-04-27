const { DateTime } = require("luxon")
const striptags = require("striptags")
const slugify = require("slugify")

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
  eleventyConfig.addCollection("blog", (api) =>
    api.getFilteredByGlob("src/blog/*.md").reverse()
  )
  eleventyConfig.addCollection("newsletters", (api) =>
    api.getFilteredByGlob("src/newsletters/*.md").reverse()
  )
  eleventyConfig.addCollection("galleries", (api) =>
    api.getFilteredByGlob("src/galleries/*.md")
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

  /* ─── Passthrough Copy ────────────────────────────────────────── */
  eleventyConfig.addPassthroughCopy("src/css")
  eleventyConfig.addPassthroughCopy("src/js")
  eleventyConfig.addPassthroughCopy("src/images")
  eleventyConfig.addPassthroughCopy("src/downloads")
  eleventyConfig.addPassthroughCopy("src/admin") // <-- ensure CMS assets
  eleventyConfig.addPassthroughCopy("src/robots.txt")

  /* ─── Eleventy Config ────────────────────────────────────────── */
  return {
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
