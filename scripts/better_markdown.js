module.exports = (htm, urlprefix) => {

  const fontawesome = require("@fortawesome/fontawesome-svg-core")
  fontawesome.library.add(require("@fortawesome/free-solid-svg-icons").fas, require("@fortawesome/free-regular-svg-icons").far, require("@fortawesome/free-brands-svg-icons").fab)

  let $ = require('cheerio').load(htm, {decodeEntities: false})

  $('h2').addClass('mt-5 p-2 border border-left-0 border-right-0 border-primary')
  $('h3, h4').addClass('mt-4 p-1 border border-left-0 border-top-0 border-right-0 border-primary')
  $('h5, h6').addClass('mt-3 p-1 border border-left-0 border-top-0 border-right-0 border-primary')
  $('div h2').removeClass('mt-5 p-2 border border-left-0 border-right-0 border-primary')
  $('div h3, div h4').removeClass('mt-4 p-1 border border-left-0 border-top-0 border-right-0 border-primary')
  $('div h5, div h6').removeClass('mt-3 p-1 border border-left-0 border-top-0 border-right-0 border-primary')
  $('img').addClass('img-fluid')
  $('img[src^="/"]').attr( 'src', function(i, el){ return `${urlprefix}${$(this).attr('src')}` })
  $('img[src^="files/"]').attr( 'src', function(i, el){ return `${urlprefix}/${$(this).attr('src')}` })
  $('table').addClass('table table-sm table-bordered')
  $('blockquote').addClass('blockquote border rounded px-3 px-md-4 py-3 font-weight-light')
  $('a[href^="http"], a[href^="//"]').append(fontawesome.icon({ prefix: "fas", iconName: "external-link-alt" },{classes:['fa-fw']}).html[0]).attr({target:'_blank', rel:'noopener'})

  return $('body').html()
}
