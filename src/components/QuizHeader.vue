<template>
  <div class="mefo-quiz-header row">
    <div class="col-5 row mefo-quiz-count">
      <p>{{ $t('quizFrame.header.question') }}</p>
      <p>{{this.$store.state.stepCounter}}/{{ this.$store.state.selectedQuiz.randomQuestions.length }}</p>
    </div>
    <div class="justify-center">
      <p><b>{{ this.$store.state.actualQuestion.name }}</b></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuizHeader",
  data() {
    return {
      sound: ''
    }
  },
}
</script>
