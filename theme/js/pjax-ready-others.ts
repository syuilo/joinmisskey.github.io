declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    DISQUS: {
      reset(a: any): void
    }
    twttr: any
    disqus_config: any
    gtag(a: string, b: string): void
  }
}

export const pjaxLoaded = (): void => {
  if(window.gtag){
    window.gtag('event', 'page_view')
  }
  if(window.DISQUS){
    // DISQUSでresetを送信します。
    // disqus_configはページ内に別に定義されています。
    window.DISQUS.reset({
      reload: true,
      config: window.disqus_config
    })
  }
  if (window.location.search.indexOf('moved') >= 0) {
    history.replaceState(null, null, window.location.href.replace(/\?.*$/,""))
  }
}
