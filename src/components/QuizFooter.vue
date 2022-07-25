<template>
  <div class="mefo-quiz-footer row">
    <div class="col-6 mefo-prev-quest">
      <!--
      <q-btn class="eras-font-demi" @click="prevQuestionHandler" :label="$t('quizFrame.footer.prev')" color="primary" unelevated no-caps v-if="$store.state.finishedQuestions.length >0" />
     -->
    </div>
    <div class="col-6 mefo-next-quest">
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
