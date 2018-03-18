import Vue from 'vue'
import VueRouter from 'vue-router'
import menu from '@statics/menu.json'
import { commonMixin } from 'src/mixins/index.js'
// import routes from './routes'

Vue.use(VueRouter)

function load (componentRoute) {
  let component = componentRoute.split(/\/(.+)/)
  switch (component[0]) {
    case 'src':
      return () => import(`src/${component[1]}.vue`)
    case 'pages':
      return () => import(`pages/${component[1]}.vue`)
    case 'layouts':
      return () => import(`layouts/${component[1]}.vue`)
    case 'components':
      return () => import(`components/${component[1]}.vue`)
    default:
      return () => import(`${component[1]}.vue`)
  }
}

var routes = [
  {
    path: '/:lang',
    component: load('layouts/App/App'),
    // create a container component
    /* component: {
      render (c) {
        return c('router-view')
      }
    }, */
    children: []
  },
  {
    path: '*',
    redirect: '/es/index'
  }
]
for (var route of menu) {
  if (
    route.hasOwnProperty('title') &&
    route.hasOwnProperty('path') &&
    route.hasOwnProperty('component')
  ) {
    route.component = load(route.component)
    if (route.hasOwnProperty('children')) {
      for (var children of route.children) {
        if (children.hasOwnProperty('component')) {
          children.component = load(children.component)
        }
        if (!children.path) children.path = route.path
      }
    }
    routes[0].children.push(route)
  }
}

routes[0].children.push({ path: '*', component: load('pages/404') })

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  // base: '/:lang',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

Router.afterEach((to, from) => {
  commonMixin.methods.changeI18n(Router, Vue.i18n, to.params.lang)
})

// This callback runs before every route change, including on page load.
Router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title)

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags)
  // const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(
    el => el.parentNode.removeChild(el)
  )

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next()

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement('meta')

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key])
      })

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '')

      return tag
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag))

  next()
})

export default Router
