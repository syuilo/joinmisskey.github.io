
const pugfilters = module.exports = {}
const site = require('./.config/default.json')

pugfilters.md = function(str) {
    let htm = require('kramed')(str)
    htm = require('./scripts/better_markdown')(htm, site.url.path)
    htm = require('./scripts/highl')(htm)
    htm = require('html-minifier').minify(htm, {"collapseWhitespace": true,"removeEmptyAttributes": false,"removeEmptyElements": false})
    return htm
}
pugfilters.mfm = function(str) {
    let htm = require('mfmf').render(str, {})
    return htm
}
pugfilters.oneline = function(str) {
    return str.replace(/\r?\n/g,"")
}