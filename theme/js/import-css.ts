export default () => {
  const l = window.location

  if ((l.pathname).split("/").length === 3) require("../styl/lazy/top.sass")
}
