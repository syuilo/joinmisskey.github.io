function gototo() {
  window.scroll({
    behavior: "smooth",
    top: 0
  })
  return false
}
export const gototop = (): void => {
  for (const el of Array.from(document.getElementsByClassName("trigger-gototop"))) {
    el.addEventListener("click", gototo)
  }
}
