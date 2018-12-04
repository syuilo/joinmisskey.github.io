function sw(){
  if(typeof jm_pathToWorker === 'string') {
    // twbs/bootstrap build/sw.jsより借用
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(jm_pathToWorker).then(registration => {
        console.log('Service Workerの登録: ', registration.scope);
          registration.onupdatefound = function(){
            const installingWorker = registration.installing
            installingWorker.onstatechange = function(){
              switch(installingWorker.state){
                case 'installed':
                  if (navigator.serviceWorker.controller) {
                    console.log('Service Workerの更新があります…')
                    location.reload(true)
                  }
                  break
                default:
              }
            }
        }
      }).catch(err => {
        console.log('Service Worker登録時にエラー発生しました: ', err)
      })
    }
  }
}

window.addEventListener('DOMContentLoaded', sw)
document.addEventListener('pjax:content', sw)