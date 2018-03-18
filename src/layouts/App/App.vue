<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          Quasar App
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>
        <q-btn color="link-color">
          <q-item>
            <img :src="`statics/i18n/${$i18n.locale()}.png`" width="24">
          </q-item>
          <q-item-side icon="keyboard_arrow_down" />
          <q-popover ref="popover">
            <q-list link>
              <q-item v-for="lang in $store.state.locales" v-bind:key="lang" v-if="lang.toUpperCase() != $i18n.locale().toUpperCase()" @click.native="changeI18n($router, $i18n, lang)" v-close-overlay>
                <q-item-main label>{{ lang.toUpperCase() }}</q-item-main>
                <q-item-side>
                  <img :src="`statics/i18n/${lang}.png`" width="24">
                </q-item-side>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <app-nav-left/>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-layout-footer>
      <q-toolbar color="primary" :inverted="$q.theme === 'ios'">
        <app-footer/>
      </q-toolbar>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import { openURL, QPopover, QLayoutFooter } from 'quasar'
import AppNavLeft from './AppNavLeft.vue'
import AppFooter from './AppFooter.vue'
import { commonMixin } from '@mixins/index.js'

export default {
  name: 'LayoutDefault',
  mixins: [commonMixin],
  components: {
    AppNavLeft, AppFooter, QPopover, QLayoutFooter
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    console (component) {
      console.log(component)
    }
  }
}
</script>

<style lang='stylus'>
#testcolor {
  color: white !important;
}
</style>
