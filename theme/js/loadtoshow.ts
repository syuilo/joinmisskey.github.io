import { show } from "./toshow"

export const loadtoshow = (): void => {
  const els = Array.from(document.getElementsByClassName("loadts"))
  for (const el of els) {
    show(el)
  }
}
