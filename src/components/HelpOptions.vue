<template>
  <q-page-sticky position="bottom" :offset="[0, 56]">
    <q-fab color="primary" icon="question_mark" direction="up">
      <q-fab-action color="accent" icon="layers" :label="$t('quizFrame.helpOptions.layer')" />
      <q-fab-action color="accent" @click="helpSound" icon="volume_up" :label="$t('quizFrame.helpOptions.speech')" />
    </q-fab>
  </q-page-sticky>
</template>

<script>
import { ScreenReader } from '@capacitor/screen-reader';

export default {
  name: "HelpOptions",

  data(){
    return {
      countrySound: 'Moin Moin'
    }
  },

  methods: {
    async helpSound(){
      await ScreenReader.speak({value: this.countrySound});
    }
  }
}
</script>

<style scoped>

</style>
