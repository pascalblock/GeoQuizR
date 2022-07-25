<template>
  <div class="mefo-quiz-header row">
    <div class="row col-4 q-pl-lg mefo-quiz-count">
      <p >{{ $t('quizFrame.header.question') }}</p>
      <p>{{this.$store.state.stepCounter}}/{{ this.$store.state.selectedQuiz.randomQuestions.length }}</p>
    </div>
    <div class="items-center">
      <p><b>{{ this.$store.state.actualQuestion.name }}</b></p>
    </div>
    <q-btn class="q-ml-lg" color="primary" @click="titleSound($t('Language.key'))" icon="record_voice_over"/>
  </div>
</template>

<script>
import { ScreenReader } from '@capacitor/screen-reader';
export default {
  name: "QuizHeader",
  data() {
    return {
      sound: ''
    }
  },

  methods: {
    async titleSound(languageKey){
      await ScreenReader.speak({value: this.$store.state.actualQuestion.name, language: languageKey});
    },
  }
}
</script>
