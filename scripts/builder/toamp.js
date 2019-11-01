const sizeOf = require("image-size")
const { JSDOM } = require("jsdom")
const glog = require("fancy-log")

const { library, icon } = require("@fortawesome/fontawesome-svg-core")

const messages = require("../../.config/messages.json")

library.add(
  require("@fortawesome/free-solid-svg-icons").fas,
  require("@fortawesome/free-regular-svg-icons").far,
  require("@fortawesome/free-brands-svg-icons").fab
)

module.exports = (htm, urlPrefix) => {
  const { window } = new JSDOM(htm)
  const { document } = window
  document.querySelectorAll("img[src]").forEach((el) => {
    // eslint-disable-next-line no-shadow
    const src = el.getAttribute("src")
    const alt = el.getAttribute("alt")
    const title = el.getAttribute("title")
    const id = el.getAttribute("id")
    const $class = el.getAttribute("class")
    let width = el.getAttribute("width")
    let height = el.getAttribute("height")
    if (!width || !height) {
      if (src.startsWith(`${urlPrefix}/files/`)) {
        const dims = sizeOf(`.${src.slice(urlPrefix.length)}`)
        // eslint-disable-next-line prefer-destructuring
        width = dims.width
        // eslint-disable-next-line prefer-destructuring
        height = dims.height
      } else if (src.startsWith("http") || src.startsWith("//")) {
        glog(`外部ドメインのファイルはampではエラーになります: \n${src}`)
        return
      } else {
        glog(`${messages.amp.invalid_imageUrl}:\n${src}`)
        return
      }
    }
    const ampimg = document.createElement("amp-img")
    ampimg.setAttribute("src", src)
    if (alt) ampimg.setAttribute("alt", alt)
    if (title) ampimg.setAttribute("title", title)
    if (id) ampimg.setAttribute("id", id)
    if ($class) ampimg.setAttribute("class", $class)
    if (width) ampimg.setAttribute("width", width)
    if (height) ampimg.setAttribute("height", height)
    ampimg.setAttribute("layout", "responsive")
    el.insertAdjacentElement("afterend", ampimg)
    el.remove()
  })
  // eslint-disable-next-line no-restricted-syntax
  for (const el of Array.from(document.getElementsByTagName("i"))) {
    try {
      el.insertAdjacentHTML("afterend", icon(
        { iconName: el.dataset.faIconName, prefix: el.dataset.faPrefix },
        (el.dataset.faOption ? JSON.parse(el.dataset.faOption.replace(/'/g, "\"")) : {})
      ).html[0])
      el.remove()
    } catch (e) {
      glog(`FontAwesome: ${el.dataset.faPrefix} ${el.dataset.faIconName}は見つかりませんでした。`)
      glog(e)
    }
  }

  return document.body.innerHTML
}
