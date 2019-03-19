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

const get = promisify(request.get)
get("http://distsn.org/cgi-bin/distsn-misskey-instances-api.cgi", { json: true })
  .then((res) => {
    const notregistered = res.body.map(e => e.hostName)
      .filter(e => mylist.findIndex(x => x.url === e) < 0)

    if (notregistered.length > 0) console.log(`${notregistered.join(",\n")}\n\n${notregistered.length === 1 ? "is" : "are"} not listed.`)
    else console.log("Every instance is listed!")
  })
