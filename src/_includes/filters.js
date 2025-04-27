const striptags = require("striptags")

module.exports = function (eleventyConfig) {
  // strip HTML
  eleventyConfig.addFilter("striptags", (s) => striptags(s))

  // truncate with ellipsis
  eleventyConfig.addFilter("truncate", (str = "", len = 160, end = "…") =>
    str.length > len ? str.slice(0, len) + end : str
  )
}
