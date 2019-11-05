export const twemojiinit = async () => {
  const { parse } = await import("twemoji")
  parse(document.body, {
    ext: ".svg",
    folder: "svg"
  })
}
