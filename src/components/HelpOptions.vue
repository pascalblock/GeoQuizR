<template>
  <q-page-sticky position="bottom" :offset="[0, 70]">
    <q-fab color="primary" icon="question_mark" direction="up">
      <q-fab-action class="mefo-help-options" @click="layerSwitchHandler"  icon="layers" :label="$t('quizFrame.helpOptions.layer')" />
      <q-fab-action class="mefo-help-options" @click="helpSound($t('Language.key'))" icon="volume_up" :label="$t('quizFrame.helpOptions.speech')" />
    </q-fab>
  </q-page-sticky>
</template>

<script>
import { ScreenReader } from '@capacitor/screen-reader';

export default {
  name: "HelpOptions",

  data(){
    return {
      sound: ''
    }
  },

  methods: {

    /**
     * @returns {Promise<void>}
     * Capacitor Screen Reader that outputs the help text through the device's speakers.
     */

    async helpSound(languageKey){
      this.sound = this.$store.state.actualQuestion.help
      await ScreenReader.speak({value: this.sound, language: languageKey});
    },
    layerSwitchHandler(){
      this.$emit('layer-Switch')
    }
  }
}
</script>
