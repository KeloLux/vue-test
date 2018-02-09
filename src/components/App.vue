<template>
  <div id="app">
    <q-layout ref="layout" view="hhh LpR fff" :left-class="{'bg-grey-2': true}">
      <q-toolbar slot="header" class="">
        <q-btn flat @click="$refs.layout.toggleLeft()">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <q-btn color="link-color">
          <q-item>
            <img :src="require(`assets/images/${$i18n.locale()}.png`)" width="24">
          </q-item>
          <q-item-side icon="keyboard_arrow_down" />
          <q-popover ref="popover">
            <q-list link>
              <q-item v-for="locale in $store.state.locales" v-bind:key="locale" v-if="locale.toUpperCase() != $i18n.locale().toUpperCase()" @click="$refs.popover.close(); $i18n.set(locale)">
                <q-item-main label>{{ locale.toUpperCase() }}</q-item-main>
                <q-item-side>
                  <img :src="require(`assets/images/${locale}.png`)" width="24">
                </q-item-side>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </q-toolbar>

      <div slot="left">
        <app-nav-left></app-nav-left>
      </div>
      <router-view class="container app-content"></router-view>

      <q-toolbar slot="footer">
        <app-footer></app-footer>
      </q-toolbar>
    </q-layout>
  </div>
</template>

<script>
/* eslint-disable */
import {
  dom,
  event,
  openURL,
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QItemTile,
  QInput,
  QPopover,
  QItemWrapper
} from "quasar";

import AppFooter from "./AppFooter.vue";
import AppNavLeft from "./AppNavLeft.vue";
const { viewport } = dom,
  { position } = event,
  moveForce = 30,
  rotateForce = 40,
  RAD_TO_DEG = 180 / Math.PI;

function getRotationFromAccel(accelX, accelY, accelZ) {
  /* Reference: http://stackoverflow.com/questions/3755059/3d-accelerometer-calculate-the-orientation#answer-30195572 */
  const sign = accelZ > 0 ? 1 : -1;
  const miu = 0.001;

  return {
    roll:
      Math.atan2(
        accelY,
        sign * Math.sqrt(Math.pow(accelZ, 2) + miu * Math.pow(accelX, 2))
      ) * RAD_TO_DEG,
    pitch:
      -Math.atan2(
        accelX,
        Math.sqrt(Math.pow(accelY, 2) + Math.pow(accelZ, 2))
      ) * RAD_TO_DEG
  };
}

export default {
  name: "index",
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QItemTile,
    QPopover,
    AppNavLeft,
    AppFooter
  },
  data() {
    return {
      orienting: window.DeviceOrientationEvent && !this.$q.platform.is.desktop,
      rotating: window.DeviceMotionEvent && !this.$q.platform.is.desktop,
      moveX: 0,
      moveY: 0,
      rotateY: 0,
      rotateX: 0,
      count: this.$store.state.count
    };
  },
  computed: {
    position() {
      const transform = `rotateX(${this.rotateX}deg) rotateY(${
        this.rotateY
      }deg)`;
      return {
        top: this.moveY + "px",
        left: this.moveX + "px",
        "-webkit-transform": transform,
        "-ms-transform": transform,
        transform
      };
    }
  },
  methods: {
    locales() {},
    En() {
      this.$i18n.set("en");
    },
    Es() {
      this.$i18n.set("es");
    },
    launch(url) {
      openURL(url);
    },
    move(evt) {
      const { width, height } = viewport(),
        { top, left } = position(evt),
        halfH = height / 2,
        halfW = width / 2;

      this.moveX = (left - halfW) / halfW * -moveForce;
      this.moveY = (top - halfH) / halfH * -moveForce;
      this.rotateY = left / width * rotateForce * 2 - rotateForce;
      this.rotateX = -(top / height * rotateForce * 2 - rotateForce);
    },
    rotate(evt) {
      if (
        evt.rotationRate &&
        evt.rotationRate.beta !== null &&
        evt.rotationRate.gamma !== null
      ) {
        this.rotateX = evt.rotationRate.beta * 0.7;
        this.rotateY = evt.rotationRate.gamma * -0.7;
      } else {
        /* evt.acceleration may be null in some cases, so we'll fall back
           to evt.accelerationIncludingGravity */
        const accelX = evt.acceleration.x || evt.accelerationIncludingGravity.x,
          accelY = evt.acceleration.y || evt.accelerationIncludingGravity.y,
          accelZ =
            evt.acceleration.z || evt.accelerationIncludingGravity.z - 9.81,
          rotation = getRotationFromAccel(accelX, accelY, accelZ);

        this.rotateX = rotation.roll * 0.7;
        this.rotateY = rotation.pitch * -0.7;
      }
    },
    orient(evt) {
      if (evt.beta === null || evt.gamma === null) {
        window.removeEventListener("deviceorientation", this.orient, false);
        this.orienting = false;

        window.addEventListener("devicemotion", this.rotate, false);
      } else {
        this.rotateX = evt.beta * 0.7;
        this.rotateY = evt.gamma * -0.7;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.orienting) {
        window.addEventListener("deviceorientation", this.orient, false);
      } else if (this.rotating) {
        window.addEventListener("devicemove", this.rotate, false);
      } else {
        document.addEventListener("mousemove", this.move);
      }
    });
  },
  beforeDestroy() {
    if (this.orienting) {
      window.removeEventListener("deviceorientation", this.orient, false);
    } else if (this.rotating) {
      window.removeEventListener("devicemove", this.rotate, false);
    } else {
      document.removeEventListener("mousemove", this.move);
    }
  }
};
</script>

<style lang="stylus">
@import '~quasar-framework/dist/core.variables.styl';

header button {
  background-color: $link-color !important;
}

html {
  position: relative;
  min-height: 100%;
}
</style>
