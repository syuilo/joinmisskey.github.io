const delay = 600

const showit = (target: Element): void => {
  target.classList.add("show")
}

export const tsShow = (target: Element, o?: IntersectionObserver): void => {
  if      (target.classList.contains("scrollts-e-1")) setTimeout(showit, delay * 0.5,  target)
  else if (target.classList.contains("scrollts-e-2")) setTimeout(showit, delay * 0.75, target)
  else if (target.classList.contains("scrollts-e-3")) setTimeout(showit, delay       ,  target)
  else if (target.classList.contains("scrollts-e-4")) setTimeout(showit, delay * 1.25,  target)
  else if (target.classList.contains("scrollts-e-5")) setTimeout(showit, delay * 1.5 ,  target)
  else target.classList.add("show")
  if (o) o.unobserve(target)
}
