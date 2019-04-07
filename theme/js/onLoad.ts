type F = () => any

export default (f: F, options?: boolean | AddEventListenerOptions) => {
  document.readyState !== "complete"
    ? window.addEventListener("load", f, options)
    : f()
}
