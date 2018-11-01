module.exports = (base, lang) => {
    const Entities = require('html-entities').XmlEntities
    const entities = new Entities()
    let pages = base.pages
    pages.sort(function(a,b) {
        if(( a.meta.mtime || a.meta.birthtime ) < ( b.meta.mtime || b.meta.birthtime )) { return 1 } else { return -1 }
    });

    let qpages = pages.filter(e => e.meta.permalink.indexOf(`/${lang}/blog/`) == 0
                              && e.attributes.layout == 'blog'           // blogレイアウトが適用されている
                              && e.attributes.draft != true              // 
                              && e.attributes.published == true
                            )

    let res =
`<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF xmlns="http://purl.org/rss/1.0/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xml:lang="${lang}">
    <channel rdf:about="${base.urlPrefix}/feed.rdf">
        <title>${entities.encode(base.site.names ? base.site.names[lang] : base.site.name)}</title>
        <link>${base.urlPrefix}</link>
        <description><![CDATA[${entities.encode(base.site.descriptions ? base.site.descriptions[lang] : base.site.description)}]]></description>
        <dc:language>${lang}</dc:language>
        <dc:rights>Copyright (c) ${base.site.author}</dc:rights>
        <dc:date>${base.update.toJSON()}</dc:date>
        <items>
            <rdf:Seq>
`
    for(let qp of qpages){
        res +=
`                <rdf:li rdf:resource="${base.urlPrefix}${qp.meta.permalink}?ref=rss"/>
`
    }
    res +=
`            </rdf:Seq>
        </items>
    </channel>
`
    for(let qp of qpages){
        res +=
`    <item rdf:about="${base.urlPrefix}${qp.meta.permalink}?ref=rss">
        <title>${entities.encode(qp.attributes.title)}</title>
        <link>${base.urlPrefix}${qp.meta.permalink}?ref=rss</link>
        <dc:date>${qp.meta.mtime}</dc:date>
        <description><![CDATA[${entities.encode(qp.attributes.description)}]]></description>
    </item>
`
    }
    res += `</rdf:RDF>`
    return res
}