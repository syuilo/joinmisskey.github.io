import Pjax from 'pjax-api'

function move_locale(targetlang){
  if(targetlang != current_locale) {
    window.addEventListener('DOMContentLoaded', function(){
      Pjax.replace("/" + targetlang + permalink + "?moved" + window.location.hash, {});
    })
  }
}

new Pjax({  areas: ['#main, #breadcrumb, #mainnav, #updateTime', 'body'], update: { head: 'meta' }  })

if(current_locale != "false" || window.location.pathname == pathname){
  if (window.location.search.indexOf('moved') == -1){
    if (locales.indexOf(user_language) >= 0){
      move_locale(user_language)
    } else if (locales.indexOf(user_language.slice(0, 2)) >= 0) {
      move_locale(user_language.slice(0, 2))
    } else if (current_locale != "ja") {
      window.addEventListener('DOMContentLoaded', function(){
        Pjax.replace("/ja" + permalink + "?moved" + window.location.hash, {});
      })
    }
  } else {
    history.replaceState(null, null, window.location.href.replace(/\?[^#]*/,""));
  }
}