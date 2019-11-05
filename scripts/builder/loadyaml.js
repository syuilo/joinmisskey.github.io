const readyaml = require("js-yaml").safeLoad
const fs = require("fs")

module.exports = (filepath) => {
  return readyaml(fs.readFileSync(filepath))
}
