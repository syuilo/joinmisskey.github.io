import window from "./window"

export const pjaxLoaded = (): void => {
  if (window.gtag) {
    window.gtag("event", "page_view")
  }
  if (window.DISQUS) {
    // DISQUSでresetを送信します。
    // disqus_configはページ内に別に定義されています。
    window.DISQUS.reset({
      config: window.disqus_config,
      reload: true
    })
  }
}
