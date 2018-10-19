window.addEventListener('pjax:load', function(){
  if(window.gtag) gtag('event', 'page_view')
  if(window.DISQUS){
    // DISQUSでresetを送信します。
    // disqus_configはページ内に別に定義されています。
    DISQUS.reset({
      reload: true,
      config: disqus_config
    })
  }
  if (window.location.search.indexOf('moved') >= 0) {
    history.replaceState(null, null, window.location.href.replace(/\?.*$/,""))
  }
})