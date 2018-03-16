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

export default store
/*
import Vue from 'vue'
import Vuex from 'vuex'

import example from './module-example'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    example
  }
})

export default store
*/
