import VueI18n from 'vue-i18n'
import i18n from 'src/i18n/index.js'

export default ({ app, Vue, store }) => {
  Vue.use(VueI18n)
  // añadimos los idiomas en store
  // recorremos los idioma añadidos en strore
  for (var locale in i18n) {
    console.log(locale)
    console.log(i18n[locale])
    store.commit('addLocale', locale)
  }

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: 'es',
    fallbackLocale: 'es',
    i18n
  })
}
