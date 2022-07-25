<template>
  <div class="mefo-quiz-header row">
    <div class="row mefo-quiz-count">
      <p>{{ $t('quizFrame.header.question') }}</p>
      <p>{{this.$store.state.stepCounter}}/{{ this.$store.state.selectedQuiz.randomQuestions.length }}</p>
    </div>
    <div class="mefo-quiz-header-question" @click="titleSound($t('Language.key'))">
      <p><b>{{ this.$store.state.actualQuestion.name }}</b></p>
    </div>
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
