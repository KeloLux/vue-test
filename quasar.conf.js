// Configuration for your app
let path = require('path')
module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    // plugins: ['axios', 'i18n'],
    plugins: ['axios', 'vuex-i18n'],
    css: ['app.styl'],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons'
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    vendor: {
      add: [],
      remove: []
    },
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueRouterBase: '/dds',
      // publicPath: '/dds',
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // useNotifier: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          '@statics': path.resolve(__dirname, './src/statics')
        }
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser wsindow automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide'
      ],
      directives: ['Ripple', 'CloseOverlay'],
      // Quasar plugins
      plugins: ['Notify']
      // i18n: 'es'
    },
    // animations: 'all' --- includes all animations
    animations: [],
    pwa: {
      cacheExt:
        'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      extendWebpack (cfg) {
        // do something with cfg
      },
      packager: {
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      }
    },

    // leave this here for Quasar CLI
    starterKit: '1.0.2'
  }
}
/*
alias: {
quasar: appPaths.resolve.app(`node_modules/quasar-framework/dist/quasar.${cfg.ctx.themeName}.esm.js`),
src: appPaths.srcDir,
components: appPaths.resolve.src(`components`),
layouts: appPaths.resolve.src(`layouts`),
pages: appPaths.resolve.src(`pages`),
assets: appPaths.resolve.src(`assets`),
variables: appPaths.resolve.app(`.quasar/variables.styl`),

// CLI using these ones:
'quasar-app-styl': appPaths.resolve.app(`.quasar/app.styl`),
'quasar-app-variables': appPaths.resolve.src(`css/themes/variables.${cfg.ctx.themeName}.styl`),
'quasar-styl': appPaths.resolve.app(`node_modules/quasar-framework/dist/quasar.${cfg.ctx.themeName}.styl`)
}
*/
