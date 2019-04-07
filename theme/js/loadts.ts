export const loadtoshow = (): void => {
  const els = Array.from(document.getElementsByClassName("loadts"))
  for (const el of els) {
    el.classList.add("show")
  }
}
