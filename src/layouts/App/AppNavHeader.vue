<template>
  <q-tabs color="primary" :inverted="$q.theme === 'ios'" :style="$q.theme === 'ios' ? { background: 'rgba(255,255,255,0.95' } : null">
    <q-route-tab v-for="tab in menu" v-bind:key="tab.title" v-if="tab.isVisible" slot="title" :to="tab.path" :icon="tab.icon" replace :label="tab.title" />
  </q-tabs>
</template>

<script>
import {
  QTabs, QRouteTab
} from 'quasar'

import menu from '@statics/menu.json'

export default {
  name: 'index',
  components: {
    QTabs, QRouteTab
  },
  data () {
    return {
      menu: menu
    }
  }
}
</script>

<style lang="stylus">
</style>
