<template>
  <!-- Use <q-side-link> component instead of <q-item> for internal vue-router navigation -->
  <q-list no-border link separator class="bg-h-green">
    <q-side-link v-for="item in menu" v-bind:key="item.title" v-if="item.isVisible" :to="item.path" item exact>
      <q-item-side v-if="item.icon" :icon="item.icon" />
      <q-item-main>
        <q-item-tile label>{{item.title}}</q-item-tile>
      </q-item-main>
    </q-side-link>
  </q-list>
</template>

<script>
    /* eslint-disable */
    import {
        dom,
        event,
        openURL,
        QBtn,
        QIcon,
        QList,
        QListHeader,
        QItem,
        QSideLink,
        QItemSide,
        QItemMain,
        QItemTile,
        QInput,
        QPopover,
        QItemWrapper
    } from "quasar";

import menu from 'data/menu.json'


    export default {
        name: "index",
        components: {
            QBtn,
            QIcon,
            QList,
            QListHeader,
            QItem,
            QSideLink,
            QItemSide,
            QItemMain,
            QItemTile,
            QPopover,
        },
        data() {
            return {
                count: this.$store.state.count,
                menu: menu
            }
        },
        methods: {
            toggleChildren(item) {
                item.isOpen = !item.isOpen
            },
            launch(url) {
                openURL(url);
            }
        }
    };
</script>

<style lang="stylus">
</style>