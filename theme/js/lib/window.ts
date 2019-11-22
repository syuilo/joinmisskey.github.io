
interface IWindow extends Window {
  currentLocale: string
  permalink: string
  locales: string[]
  pathname: string
  jm_pathToWorker: any
  gaId: string
  dataLayer: any[]

  twemoji: any

  DISQUS: {
    reset(a: any): void
  }
  twttr: any
  disqus_config: any
  adsbygoogle: {
    push(a: any): void
  }

  google: {
    search: {
      cse: {
        element: {
          // tslint:disable-next-line: variable-name
          render(componentConfig: object, opt_componentConfig?: object): null | object
          // tslint:disable-next-line: variable-name
          go(opt_container?: object): void
        }
      }
    }
  }

  gtag(...xs: any): void
}

declare const window: IWindow
export default window
