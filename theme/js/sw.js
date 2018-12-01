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
  } else if(typeof jm_p7AppNo === 'string' && typeof p7 !== 'undefined') {
    p7.init(jm_p7AppNo,{
      mode:"native",
      subscribe:"manual"
    })
    p7.ready().then(() => p7.isSubscribed()).then(isSubscribed => {
      const els = Array.from(document.getElementsByClassName('p7-subscribe'))
      function unsubscribe(el){
        p7.unsubscribe()
        .then(() => {
          alert(jm_p7Unsubscribed)
          console.log('Push Notification Unsubscribed.')
          for(let el of els){
            el.removeEventListener('click', unsubscribe)
            el.addEventListener('click', subscribe)
            el.textContent = jm_p7Subscribe
          }
        })
      }
      function subscribe(){
        p7.subscribe()
        .then(() => {
          console.log('Push Notification Subscribed!')
          for(let el of els){
            el.removeEventListener('click',subscribe)
            el.addEventListener('click',unsubscribe)
            el.textContent = jm_p7Unsubscribe
          }
        }).catch(e => {
          alert(jm_p7SubscribeFailed)
          console.log('Push Notification Subscribing is Failed')
          console.log(e)
        })
      }
      for(let el of els){
        if(isSubscribed){
          el.addEventListener('click',unsubscribe)
          el.textContent = jm_p7Unsubscribe
        } else {
          el.addEventListener('click',subscribe)
          el.textContent = jm_p7Subscribe
        }
      }
    })  
  }
}

window.addEventListener('DOMContentLoaded', sw)
document.addEventListener('pjax:content', sw)