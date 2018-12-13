const util = require('util')
const promisify = util.promisify
const fs = require('fs')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const download = require('download')
const fileType = require('file-type')
const glob = require('glob')
const getHash = require('./gethash')
const mkdirp = require('mkdirp')

module.exports = async (name, url, temp_dir, alwaysReturn) => {
    mkdirp.sync(temp_dir)
    const files = glob.sync(`${temp_dir}${name}.{png,jpg,jpeg,gif}`)
    if(files.length > 0){
        // console.log('Getting image: ' + url)
        const remote = await download(url).catch(() => false)
        if(!remote) return false
        const ext = fileType(remote).ext
        const local = await readFile(`${temp_dir}${name}.${ext}`).catch(() => { return false })
        if(!local) return false
        if (getHash(remote, 'sha384', 'binary', 'base64') != getHash(local, 'sha384', 'binary', 'base64')) {
            await writeFile(`${temp_dir}${name}.${ext}`, remote)
            return { name: name, ext: ext }
        } else {
            if(alwaysReturn) return { name: name, ext: ext }
            else return false
        }
    } else {
        console.log('Getting new image: ' + url)
        return download(url).then(async data => {
            const ext = fileType(data).ext
            await writeFile(`${temp_dir}${name}.${ext}`, data)
            return { name: name, ext: ext }
        }).catch(reason => {
            console.log('Cannot get the image: ' + reason)
            return false
        })
    }
}