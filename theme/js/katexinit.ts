export const katexinit = () => {
  const els = Array.from(document.querySelectorAll('[data-mfm^="math"]')) as HTMLElement[]
  if (els.length > 0) {
    const href = "https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.css"
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement("link")
      link.setAttribute("href", href)
      link.setAttribute("rel", "stylesheet")
      document.head.insertAdjacentElement("beforeend", link)
    }

    import("katex")
      .then(({ render }) => {
        for (const el of els ) {
          const f = el.textContent
          el.textContent = ""
          render(f, el, {
            throwOnError: false
          })
        }
      })
  }
}
