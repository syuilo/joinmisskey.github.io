declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    adsbygoogle: {
      push(a: any): void
    }
  }
}

const adpush = (target?: Element, o?: IntersectionObserver): void => {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch (e) {
    console.error(e)
  }
  if (target && o) o.unobserve(target)
}

export const gad = (): void => {
  const els = document.querySelectorAll("ins.adsbygoogle:not([data-adsbygoogle-status='done'])")
  if (IntersectionObserver !== undefined && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, o) => {
        for (const entry of entries) {
          if (entry.isIntersecting) adpush(entry.target, o)
        }
      }, {
          rootMargin: "60% 0px",
          threshold: 0
      })

    els.forEach(el => observer.observe(el))
  } else {
    console.log("v")
    els.forEach(() => adpush())
  }
}
