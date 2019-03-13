const SVGOp = require("svgo")
const through2 = require("through2")

module.exports = (options) => {
  const osvg = new SVGOp(options)
  return through2.obj(
    (file, encode, cb) => {
      if (!file || file.isNull()) {
        return cb(null, file)
      }
      if (file.isBuffer()) {
        const file2 = file
        return osvg.optimize(file.contents.toString())
          .then((svg) => {
            file2.contents = Buffer.from(svg.data)
            cb(null, file)
          })
      }
      if (file.isStream()) {
        return cb(new Error("maqz:svgo", "Streaming not supported"), null)
      }
      return cb("What's input type?", null)
    }
  )
}
