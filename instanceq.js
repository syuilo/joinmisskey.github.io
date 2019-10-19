/* eslint-disable no-console */

const fs = require("fs")
const readyaml = require("js-yaml").safeLoad
const request = require("request")
// const scrape = require("cheerio-httpcli")
const util = require("util")

const { promisify } = util

function loadyaml(filepath) {
  return readyaml(fs.readFileSync(filepath))
}

const mylist = loadyaml("./data/instances.yml")

const duplicated = mylist.filter((e, i, arr) => arr.findIndex(x => x.url === e.url) !== i)
  .map(e => e.url)
if (duplicated.length > 0) console.log(`Duplicated:\n  ${duplicated.join(",\n  ")}\n`)
else console.log("Duplicated:\n  There is no duplicated instance!\n")
/*
const get = promisify(request.get)
get("http://distsn.org/cgi-bin/distsn-misskey-instances-api.cgi", { json: true })
  .then((res) => {
    const notregistered = res.body.map(e => e.hostName)
      .filter(e => mylist.findIndex(x => x.url === e) < 0)

    if (notregistered.length > 0) console.log(`Not listed:\n  ${notregistered.join(",\n  ")}\n`)
    else console.log("Not listed:\n  Every Misskey instances are listed!")
  })
*/