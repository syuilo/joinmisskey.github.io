export const twemojiinit = async () => {
  const { parse } = require("twemoji")
  parse(document.body, {
    ext: ".svg",
    folder: "svg"
  })
}
