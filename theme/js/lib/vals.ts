// tslint:disable: object-literal-sort-keys
export const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

export const getMediaDims = () => ({
  width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
})

export const cses = {
  ja: "014994922126240360327:fjvgx6f8dju",
  en: "014994922126240360327:tifjsd5prhg",
  fr: "014994922126240360327:vpwvcwyxxnw"
}

export const csses = [
  "https://cdn.jsdelivr.net/npm/yakuhanjp@3.3.0/dist/css/yakuhanjp.min.css",
  "https://cdn.jsdelivr.net/gh/tamaina/The-Japanese-Web-Fonts@v7.2.0/dist/NasuM/NasuM.css",
  "https://cdn.jsdelivr.net/npm/animate.css@3.7.0/animate.min.css",
  "/assets/styles/main.css",
  "/assets/styles/fonts.css"
]
