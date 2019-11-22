function gototo() {
  window.scroll({
    behavior: "smooth",
    top: 0
  })
  return false
}
export const gototop = (): void => {
  for (const el of document.getElementsByClassName("trigger-gototop") as unknown as HTMLElement[]) {
    el.addEventListener("click", gototo)
  }
}
