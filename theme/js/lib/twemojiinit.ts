export const twemojiinit = async () => {
  const { parse } = await import("twemoji/dist/twemoji.npm.js")
  parse(document.body, {
    ext: ".svg",
    folder: "svg"
  })
}
