import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () =>
        import(`@/${component}.vue`)
}

export default new VueRouter({
  /*
     * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
     * it is only to be used only for websites.
     *
     * If you decide to go with "history" mode, please also open /config/index.js
     * and set "build.publicPath" to something other than an empty string.
     * Example: '/' instead of current ''
     *
     * If switching back to default "hash" mode, don't forget to set the
     * build publicPath back to '' so Cordova builds work again.
     */
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    { path: '/login', component: load('Account/login') },
    {
      path: '/',
      component: load('Home'),
      children: [
        { path: 'About', component: load('App') },
        { path: 'registration', component: load('Account/login') }
      ]
    },
    {
      path: '/parking',
      component: load('Parking/index'),
      children: [
        { path: 'About', component: load('App') },
        { path: 'registration', component: load('Account/login') }
      ]
    },
    {
      path: '/nfc',
      component: load('Test/nfc')
    },
    {
      path: '/card',
      component: load('Test/card')
    },
    // Always leave this last one
    { path: '*', component: load('Error404') } // Not found
  ]
})
