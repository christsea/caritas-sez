const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Date filters
  eleventyConfig.addFilter("date", function (dateObj, format = "yyyy") {
    return DateTime.fromJSDate(new Date(dateObj)).toFormat(format);
  });
  eleventyConfig.addFilter("readableDate", function (dateObj) {
    return DateTime.fromJSDate(new Date(dateObj)).toFormat("dd LLL yyyy");
  });
  eleventyConfig.addCollection("blog", function (collectionApi) {
    // Adjust the glob pattern depending on your file extensions (e.g., njk, md)
    return collectionApi
      .getFilteredByGlob("src/blog/!(*index*).{md,njk}")
      .reverse();
  });

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/downloads");

  // IMPORTANT: Passthrough for the admin interface
  eleventyConfig.addPassthroughCopy("admin");

  return {
    dir: {
      input: "src", // Your content source folder
      includes: "_includes", // Location for includes/layouts
      output: "dist",
    },
    dataTemplateEngine: "njk",
  };
};
