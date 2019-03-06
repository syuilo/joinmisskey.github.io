const { promisify } = require("util")
const fs = require("fs")
const download = require("download")
const fileType = require("file-type")
const glob = require("glob")
const mkdirp = require("mkdirp")
const glog = require("fancy-log")
const getHash = require("./gethash")

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

module.exports = async (name, url, tempDir, alwaysReturn) => {
  mkdirp.sync(tempDir)
  const files = glob.sync(`${tempDir}${name}.{png,jpg,jpeg,gif}`)
  if (files.length > 0) {
    // glog("Getting image: " + url)
    const remote = await download(url).catch(() => false)
    if (!remote) return false
    const { ext } = fileType(remote)
    const local = await readFile(`${tempDir}${name}.${ext}`).catch(() => false)
    if (!local) return false
    if (getHash(remote, "sha384", "binary", "base64") !== getHash(local, "sha384", "binary", "base64")) {
      await writeFile(`${tempDir}${name}.${ext}`, remote)
      return { name, ext }
    }
    if (alwaysReturn) return { name, ext }
    return false
  }
  glog(`Getting new image: ${url}`)
  return download(url).then(async (data) => {
    const { ext } = fileType(data)
    await writeFile(`${tempDir}${name}.${ext}`, data)
    return { name, ext }
  }).catch((reason) => {
    glog(`Cannot get the image: ${reason}`)
    return false
  })
}
