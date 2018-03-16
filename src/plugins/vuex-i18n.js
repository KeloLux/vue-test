// load and register the vuex i18n module
import vuexI18n from 'vuex-i18n'
import i18n from '../i18n/index.js'

export default ({ app, Vue, store }) => {
  Vue.use(vuexI18n.plugin, store)
  // añadimos los idiomas en store
  // recorremos los idioma añadidos en strore
  for (var locale in i18n) {
    store.commit('addLocale', locale)
    Vue.i18n.add(locale, i18n[locale])
  }
  // Set the start locale to use
  Vue.i18n.set('es')
}
