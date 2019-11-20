module.exports = htm => {
  let headingHtml
  const headings = []
  const regHeading = /<h([1-6])(.*?)>([^]*?)<\/h(\1)>/gi
  // eslint-disable-next-line no-cond-assign
  while ((headingHtml = regHeading.exec(htm)) !== null) {
    const heading = {}
    let idmatch = []
    let classmatch = []
    idmatch = headingHtml[2].match(/id=(["'])(.*?)(\1)/)
    classmatch = headingHtml[2].match(/class=(["'])(.*?)(\1)/)
    if (idmatch == null) {
      heading.id = null
    } else {
      [, , heading.id] = idmatch
    }
    [heading.html, heading.number, heading.attr, heading.text] = headingHtml
    if (classmatch == null || classmatch[2].indexOf("noindex") === -1) headings.push(heading)
  }
  return headings
}
