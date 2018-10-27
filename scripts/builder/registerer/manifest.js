module.exports = (site) => {
    let icons = []
    for (let i = 0 ; i < site.icons.length ; i++) {
        let icon = site.icons[i]
        icon.src = site.url.path + icon.path
        icons.push(icon)
    }
    let manifest = {
        'name': site.name,
        'short_name': site.short_name,
        'icons': icons,
        'start_url': site.url.path,
        'background_color': site.theme_color.primary
    }
    let push7man = site.push7 ? site.push7.manifest : {}
    manifest = require('extend')(true,push7man,manifest,site.manifest)
    return manifest
}