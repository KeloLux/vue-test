<template>
  <q-page padding>
    <q-card v-for="n in 20" v-bind:key="n" inline class="q-ma-sm">
      <q-card-title>
        Title
        <span slot="subtitle">Subtitle</span>
        <q-btn round flat icon="more_vert" slot="right">
          <q-popover>
            <q-list link class="no-border">
              <q-item v-close-overlay>
                <q-item-main label="Remove Card" />
              </q-item>
              <q-item v-close-overlay>
                <q-item-main label="Send Feedback" />
              </q-item>
              <q-item v-close-overlay>
                <q-item-main label="Share" />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </q-card-title>
      <q-card-main>

      </q-card-main>
      <q-card-separator />
      <q-card-actions>
        <q-btn round class="text-red" icon="favorite" />
        <q-btn round class="text-green flip-horizontal" icon="reply" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { QCard, QCardTitle, QCardMain, QPopover, QCardSeparator, QCardActions } from 'quasar'

export default {
  name: 'inventory',
  components: {
    QCard, QCardTitle, QCardMain, QPopover, QCardSeparator, QCardActions
  }

}
</script>

<style>

</style>
