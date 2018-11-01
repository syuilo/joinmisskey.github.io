// npm require
const gulp = require('gulp')
const extend = require('extend')
const fs = require('fs')
const util = require('util')
const promisify = util.promisify
const path = require('path')
const del = require('del')
const workboxBuild = require('workbox-build')
const minimist = require('minimist')
const pump = require('pump')
const request = require('request')
const es = require('event-stream')
const htmlmin = require("html-minifier").minify
const pug = require('pug')
const mkdirp = require('mkdirp')
const betterMarkdown = require('./scripts/better_markdown')

const fontawesome = require("@fortawesome/fontawesome-svg-core")
fontawesome.library.add(require("@fortawesome/free-solid-svg-icons").fas, require("@fortawesome/free-regular-svg-icons").far, require("@fortawesome/free-brands-svg-icons").fab)
$ = require('gulp-load-plugins')()

// const exec = require('child_process').exec
// const join = path.join
// const moment = require('moment')
// const numeral = require('numeral')
// const inquirer = require('inquirer')
// const summaly = require('summaly').default

// promisify

const writeFile = promisify(fs.writeFile)

// arg
const argv = minimist(process.argv.slice(2))

// debug
const DEBUG = !!( argv._.indexOf('debug') > -1 || argv.debug )

function existFile(file) {
    try {
        fs.statSync(file)
        return true
    } catch(e) {
        if(e.code === 'ENOENT') return false
    }
}

// グローバル気味変数
let package = require('./package.json')
let messages = require('./.config/messages.json')
let site = extend(true,
    require('./.config/default.json'),
    require('./.config/lang.json'),
    require('./.config/images.json')
)

if(argv._.some(e => e == 'netlify')) site = extend(this,site,require('./.config/netlify-override.json'))
if(argv._.some(e => e == 'local-server')) site = extend(this,site,require('./.config/debug-override.json'))
console.log(argv._.some(e => e == 'local-server'))
console.log(argv._.some(e => e == 'netlify'))

const keys = (() => {
    if(existFile('./.config/keys.json')){
        try {
            return require('./.config/keys.json')
        } catch(e) {
            $.util.log(`There is no './.config/keys.json'.`) 
            return null
        }
    } else if (PATREON_CAMPAIGN in provess.env && PATREON_BARER in process.env) {
        return {
            patreon: {
                campaign: process.env.PATREON_CAMPAIGN,
                bearer: process.env.PATREON_BEARER
            }
        }
    } else { return {} }
})()

let instances = require('js-yaml').safeLoad(fs.readFileSync(`./data/instances.yml`))

let temp_dir = 'dist/cache/' // 末尾のスラッシュ必要

const urlPrefix = `${site.url.scheme}://${site.url.host}${site.url.path}`

let src = {
   'everypug': ['theme/pug/**/*.pug','./.temp/**/*.pug'],
   'json': ['config/**/*.json'],
   'js': ['theme/js/**/*.js'],
   'styl_all': ['theme/styl/**/*.styl'],
   'static': ['theme/static/**'],
   'files': ['files/**/*'],
   'filesPrebuilt': ['filesPrebuilt/**/*'],
   'everystyl': ['theme/styl/**/*.styl'],
   'pages': path.join(site.pages_src.path, site.pages_src.src)
}

let dests = {
    'root': './dist/docs',
    'everything': './dist/docs/**',
    'info': './dist/docs/info.json'
}

/*function faSvg(icon, prefix, option){
    return fontawesome.icon({ prefix: ( prefix || "fas" ), iconName: icon },option).html[0]
}*/

let manifest = {},
    pages = [],
    base,
    pugfilters

gulp.task('register', async cb => {
    const rf = promisify(fs.readFile)
    manifest = {}
    pages = []
    ytthumbs = []
    pugfilters = require('./pugfilters.js')
    manifest = require('./scripts/builder/registerer/manifest')(site)
    pages = await require('./scripts/builder/registerer/pages')(site, src, urlPrefix)
    const theme_pug = {
            script: await rf('theme/pug/includes/_script.pug', {encoding: 'utf8'}),
            mixin: await rf('theme/pug/includes/_mixins.pug', {encoding: 'utf8'})
        }
    const base_p = await require('./scripts/builder/registerer/base')(site, keys, temp_dir, instances)

    base = extend(true,
        base_p, 
        {
            update: (new Date()),
            site,
            keys,
            package,
            pages,
            manifest,
            messages,
            require,
            theme_pug,
            instances,
            urlPrefix,
            DEBUG
        }
    )

    cb()
})

gulp.task('config', () => {
    let resultObj = { options: '' }
    resultObj.timestamp = (new Date()).toJSON()
    resultObj = extend(true,resultObj, {'pages' : pages})
    require('mkdirp').sync(path.parse(dests.info).dir)
    return writeFile( dests.info, JSON.stringify( resultObj ))
    .then(
        () => { $.util.log($.util.colors.green(`✔ info.json`)) },
        (err) => { $.util.log($.util.colors.red(`✖ info.json`)); $.util.log(err) }
    )
})

gulp.task('credit-icons', async () => {
    let stream = []
    for (let v of base.creditIcons) {
        if (v) {
            stream.push(
                gulp.src(`${temp_dir}${v.name}.${v.ext}`)
                .pipe($.imageResize({
                    "format": "png",
                    "width": 140,
                    "height": 140,
                    "crop": true,
                    "upscale": false,
                    "cover": true,
                    "sharpen": "0x0.75+0.75+0.008",
                    "imageMagick": true
                }))
                .pipe($.image({
                    optipng: false,
                    pngquant: ["--speed=3"],
                    zopflipng: false,
                    "concurrent": 10
                }))
                .pipe($.rename({
                    "dirname": v.name.split('/')[0],
                    "basename": v.name.split('/')[1],
                    "extname": ".png"
                }))
                .pipe(gulp.dest('dist/files/images/credit'))
                .on('end',() => {
                    $.util.log($.util.colors.green(`✔ ${v.name}.${v.ext}`))
                })
                .on('error', (err) => {
                    $.util.log($.util.colors.red(err))
                })
            )
        }
    }
    await new Promise((res, rej) => {
        es.merge.apply(this, stream)
            .on('end', res)
            .on('error', rej)
    })
    $.util.log($.util.colors.green(`✔ all credit icons processed`))
    return void(0)
})

function pugit(val, options){
    options.isSubcall = true
    const res = pug.render(`${base.theme_pug.script}\n${base.theme_pug.mixin}\n${val}`, options)
    return res
}

function toamp(htm, base){
    const sizeOf = require('image-size')
    let $ = require('cheerio').load(htm, {decodeEntities: false})
    let promises = []
    $('img[src]').each(function(){
        const $el = $(this)
        // todo
        /*promises.push(new Promise(async (resolve) => {*/
            let src    = $el.attr('src')
            let alt    = $el.attr('alt')
            let title  = $el.attr('title')
            let id     = $el.attr('id')
            let width  = $el.attr('width')
            let height = $el.attr('height')
            if( ( width === undefined || height === undefined ) && src.startsWith("files/") ){
                const dims = sizeOf( src )
                width = dims.width
                height = dims.height
                src = base.site.url.path + "/" + src
            } else if ( ( width === undefined || height === undefined ) && src.startsWith("/files/") ){
                const dims = sizeOf( src.slice(1) )
                width = dims.width
                height = dims.height
                src = base.site.url.path + src
                /*
            } else if ( ( width === undefined || height === undefined ) && ( src.startsWith('http') || src.startsWith('//') ) ){
                const url = require('url').parse(src)
                const filename = `${url.pathname.slice(1).replace(/\//g,'-')}`.slice(-36)
                const temppath = `${temp_dir}amp/${url.hostname}/`
                mkdirp.sync(temppath)
                const v = await require('./scripts/downloadTemp')(filename, src, temppath)
                console.log(v)
                if (!v) {
                    console.log( `${messages.amp.invalid_imageUrl}:\n${src}` )
                    return resolve()
                }
                if (!existFile(`${temppath}${filename}.${v.ext}`)) return resolve()
                const dims = sizeOf( `${temppath}${filename}.${v.ext}` )
                width = dims.width
                height = dims.height
            */
            } else {
                console.log( `${messages.amp.invalid_imageUrl}:\n${src}` )
            }
            $el.after(`<amp-img src="${src}" alt="${alt}" title="${title}" id="${id}" width="${width}" height="${height}"></amp-image>`)
            // return resolve()
        /*}))*/
    })
    /*await Promise.all(promises)*/
    $('img').remove()
    $('amp-img').attr('layout','responsive')
    return $('body').html()
}

function regheadings(htm){
    let heading_html, headings = []
    const reg_heading = /<h([1-6])(.*?)>([^]*?)<\/h(\1)>/gi
    while((heading_html = reg_heading.exec(htm)) !== null){
        let heading = {},
            idmatch = []
        idmatch = heading_html[2].match(/id=(["'])(.*?)(\1)/)
        classmatch = heading_html[2].match(/class=(["'])(.*?)(\1)/)
        if(idmatch == null)
            heading.id = null
        else
            heading.id = idmatch[2]
        heading.html     = heading_html[0]
        heading.number   = heading_html[1]
        heading.attr     = heading_html[2]
        heading.text     = heading_html[3]
        if ( classmatch == null || classmatch[2].indexOf('noindex') == -1 ) headings.push(heading)
    }
    return headings
}

function searchSidebar(pathe){
    let searchin
    if(pathe.dir == "") searchin = `${pathe.dir}sidebar.pug`
    else searchin = `${pathe.dir}/sidebar.pug`
    if(existFile(searchin)){
        return searchin
    } else {
        // const uppath = path.parse(pathe.dir)
        // searchSidebar(uppath)
        return "pages/sidebar.pug"
    }
}

gulp.task('pug', async () => {
    const stream = []
    for (let page of pages) {
        const puglocals = extend(true,
            {
                page,
                filters: pugfilters
            }, base)
        let layout = page.attributes.layout
        let template = '', amptemplate = ''
        if(existFile(`theme/pug/templates/${layout}.pug`)) template += `theme/pug/templates/${layout}.pug`
        else if(existFile(`theme/pug/templates/${site.default.template}.pug`)) template += `theme/pug/templates/${site.default.template}.pug`
        else throw Error('default.pugが見つかりませんでした。')

        if(site.sidebar){
            let sidebarHTML = pug.renderFile( searchSidebar(page.meta.src), puglocals)
            puglocals.sidebarHTML = sidebarHTML
        }

        let main_html
        switch(page.meta.src.ext){
            case '.md':
                main_html = require("kramed")(page.body)
                main_html = betterMarkdown(main_html, urlPrefix)
                // main_html = maly(main_html)
                main_html = htmlmin(main_html ,{"collapseWhitespace": true,"removeEmptyAttributes": false,"removeEmptyElements": false})
                break
            case '.html':
            case '.htm':
                main_html = htmlmin(page.body ,{"collapseWhitespace": true,"removeEmptyAttributes": false,"removeEmptyElements": false})
                break
            case '.pug':
                try {
                    main_html = pugit(page.body, puglocals)
                } catch(e) {
                    console.log(`Error: ${page.meta.permalink}`)
                    throw Error(e)
                }
                if (page.attributes.improve) main_html = betterMarkdown(main_html, urlPrefix)
                break
        }
        main_html = require('./scripts/highl')(main_html)
        puglocals.main_html = main_html
        puglocals.headings = regheadings(main_html)

        stream.push(
        // stream.add(
            gulp.src(template)
                .pipe($.pug({ locals: puglocals }))
                .pipe($.rename(`${page.meta.permalink}index.html`))
                .pipe(gulp.dest( dests.root ))
                .on('end',() => {
                    // $.util.log($.util.colors.green(`✔ ${page.meta.permalink}`))
                })
                .on('error', (err) => {
                    $.util.log($.util.colors.red(`✖ ${page.meta.permalink}`))
                    $.util.log($.util.colors.red(err))
                })
        )
        /*
         *                            AMP処理部
         *                                                                  */

        if(page.attributes.amp){
            if(existFile(`theme/pug/templates/amp_${layout}.pug`)) amptemplate += `theme/pug/templates/amp_${layout}.pug`
            else if(existFile(`theme/pug/templates/amp_${site.default.template}.pug`)) amptemplate += `theme/pug/templates/amp_${site.default.template}.pug`
            else throw Error('amp_default.pugが見つかりませんでした。')
            const newoptions = extend(true,
                {isAmp: true, main_html: toamp(puglocals.main_html, base)},
                puglocals
            )
            stream.push(
            // stream.add(
                gulp.src(amptemplate)
                    .pipe($.pug({ locals: newoptions }))
                    .pipe($.rename(`${page.meta.permalink}amp.html`))
                    .pipe(gulp.dest( dests.root ))
                    .on('end',() => {
                        // $.util.log($.util.colors.green(`✔ ${page.meta.permalink}amp.html`))
                    })
                    .on('error', (err) => {
                        $.util.log($.util.colors.red(`✖ ${page.meta.permalink} (amp)`))
                        $.util.log($.util.colors.red(err))
                    })
            )
        }
    }

    await new Promise((res, rej) => {
        es.merge.apply(this, stream)
            .on('end', res)
            .on('error', rej)
    })
    $.util.log($.util.colors.green(`✔ all html produced`))
    return void(0)
})

gulp.task('css', (cb) => {
    pump([
        gulp.src('theme/styl/main.sass'),
        $.sass( { sourceMap: true, outputStyle: 'compressed' } ),
        $.autoprefixer( { browsers: 'last 3 versions' } ),
        $.rename('style.min.css'),
        gulp.dest(dests.root + '/assets')
    ], (e) => {
        if(e) $.util.log($.util.colors.red("Error(css)\n" + e))
        else $.util.log($.util.colors.green(`✔ assets/style.min.css`))
        cb()
    })
})

gulp.task('fa-css', (cb) => {
    pump([
        gulp.src('node_modules/@fortawesome/fontawesome-svg-core/styles.css'),
        $.cleanCss(),
        $.rename('fontawesome.min.css'),
        gulp.dest(dests.root + '/assets')
    ], (e) => {
        if(e) $.util.log($.util.colors.red("Error(fa-css)\n" + e))
        else $.util.log($.util.colors.green(`✔ assets/style.min.css`))
        cb()
    })
})
gulp.task('js', (cb) => {
    pump([
        gulp.src('theme/js/main.js'),
        $.webpack(),
        $.babel({presets: ['@babel/env'], plugins: ['transform-remove-strict-mode'], compact: false}),
        $.rename('main.js'),
        gulp.dest(dests.root + '/assets'),
        $.uglify(),
        $.rename('main.min.js'),
        gulp.dest(dests.root + '/assets')
    ], (e) => {
        if(e) { $.util.log($.util.colors.red("Error(js)\n" + e)) }
        else {
            $.util.log($.util.colors.green(`✔ assets/main.js`))
            $.util.log($.util.colors.green(`✔ assets/main.min.js`))
        }
        cb()
    })
})

gulp.task('copy-docs', (cb) => {
    pump([
        gulp.src('dist/docs/**/*', {dot: true}),
        gulp.dest('./docs')
    ], cb)
})
gulp.task('copy-theme-static', (cb) => {
    pump([
        gulp.src('theme/static/**/*', {dot: true}),
        gulp.dest(dests.root)
    ], cb)
})
gulp.task('copy-bootstrapjs', (cb) => {
    pump([
        gulp.src('node_modules/bootstrap/dist/js/**', {dot: true}),
        gulp.dest(dests.root + '/assets')
    ], cb)
})
gulp.task('copy-animatecss', (cb) => {
    pump([
        gulp.src('node_modules/animate.css/*.css', {dot: true}),
        gulp.dest(dests.root + '/assets')
    ], cb)
})
gulp.task('copy-pjax', (cb) => {
    pump([
        gulp.src('node_modules/pjax-api/dist/**', {dot: true}),
        gulp.dest(dests.root + '/assets')
    ], cb)
})
gulp.task('copy-prebuildFiles', (cb) => {
    pump([
        gulp.src('dist/files/**/*', {dot: true}),
        gulp.dest(dests.root + '/files')
    ], cb)
})
gulp.task('copy-files', (cb) => {
    pump([
        gulp.src(src.files, {dot: true}),
        gulp.dest(dests.root + '/files')
    ], cb)
})
gulp.task('copy-f404', (cb) => {
    pump([
        gulp.src('dist/docs/404/index.html', {dot: true}),
        $.rename('404.html'),
        gulp.dest('./docs')
    ], cb)
})

function images_base(){
    const images_allFalse = {
        optipng: false,
        pngquant: false,
        zopflipng: false,
        jpegRecompress: false,
        mozjpeg: false,
        guetzli: false,
        gifsicle: false,
        svgo: false
    }
    return site.images.files.all.image ? extend(true,images_allFalse,site.images.files.all.image) : images_allFalse
}
gulp.task('image-prebuildFiles', () => {
    const sizes = site.images.files.sizes
    const stream = gulp.src('files/**/*.{png,jpg,jpeg}')
    const stream2 = require('merge2')()
    for(i = 0; i < sizes.length; i++){
        stream2.add(
            stream
            .pipe($.imageResize(sizes[i].resize || {}))
            .pipe($.image(sizes[i].image ? extend(true, images_base(), sizes[i].image) : images_allFalse))
            .pipe($.rename(sizes[i].rename || {}))
            .pipe(gulp.dest('dist/files'))
        )
    }
    stream2.add(
        gulp.src('files/**/*.{gif,svg}')
        .pipe($.image(extend(true, images_base(), {
            "gifsicle": true,
            "svgo": true
        })))
        .pipe(gulp.dest('dist/files'))
    )

    return stream2
})

gulp.task('image', () => {
    if (!argv.i) new Error('ファイル/フォルダ名が指定されていません。 -i <path>を付けて指定してください。')
    const parsed = path.parse(argv.i)
    const sizes = site.images.files.sizes
    const stream2 = require('merge2')()
    const date = new Date()
    let gifsvg, others
    const dirname = `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}`
    $.util.log(`image will be saved as "files/${dirname}/${parsed.name}${parsed.ext}"`)
    if(parsed.ext == "") {
        gifsvg = gulp.src(argv.i + '/**/*.{gif,svg}')
        others = gulp.src(argv.i + '/**/*.{png,jpg,jpeg}')
    } else if(parsed.ext == ".gif" || parsed.ext == ".svg") {
        gifsvg = gulp.src(argv.i)
    } else {
        others = gulp.src(argv.i)
    }
    if(gifsvg){
        stream2.add(
            gifsvg
            .pipe($.image(extend(true, images_base(), {
                "gifsicle": true,
                "svgo": true
            })))
            .pipe($.rename({dirname: dirname} || {}))
            .pipe(gulp.dest('dist/files/images/imports'))
        )
        stream2.add(
            gifsvg
            .pipe($.rename({dirname: dirname} || {}))
            .pipe(gulp.dest('files/images/imports'))
        )
    }
    if(others){
        for(i = 0; i < sizes.length; i++){
            stream2.add(
                others
                .pipe($.imageResize(sizes[i].resize || {}))
                .pipe($.image(sizes[i].image ? extend(true, images_base(), sizes[i].image) : images_allFalse))
                .pipe($.rename(sizes[i].rename || {}))
                .pipe($.rename({dirname: dirname} || {}))
                .pipe(gulp.dest('dist/files/images/imports'))
            )
        }
        stream2.add(
            others
            .pipe($.rename({dirname: dirname} || {}))
            .pipe(gulp.dest('files/images/imports'))
        )
    }

    return stream2
})

gulp.task('clean-docs', (cb) => { del(['docs/**/*', '!docs/.git'], {dot: true}).then(cb()) } )
gulp.task('clean-dist-docs', (cb) => { del('dist/docs/**/*', {dot: true}).then(cb()) } )
gulp.task('clean-dist-files', (cb) => { del('dist/files/**/*', {dot: true}).then(cb()) } )

gulp.task('make-sw', (cb) => {
    if(!site.sw && !site.push7) cb()
    const destName = site.push7 ? "push7-worker" : "service_worker"
    let res = ''
        if(site.sw){
            res =
`/* workbox ${base.update.toJSON()} */
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");
workbox.routing.registerRoute(
    /.*\.(?:${site.sw})/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'assets-cache',
    })
);
`
            const offline = pages.some((e) => e.meta.permalink == '/offline/')
            if(offline){
                res +=
`workbox.precaching.precacheAndRoute([
    {
        url: '/offline/',
        revision: '${base.update.getTime()}',
    }
]);
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            return response || fetch(event.request);
        })
        .catch(function() {
            return caches.match('/offline/');
        })
    );
});
`
            }/*
            if(site.ga){
                res +=
`workbox.googleAnalytics.initialize({
    parameterOverrides: {
        cd1: 'offline',
    },
});
`
            }*/
        }
        if(site.push7){
            res +=
`/* push7 */
importScripts("https://aldebaran.push7.jp/ex-push7-worker.js");`
        }
        fs.writeFile(`${dests.root}/${destName}.js`, res, () => {
            $.util.log($.util.colors.green(`✔ ${destName}.js`))
            cb()
        })
})

gulp.task('make-manifest', (cb) => {
    return writeFile( `dist/docs/manifest.json`, JSON.stringify(manifest))
    .then(
        () => { $.util.log($.util.colors.green(`✔ manifest.json`)) },
        (err) => { $.util.log($.util.colors.red(`✖ manifest.json`)); $.util.log(err) }
    )
})

gulp.task('make-rss', (cb) => {
    return writeFile( `dist/docs/feed.rdf`, require('./scripts/builder/registerer/rss')(base, 'ja'))
    .then(
        () => { $.util.log($.util.colors.green(`✔ feed.rdf`)) },
        (err) => { $.util.log($.util.colors.red(`✖ feed.rdf`)); $.util.log(err) }
    )
})

const browserconfigXml = () => {
    return `<?xml version='1.0' encoding='utf-8'?>
    <browserconfig>
      <msapplication>
        <tile>
          <square70x70logo src='${site.url.path}${site.mstiles.s70x70.path}'/>
          <square144x144logo src='${site.url.path}${site.mstiles.s144x144.path}'/>
          <square150x150logo src='${site.url.path}${site.mstiles.s150x150.path}'/>
          <square310x310logo src='${site.url.path}${site.mstiles.s310x310.path}'/>
          <wide310x150logo src='${site.url.path}${site.mstiles.w310x150.path}'/>
          <TileColor>${site.theme_color.secondary}</TileColor>
        </tile>
      </msapplication>
    </browserconfig>`
}

gulp.task('make-browserconfig', (cb) => {
    fs.writeFile( `dist/docs/browserconfig.xml`, browserconfigXml, () => {
        $.util.log($.util.colors.green(`✔ browserconfig.xml`)); cb()
    })
})

gulp.task('notify-failure', () => {
    const options = {
        uri: process.env.DISCORD_WEBHOOK_URL,
        headers: {
            "Content-type": "application/json"
        },
        json: { content: `🚨Travis CI Build Failed: #${process.env.TRAVIS_JOB_NUMBER} https://travis-ci.org/vytfs/wiki/` }
    }
    return promisify(request.post)(options)
})

function wait4(cb, sec){
    let interval = null
    process.stdout.write($.util.colors.green(` ${sec} ██████    \r`))
    function waiti(){
        sec--
        if( sec < 0 && interval != null ){
            process.stdout.write(`\r`)
            cb()
            clearInterval(interval)
        }
        else if ( sec == 0 ) process.stdout.write($.util.colors.red(`\r ${sec}              \r`))
        else if ( sec == 1 ) process.stdout.write($.util.colors.red(`\r ${sec}  █            \r`))
        else if ( sec == 2 ) process.stdout.write($.util.colors.red(`\r ${sec}  ██          \r`))
        else if ( sec == 3 ) process.stdout.write($.util.colors.red(`\r ${sec}  ███        \r`))
        else if ( sec == 4 ) process.stdout.write($.util.colors.yellow(`\r ${sec}  ████      \r`))
        else if ( sec == 5 ) process.stdout.write($.util.colors.yellow(`\r ${sec}  █████    \r`))
        else process.stdout.write($.util.colors.green(`\r ${sec}  ██████    `))
    }
    interval = setInterval(waiti, 1000)
}

gulp.task('wait-5sec', (cb) => {
    wait4(cb, 5)
})

gulp.task('wait-10sec', (cb) => {
    wait4(cb, 10)
})

gulp.task('last',
    gulp.series(
        'clean-docs',
        'copy-f404',
        'copy-docs',
        'clean-dist-docs',
        (cb) => { cb() }
    )
)

gulp.task('copy-publish',
    gulp.series(
        'copy-files',
        'copy-prebuildFiles',
        'copy-theme-static',
//        'copy-pjax',
//        'copy-bootstrapjs',
//        'copy-animatecss',
        (cb) => { cb() }
    )
)
gulp.task('make-subfiles',
    gulp.series(
        gulp.parallel(
            'make-manifest',
            'make-rss',
            'make-browserconfig'
        ),
        (cb) => { cb() }
    )
)

gulp.task('core',
    gulp.series(
        gulp.parallel('js', 'css', 'fa-css', 'pug', 'credit-icons'),
        gulp.parallel('copy-publish', 'make-subfiles'),
        'make-sw', 'last',
        (cb) => { cb() }
    )
)

gulp.task('default',
    gulp.series(
        'register',
        'config',
        'core',
        (cb) => { cb() }
    )
)

gulp.task('netlify',
    gulp.series(
        'default',
        (cb) => { cb() }
    )
)

gulp.task('pages',
    gulp.series(
        'register',
        'config',
        gulp.parallel('pug', 'credit-icons'),
        'make-subfiles',
        'copy-f404',
        'copy-docs',
        'clean-dist-docs',
        (cb) => { cb() }
    )
)

gulp.task('prebuild-files',
    gulp.series(
        'clean-dist-files',
        'image-prebuildFiles',
        (cb) => { cb() } 
    )
)

gulp.task('core-with-pf',
    gulp.series(
        gulp.parallel('js', 'css', 'fa-css', 'pug', 'prebuild-files'),
        gulp.parallel('copy-publish', 'make-subfiles'),
        'make-sw', 'last',
        (cb) => { cb() }
    )
)

gulp.task('travis_ci',
    gulp.series(
        'register',
        'prebuild-files',
        'default',
        (cb) => { cb() }
    )
)

gulp.task('watcher',
    gulp.series(
        'wait-5sec', 'register', 'config',
        (cb) => { cb() } 
    )
)

gulp.task('watch', (cb) => {
    gulp.watch(['theme/**/*', `!${temp_dir}**/*`, 'pages/**/*', './.config/**/*', './scripts/**/*'], gulp.series('watcher', 'server',(cb)=>{cb()}))
    gulp.watch(['files/**/*', './.config/**/*'], gulp.series('watcher',(cb)=>{cb()}))
})

gulp.task('connect', () => {
    $.connect.server({
        port: '8084',
        root: 'docs',
        livereload: true
    })
})

gulp.task('server',
    gulp.series(
        'register',
        'config',
        'core',
        (cb) => { cb() } 
    )
)

gulp.task('local-server',
    gulp.series(
        'register',
        'config',
        'core',
        gulp.parallel('connect', 'watch'),
        (cb) => { cb() } 
    )
)