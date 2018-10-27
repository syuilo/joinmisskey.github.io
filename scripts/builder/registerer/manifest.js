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
    manifest = require('extend')(true,manifest,site.manifest)
    return manifest
}