const { DateTime } = require("luxon");

const pluginSitemap = require("eleventy-plugin-sitemap");

module.exports = function (eleventyConfig) {
  // Date filters for formatting dates in templates
  eleventyConfig.addFilter("date", function (dateObj, format = "yyyy") {
    return DateTime.fromJSDate(new Date(dateObj)).toFormat(format);
  });
  eleventyConfig.addFilter("readableDate", function (dateObj) {
    return DateTime.fromJSDate(new Date(dateObj)).toFormat("dd LLL yyyy");
  });

  // Custom filter to get posts by tag
  eleventyConfig.addFilter("byTag", function (collection, tag) {
    return collection.filter(
      (post) => post.data.tags && post.data.tags.includes(tag)
    );
  });

  eleventyConfig.addFilter("byTag", function (collection, tag) {
    return collection.filter(function (post) {
      return post.data.tags && post.data.tags.indexOf(tag) > -1;
    });
  });

  // Define a blog collection (adjust the glob as needed)
  eleventyConfig.addCollection("blog", function (collectionApi) {
    // Exclude the index listing file if needed:
    return collectionApi
      .getFilteredByGlob("src/blog/!(*index*).{md,njk}")
      .reverse();
  });

  // Explicit collection for newsletters (if needed)
  eleventyConfig.addCollection("newsletters", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/newsletters/*.{md,njk}");
  });

  eleventyConfig.addCollection("galleries", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/galleries/*.{md,njk}");
  });

  // Breadcrumbs filter
  eleventyConfig.addFilter("breadcrumbs", function (url) {
    // Ensure we have a string URL, otherwise return an empty array
    if (!url || typeof url !== "string") {
      return [];
    }
    // Remove leading and trailing slashes for uniformity
    let cleanUrl = url.replace(/^\/|\/$/g, "");
    // If the cleaned URL is empty, return just Home
    if (cleanUrl === "") {
      return [{ name: "Home", url: "/" }];
    }
    let segments = cleanUrl.split("/");
    let breadcrumbs = [{ name: "Home", url: "/" }];
    let path = "";
    segments.forEach((segment) => {
      // Build up the URL path
      path += "/" + segment;
      // Convert slug to a more human-friendly name:
      let name = segment.replace(/-/g, " ");
      name = name.charAt(0).toUpperCase() + name.slice(1);
      breadcrumbs.push({ name: name, url: path + "/" });
    });
    return breadcrumbs;
  });

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/downloads");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/test.txt");

  // Sitemap plugin
  eleventyConfig.addPlugin(pluginSitemap, {
    sitemap: {
      hostname: "https://caritas-sez.netlify.app", // ← your production URL
    },
  });

  return {
    // Tell Eleventy to use Nunjucks for all template file types, including Markdown:
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "src", // Content source folder
      includes: "_includes", // Location for includes/layouts
      output: "dist",
    },
    dataTemplateEngine: "njk",
  };
};
