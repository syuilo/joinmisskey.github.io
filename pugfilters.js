module.exports = {
    md: (str) => {
        let htm = require('kramed')(str)
        htm = require('./scripts/better_markdown')(htm, require('./.config/default.json').url.path)
        htm = require('./scripts/highl')(htm)
        htm = require('html-minifier').minify(htm, {"collapseWhitespace": true,"removeEmptyAttributes": false,"removeEmptyElements": false})
        return htm
    },
    markdown: (str) => {
        return (require('kramed')(str))
    },
    mfm: (str) => {
        let htm = require('mfmf').render(str, {})
        return htm
    },
    oneline: (str) => {
        return str.replace(/\r?\n/g,"")
    }
}