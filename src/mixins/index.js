import menu from '@statics/menu.json'

export const commonMixin = {
  data () {
    return {
      menu: menu
    }
  },
  methods: {
    changeI18n: function ($router, $i18n, locale) {
      if (!$i18n.localeExists(locale)) locale = 'es'
      $i18n.set(locale)
      $router.push({ params: { lang: locale } })
    }
  }
}
