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
