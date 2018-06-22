var UAparser = require('ua-parser-js')

var agent = UAparser(window.navigator.userAgent)

function chkandro(){
  var isOldAndroidBrowser = false
  var ua = window.navigator.userAgent
  if (/Android/.test(ua) && /Linux; U;/.test(ua) && !/Chrome/.test(ua)) {
    isOldAndroidBrowser = true
  }

  return isOldAndroidBrowser
}

if(chkandro()){
  alert('この画面では正しく表示されない可能性があります。Chrome等の新しいブラウザアプリでご覧ください。')
  throw new Error('古いアンドロイド標準ブラウザを検出しました。')
} else if (agent.browser.name == 'IE') {
  alert('Internet Explorerでは、このサイトは正しく表示されない場合があります。EdgeやChrome等の新しいブラウザでご覧ください。')
  throw new Error('Internet Explorerを検出しました。')
}