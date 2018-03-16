<template>
  <q-toolbar-title>
    Footer
  </q-toolbar-title>
</template>

<script>

import {
  QToolbarTitle
} from 'quasar'

export default {
  components: {
    QToolbarTitle
  },
  data () {
    return {
    }
  }
}
</script>

<style  >
.appfooter {
  position: absolute;
  bottom: 0;
  width: 100%;
  /* Set the fixed height of the footer here */
  height: 30px;
  line-height: 30px; /* Vertically center the text there */
  background-color: #f5f5f5;
}
.appfooter > .container {
  padding-right: 15px;
  padding-left: 15px;
}
</style>
