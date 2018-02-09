import Vue from 'vue'
import Vuex from 'vuex'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
const store = new Vuex.Store({
  strict: debug,
  state: {
    count: 0,
    locales: []
  },
  mutations: {
    addLocale (state, locale) {
      state.locales.push(locale)
    }
  }
})

// load and register the vuex i18n module
import vuexI18n from 'vuex-i18n'
Vue.use(vuexI18n.plugin, store)

// añadimos los idiomas en store
store.commit('addLocale', 'es')
store.commit('addLocale', 'en')
// recorremos los idioma añadidos en strore
store.state.locales.forEach(function (locale) {
  Vue.i18n.add(locale, require(`../locales/${locale}.json`))
}, this)

// Set the start locale to use
Vue.i18n.set('es')

export default store
