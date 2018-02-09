<template>
  <!-- Use <q-side-link> component instead of <q-item> for internal vue-router navigation -->
  <q-list no-border link separator class="bg-h-green">
    <q-side-link item to="/" exact>
      <q-item-side icon="home" />
      <q-item-main>
        <q-item-tile label>{{ $t('home') }}</q-item-tile>
      </q-item-main>
    </q-side-link>
    <q-side-link item to="/parking" exact>
      <q-item-side icon="layers" />
      <q-item-main label="Table" />
    </q-side-link>
    <q-side-link item to="/nfc" exact>
      <q-item-side icon="home" />
      <q-item-main>
        <q-item-tile label>Test NFC</q-item-tile>
      </q-item-main>
    </q-side-link>
    <q-side-link item to="/card" exact>
      <q-item-side icon="home" />
      <q-item-main>
        <q-item-tile label>Cards</q-item-tile>
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
      count: this.$store.state.count
    };
  },
  methods: {
    launch(url) {
      openURL(url);
    }
  }
};
</script>

<style lang="stylus">
</style>
