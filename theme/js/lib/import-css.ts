export const importCss = () => {
  const preloads = Array.from(document.querySelectorAll("link[rel=\"preload\"][as=\"style\"]")) as HTMLLinkElement[]

  for (const preload of preloads) {
    const href = preload.href
    const style = document.createElement("link")
    style.rel = "stylesheet"
    style.href = href
    document.head.appendChild(style)
  }
}
