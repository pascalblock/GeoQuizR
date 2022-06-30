<template>
  <div class="mefo-quiz-header row">
    <div class="row col-4 q-pl-lg mefo-quiz-count">
      <p>{{ $t('quizFrame.header.question') }}</p>
      <p>{{ this.$store.state.finishedQuestions.length +1 }}/{{ this.$store.state.selectedQuiz.randomQuestions.length }}</p>
    </div>

    <div class="mefo-quiz-question col-8">
      <p><b>{{ this.$store.state.actualQuestion.name }}</b></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuizHeader"
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

.mefo-quiz-question{
  justify-content: flex-start;
  display: flex;
  padding-left: 1rem;
}

</style>
