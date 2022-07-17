<template>
  <div class="mefo-quiz-header row">
    <div class="row col-4 q-pl-lg mefo-quiz-count">
      <p >{{ $t('quizFrame.header.question') }}</p>
      <p>{{this.$store.state.stepCounter}}/{{ this.$store.state.selectedQuiz.randomQuestions.length }}</p>
    </div>
    <div class="row items-center">
      <p class="q-pr-lg"><b>{{ this.$store.state.actualQuestion.name }}</b></p>
      <q-btn color="primary" @click="titleSound($t('Language.key'))" icon="record_voice_over"></q-btn>
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

<style lang="scss" scoped>

.mefo-quiz-header{
  height: 3rem;
  text-align: center;
  align-items: center;
  border-bottom: solid 2px $primary;

  p {
    margin-bottom: 0;
  }
}

.mefo-quiz-count{
  padding-left: 1rem;

  :first-child{
    margin-right: .2rem;
  }
}

</style>
