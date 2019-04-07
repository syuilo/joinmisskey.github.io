const delay = 600

export const show = (target: Element, o?: IntersectionObserver): void => {
  if (target.classList.contains("scrollts-e-1")) setTimeout(target.classList.add, delay * 0.5,  "show")
  else if (target.classList.contains("scrollts-e-2")) setTimeout(target.classList.add, delay * 0.75, "show")
  else if (target.classList.contains("scrollts-e-3")) setTimeout(target.classList.add, delay,        "show")
  else if (target.classList.contains("scrollts-e-4")) setTimeout(target.classList.add, delay * 1.25, "show")
  else if (target.classList.contains("scrollts-e-5")) setTimeout(target.classList.add, delay * 1.5,  "show")
  else target.classList.add("show")
  if (o) o.unobserve(target)
}
