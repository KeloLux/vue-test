<template>
  <q-list no-border link separator class="bg-h-green">
    <q-item v-for="item in menu" v-bind:key="item.title" v-if="item.isVisible" :to="`/${$i18n.locale()}/${item.path}`" item exact>
      <q-item-side v-if="item.icon" :icon="item.icon" />
      <q-item-main>
        <q-item-tile label>{{item.title}}</q-item-tile>
        <q-item-tile sublabel>{{item.path }} </q-item-tile>
        <q-item-tile sublabel>{{$t("lang.es") }} </q-item-tile>
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script>
import {
  QItemTile
} from 'quasar'

import menu from '@statics/menu.json'

export default {
  name: 'index',
  components: {
    QItemTile
  },
  data () {
    return {
      count: this.$store.state.count,
      menu: menu
    }
  },
  methods: {
    toggleChildren (item) {
      item.isOpen = !item.isOpen
    }
  }
}
</script>

<style lang="stylus">
</style>
