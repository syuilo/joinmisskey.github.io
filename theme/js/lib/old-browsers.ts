export const detectOldBrowser = (): void => {
  const ua = window.navigator.userAgent.toLowerCase()

  function chkandro() {
    return /android/.test(ua) && /linux; u;/.test(ua) && !/chrome/.test(ua)
  }

  function chkie() {
    return /msie/.test(ua) || /trident/.test(ua)
  }

  if (chkandro()) {
    alert("この画面では正しく表示されない可能性があります。Chrome等の新しいブラウザアプリでご覧ください。")
    throw new Error("古いアンドロイド標準ブラウザを検出しました。")
  } else if (chkie()) {
    alert("Internet Explorerでは、このサイトは正しく表示されない場合があります。EdgeやChrome等の新しいブラウザでご覧ください。")
    throw new Error("Internet Explorerを検出しました。")
  }
  return
}
