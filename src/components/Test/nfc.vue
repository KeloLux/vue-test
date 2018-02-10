<template>
  <div class="layout-padding row  ">
    <q-card class="col-auto">
      <q-card-title>
        NFC
        <span v-if="compatible" slot="subtitle">{{$t("nfcText.waitingTag")}}</span>
      </q-card-title>
      <q-card-main v-if="compatible">
        <q-list>
          <q-list-header>{{$t("nfcText.history")}}</q-list-header>
          <q-item v-if="items.length > 0" v-for="item in items" v-bind:key="item" v-text="item"></q-item>
          <q-item v-else v-text="$t('nfcText.noHistory')" class="text-xs-center"></q-item>
        </q-list>
      </q-card-main>
      <q-card-main v-else-if="nfc_disabled">
        <q-card-separator />
        <q-card-actions class="justify-center">
          <q-btn class="generic-margin" color="deep-orange" v-on:click="showSettings">{{$t("nfcText.showSettings")}}</q-btn>
          <q-btn class="generic-margin" color="info" v-on:click="unregisterTagEvent();registerTagEvent();">{{$t("reload")}}</q-btn>
        </q-card-actions>
      </q-card-main>
      <q-card-main v-else>{{$t("nfcText.notAvailable")}}</q-card-main>
    </q-card>
    <q-card class="col-auto">
      <q-collapsible label="Log">
        <pre>{{log}}</pre>
      </q-collapsible>
    </q-card>
  </div>
</template>

<script>
    import { nativeAlert
    } from '../../libs'
    import moment from 'moment'
    import {
      QCard,
      QCardTitle,
      QCardMain,
      QCardSeparator,
      QCardActions,
      QList,
      QListHeader,
      QItem,
      QBtn,
      QCollapsible
    } from 'quasar'

    export default {
      name: 'nfc',
      components: {
        QCard,
        QCardTitle,
        QCardMain,
        QCardSeparator,
        QCardActions,
        QList,
        QListHeader,
        QItem,
        QBtn,
        QCollapsible
      },
      data () {
        return {
          compatible: true,
          nfc_disabled: false,
          dialog: false,
          items: JSON.parse(localStorage.getItem('scanHistory') || '[]'),
          log: ''
        }
      },
      watch: {
        items (v) {
          // Watch push on the items data. If a new item is push save it to the « localStorage ».
          localStorage.setItem('scanHistory', JSON.stringify(this.items))
        }
      },
      mounted () {
        // When the view is mounted, register the scan tag event.
        this.addLog('Mounted')
        this.registerTagEvent()
      },
      beforeDestroy () {
        // When the view is destroyed (user leave), unregister the scan tag event, to avoid scanning tag in other view
        this.addLog('BeforeDestroy')
        this.unregisterTagEvent()
      },
      methods: {
        registerTagEvent () {
          // Unregister previously « resume » event listener.
          this.addLog('registerTagEvent nfc = ' + typeof nfc)
          document.removeEventListener('resume', this.registerTagEvent, false)
          if (typeof nfc !== 'undefined') {
            // Nfc is available, waiting for scan
    
            nfc.addNdefListener(
              this.onNdef, () => { this.success(); this.addLog('addNdefListener') },
              this.error
            )

            nfc.addTagDiscoveredListener(
              this.displayTagId, this.success, this.error
            )
            nfc.addTagDiscoveredListener(
              'text/pg', this.onNdef, this.error
            )
          }
          else {
            // Plugin not present or failed to initialized.
            this.error()
          }
        },
        unregisterTagEvent () {
          // Test if the plugin is defined
          this.addLog('unregisterTagEvent nfc = ' + typeof nfc)
          if (typeof nfc !== 'undefined') {
            nfc.removeTagDiscoveredListener(this.displayTagId)
          }
        },
        displayTagId (nfcEvent) {
          // Decode tag data from the plugin
          const tag = nfcEvent.tag
          this.addLog('displayTagId tag = ' + JSON.stringify(nfcEvent.tag))
          const tagId = nfc.bytesToHexString(tag.id)
          // Push the new tag to the saved list
          this.items.push(tagId)
          // Show the tag Id to the user
          nativeAlert(`${this.$t('nfcText.tagSerial')} : ${tagId}`)
        },
        onNdef: function (nfcEvent) {
          this.addLog('onNdef tag = ' + JSON.stringify(nfcEvent.tag))
          navigator.notification.vibrate(100)
        },
        error (e) {
          // Manage the state
          this.addLog('error e = ' + e)
          if (e === 'NFC_DISABLED') {
            this.compatible = false
            this.nfc_disabled = true
          }
          else {
            this.nfc_disabled = false
            this.compatible = false
          }
        },
        success () {
          this.addLog('success')
          this.compatible = true
          this.nfc_disabled = false
        },
        showSettings () {
          // Trigger the phone settings to enable the Nfc settings
          this.addLog('showSettings')
          nfc.showSettings()
          // To refresh the state of the nfc, we add a listener to the « resume » event.
          // The resume event is triggered by cordova when the app is « Resumed ».
          document.addEventListener('resume', this.registerTagEvent, false)
        },
        addLog (method) {
          this.log += method.replace(/\b\w/g, l => l.toUpperCase()) + ' ' + moment().format('HH:mm:ss DD/MM/YYYY') + ' \n'
        }
      }
    }
</script>