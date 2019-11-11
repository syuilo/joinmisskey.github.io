export default () => {
  const top = require("../../styl/lazy/top.sass")
  top.unuse()

  const p = window.location.pathname

  if (p.split("/").length === 3) top.use()
  else if (top.unuse) top.unuse()
}
