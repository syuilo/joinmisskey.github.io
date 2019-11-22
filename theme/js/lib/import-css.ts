export const importCss = () => {
  for (const preload
    of document.querySelectorAll("link[rel=\"preload\"][as=\"style\"]") as unknown as HTMLLinkElement[]) {
    const href = preload.href
    const style = document.createElement("link")
    style.rel = "stylesheet"
    style.href = href
    document.head.appendChild(style)
  }
}
