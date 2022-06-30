<template>
  <div class="mefo-quiz-footer row">
    <div class="col-6 mefo-prev-quest">
      <q-btn class="eras-font-demi" :label="$t('quizFrame.footer.prev')" color="primary" unelevated no-caps v-if="$store.state.finishedQuestions.length >0" />
    </div>
    <div class="col-6 mefo-next-quest">
      <q-btn class="eras-font-demi" :label="$t('quizFrame.footer.next')" color="primary" unelevated no-caps />
    </div>
  </div>
</template>

<script>
export default {
  name: "QuizFooter"
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
