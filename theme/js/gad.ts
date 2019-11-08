declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    adsbygoogle: {
      push(a: any): void
    }
  }
}

export const gad = () => {
  document.querySelectorAll("ins.adsbygoogle").forEach(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  })
}
