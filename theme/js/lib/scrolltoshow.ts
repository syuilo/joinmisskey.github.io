import { tsShow } from "./toshow"

export const scrolltoshow = (): void => {
  const els = document.getElementsByClassName("scrollts") as unknown as HTMLElement[]

  if (IntersectionObserver !== undefined && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, o) => {
        for (const entry of entries) {
          if (entry.isIntersecting) tsShow(entry.target, o)
        }
      }, {
          rootMargin: "-30% 0px",
          threshold: 0
      })
    const observerNomargin = new IntersectionObserver((entries, o) => {
        for (const entry of entries) {
          if (entry.isIntersecting) tsShow(entry.target, o)
        }
      }, {
          rootMargin: "0px",
          threshold: 0
      })
    for (const el of els) {
      if (el.classList.contains("scrollts-nomargin")) observerNomargin.observe(el)
      else observer.observe(el)
    }
  } else {
    console.log("v")
    for (const el of els) {
      el.classList.add("show")
    }
  }
}
