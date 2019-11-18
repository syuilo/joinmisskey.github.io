const path = require("path")
const extend = require("extend")
const loadyaml = require("./builder/loadyaml")
const argv = require("./argv")

module.exports = extend(true,
  require("../.config/default.json"),
  require("../.config/lang.json"),
  loadyaml(path.join(__dirname, "../.config/images.yaml")),
  // process.env.CI === "true" ? loadyaml("../.config/actions-override.yaml") : {},
  argv._.some((e) => e === "local-server") ? require("../.config/debug-override.json") : {})
