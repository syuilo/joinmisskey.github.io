import window from "./window"

import { breakpoints, getMediaDims } from "./vals"

const test = (el: Element): void | Element => {
  const classContains = (token: string) => el.classList.contains(token)
  for (const [bp, px] of Object.entries(breakpoints)) {
    if (classContains("d-none")
      && classContains(`d-${bp}-block`)
      && getMediaDims().width < px) return el.remove()
    else if (classContains(`d-${bp}-none`)
      && getMediaDims().width >= px) return el.remove()
  }
  return el
}

const adpush = (target: Element, o?: IntersectionObserver): void => {
  if (!test(target)) return
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch (e) {
    console.error(e)
  }
  if (o) o.unobserve(target)
}

export const gad = (): void => {
  const els = document.querySelectorAll("ins.adsbygoogle:not([data-adsbygoogle-status='done'])")
  if (IntersectionObserver !== undefined && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, o) => {
        for (const entry of entries) {
          if (entry.isIntersecting) adpush(entry.target, o)
        }
      }, {
          rootMargin: "99% 0px",
          threshold: 0
      })

    els.forEach(el => {
      if (test(el)) observer.observe(el)
    })
  } else {
    console.log("v")
    els.forEach(el => adpush(el))
  }
}
