/* eslint-disable global-require */
const site = require("./scripts/site")

module.exports = {
  md: str => {
    let htm = require("marked")(str)
    htm = require("./scripts/better_markdown")(htm, require("./.config/default.json").url.path, site.image_compressing_strategy_version)
    htm = require("./scripts/highl")(htm)
    htm = require("html-minifier").minify(htm, { collapseWhitespace: true, removeEmptyAttributes: false, removeEmptyElements: false })
    return htm
  },
  markdown: str => (require("marked")(str)),
  oneline: str => str.replace(/\r?\n/g, "")
}
