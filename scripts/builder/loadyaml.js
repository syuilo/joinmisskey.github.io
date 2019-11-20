const readyaml = require("js-yaml").safeLoad
const fs = require("fs")

module.exports = filepath => readyaml(fs.readFileSync(filepath))
