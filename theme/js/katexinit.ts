export const katexinit = () => {
  const els = Array.from(document.querySelectorAll('[data-mfm^="math"]')) as HTMLElement[]
  if (els.length > 0) {
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
