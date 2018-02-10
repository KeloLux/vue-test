// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// ==============================
// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)
// ==============================
require(`quasar/dist/quasar.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import store from './store'
// load and register the vuex i18n module
import vuexI18n from 'vuex-i18n'
/* App component */
import App from './components/App'
Vue.use(vuexI18n.plugin, store)

/* eslint-disable */
if (process.env.NODE_ENV === 'development') {
    Vue.config.productionTip = true
    Vue.config.performance = true
    Vue.config.devtools = true
    Vue.config.debug = true
    Vue.config.silent = false
} else {
    Vue.config.productionTip = false
    Vue.config.performance = false
    Vue.config.devtools = false
    Vue.config.debug = false
    Vue.config.silent = true
}


/* Quasar Framework */
Vue.use(Quasar)
if (__THEME === 'mat') require('quasar-extras/roboto-font')
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

//This is very important to used with the window object
window.moment = require('moment')
Quasar.start(() => {
    /* eslint-disable no-new */
    new Vue({
        el: '#q-app',
        // Attach the Vue instance to the window,
        // so it's available globally.
        created: function() {
            window.Vue = this
        },
        router,
        store,
        render: h => h(App)
    })
})