export const commonMixin = {
  data () {
    return {
      id: ''
    }
  },
  methods: {
    changeI18n: ($router, $i18n, locale) => {
      if (!$i18n.localeExists(locale)) locale = 'es'
      $i18n.set(locale)
      $router.push({ params: { lang: locale } })
    }
  }
}
