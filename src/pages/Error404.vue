<template>
  <div class="fullscreen bg-secondary text-white text-center q-pa-md flex flex-center">
    <div>
      <h1 class="text-white nexa-font">
        {{ $t('Error.error_404.code') }}
      </h1>
      <h2 class="text-white eras-font">
        {{ $t('Error.error_404.message') }}
      </h2>

      <q-btn
        class="invertedButton"
        unelevated
        to="/"
        :label="$t('Buttons.home.label')"
        no-caps
        size="lg"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error404'
})
</script>
