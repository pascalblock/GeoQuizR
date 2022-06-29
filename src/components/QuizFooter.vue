<template>
  <div class="mefo-quiz-footer row q-pl-lg q-pr-lg">
    <div class="buttonSpace">
      <q-btn class="eras-font-demi relative-position" size="md" :label="$t('quizFrame.footer.prev')" color="primary" unelevated no-caps/>
      <q-btn class="eras-font-demi relative-position" size="md" :label="$t('quizFrame.footer.next')" color="primary" unelevated no-caps />
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
  justify-content: center;
  align-items: center;
}

.buttonSpace{
  width: 100%;
  justify-content: space-between;
  display: flex;
}

</style>
