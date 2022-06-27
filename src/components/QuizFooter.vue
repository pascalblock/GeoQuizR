<template>
  <div class="mefo-quiz-footer row">
    <q-btn :label="$t('quizFrame.footer.prev')" color="primary" unelevated no-caps/>
    <q-btn :label="$t('quizFrame.footer.next')" color="primary" unelevated no-caps />
  </div>
</template>

<script>
export default {
  name: "QuizFooter"
}
</script>

<style lang="scss" scoped>

.mefo-quiz-footer{
  border-top: solid 2px $secondary;
  height: 3rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  justify-content: space-around;
  align-items: center;

  q-btn{
    height: 2rem;
  }
}

</style>
