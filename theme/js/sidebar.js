var $ = require('jquery')

let sidebar_is = false

function sidebar_show(){
    if(window.innerWidth > 992) return false
    $('#nav, #main, #footer').addClass('filter-brightness')
    $('#grid').addClass('open')
    sidebar_is = true
    return true
}
function sidebar_hide(){
    $('#nav, #main, #footer').removeClass('filter-brightness')
    $('#grid').removeClass('open')
    sidebar_is = false
    return true
}
$(function(){
    $('.sidebar_opener').on('click', sidebar_show)
    $('#main, #footer, .sidebar_closer').on('click', sidebar_hide)

    let startX, diffX

    $('body').on('touchstart', function(e) {
        startX = e.changedTouches[0].pageX
    })
    $('body').on('touchmove', function(e) {
        endX = e.changedTouches[0].pageX
        diffX = Math.round(startX - endX)
    })
    $('body').on('touchend', function(e) {
        if(diffX > 120) sidebar_hide()
        else if(startX < 40 && diffX < -120) sidebar_show()
    })
})

$(window).on('pjax:unload', function(){
    sidebar_hide()
})
$(document).on('pjax:ready', function(){
    $('.sidebar_closer').off('click')
    $('.sidebar_closer').on('click', sidebar_hide)
})