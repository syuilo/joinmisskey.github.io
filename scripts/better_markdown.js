module.exports = (htm, urlprefix) => {

  const fontawesome = require("@fortawesome/fontawesome-svg-core")
  fontawesome.library.add(require("@fortawesome/free-solid-svg-icons").fas, require("@fortawesome/free-regular-svg-icons").far, require("@fortawesome/free-brands-svg-icons").fab)

  let $ = require('cheerio').load(htm, {decodeEntities: false})

  $('h2, h3, h4, h5, h6').addClass('blogstyle')
  $('div h2, div h3, div h4, div h5, div h6').removeClass('blogstyle')
  $('img').addClass('img-fluid')
  $('img[src^="/"]').attr( 'src', function(i, el){ return `${urlprefix}${$(this).attr('src')}` })
  $('img[src^="files/"]').attr( 'src', function(i, el){ return `${urlprefix}/${$(this).attr('src')}` })
  $('table').addClass('table table-sm table-bordered')
  $('blockquote').addClass('blockquote rounded px-3 px-md-4 py-3 font-weight-light')
  $('a[href^="http"], a[href^="//"]').append(fontawesome.icon({ prefix: "fas", iconName: "external-link-alt" },{classes:['fa-fw']}).html[0]).attr({target:'_blank', rel:'noopener'})

  return $('body').html()
}
