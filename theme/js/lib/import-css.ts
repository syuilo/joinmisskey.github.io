export const importCss = async () => {
  const preloads = Array.from(document.querySelectorAll("link[rel=\"preload\"][as=\"style\"]")) as HTMLLinkElement[]

  const styles = [] as Array<Promise<void>>
  for (const preload of preloads) {
    styles.push(new Promise((res, rej) => {
      const href = preload.href
      const style = document.createElement("link")
      style.rel = "stylesheet"
      style.href = href
      style.onload = () => res()
      style.onerror = e => rej(e)
      document.head.appendChild(style)
    }))
  }

  return Promise.all(styles)
}
