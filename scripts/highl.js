/* eslint-disable prefer-const */
/* eslint-disable spaced-comment */
/* eslint-disable no-console */
const Prism = require("prismjs")
const cheerio = require("cheerio")

module.exports = (htm) => {
  const $ = cheerio.load(htm, { decodeEntities: false })
  $("code").each((i, el) => {
    const cl = $(el).attr("class")

    const langcl = cl ? cl.split(" ")
      .find(e => e.startsWith("language-") || e.startsWith("lang-")) : null

    if (!langcl) {
      $(el).addClass("language-javascript")
    }

    let lang = langcl ? langcl.replace("language-", "")
      .replace("lang-", "")
      : "javascript"

    const grammer = Prism.languages[lang]

    if (!grammer) lang = "javascript"

    $(el).html(
      Prism.highlight(
        $(el).text(), Prism.languages[lang], lang
      )
    )

    $(el).parent("pre").addClass(`language-${lang}`)
  })
  return $("body").html()
}
