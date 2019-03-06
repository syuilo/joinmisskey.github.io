const SVGOp = require("svgo")
const through2 = require("through2")

module.exports = (options) => {
  const osvg = new SVGOp(options)
  return through2.obj(
    (file, encode, cb) => {
      if (!file) {
        return cb(null, file)
      }
      if (file.isBuffer()) {
        const file2 = file
        osvg.optimize(file.contents.toString()).then((svg) => {
          file2.contents = Buffer.from(svg.data)
          return cb(null, file)
        })
      }
      if (file.isStream()) {
        return cb(this.emit("error", new Error("maqz:svgo", "Streaming not supported")))
      }
      return cb("What's input type?", null)
    }
  )
}
