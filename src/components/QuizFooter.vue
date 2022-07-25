<template>
  <div class="mefo-page-footer row q-pl-lg q-pr-lg">
    <q-btn class="primaryButton" @click="
             incStepCounterHandler();
             nextQuestionHandler();
             saveAnswerHandler();
             calcDistanceHandler()"
           unelevated
           no-caps
           :disable="this.$store.state.initialMarkerLatLangBool"
           :loading="this.$store.state.initialMarkerLatLangBool && this.$store.state.stepCounter > 1"
    >
      {{ this.$store.state.stepCounter === this.$store.state.selectedQuiz.randomQuestions.length ? $t('quizFrame.footer.last') : $t('quizFrame.footer.next') }}
    </q-btn>
  </div>
</template>

<script>
export default {
  name: "QuizFooter",

  methods: {
    nextQuestionHandler() {
      this.$emit('load-nextQuest')
    },
    saveAnswerHandler(){
      this.$emit('save-Answer')
    },
    calcDistanceHandler(){
      this.$emit('calc-Dist')
    },
    prevQuestionHandler(){
      this.$emit('load-prevQuest')
    },
    incStepCounterHandler(){
      this.$emit('inc-StepCounter')
    }
  }
}
</script>
