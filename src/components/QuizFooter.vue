<template>
  <div class="mefo-quiz-footer row">
    <div class="col-6 mefo-prev-quest">
      <!--
      <q-btn class="eras-font-demi" @click="prevQuestionHandler" :label="$t('quizFrame.footer.prev')" color="primary" unelevated no-caps v-if="$store.state.finishedQuestions.length >0" />
     -->
    </div>
    <div class="col-6 mefo-next-quest">
      <!--$t('quizFrame.footer.next')-->
      <q-btn class="eras-font-demi"
             @click="
             incStepCounterHandler();
             nextQuestionHandler();
             saveAnswerHandler();
             calcDistanceHandler()"
             color="primary"
             unelevated
             no-caps
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

<style lang="scss" scoped>

.mefo-quiz-footer{
  border-top: solid 2px $primary;
  height: 3rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  align-items: center;
  background-color: white;

  .mefo-next-quest{
    display: flex;
    justify-content: flex-end;

    .q-btn{
      margin-right: 1rem;
    }
  }

  .mefo-prev-quest{
    display: flex;
    justify-content: flex-start;

    .q-btn{
      margin-left: 1rem;
    }
  }

  q-btn{
    height: 2rem;
  }
}

</style>
