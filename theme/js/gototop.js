var $ = require('jquery')
function register_go2top(){
    $('html,body').scrollTop(0)
    $('.trigger-gototop').off('click')
    $('.trigger-gototop').on('click', function(){
        $('html,body').scrollTop(0)
    })
}
$(register_go2top)
$(document).on('pjax:ready', register_go2top)