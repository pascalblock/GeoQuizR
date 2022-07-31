<template>
  <q-page class="mefo-start-quiz">
    <div class="mefo-quiz-title">
      <h1 class="gt-sm mefo-start-quiz-name">{{ this.$store.state.selectedQuiz.name }}</h1>
      <h1 class="gt-xs lt-md mefo-start-quiz-name-sm">{{ this.$store.state.selectedQuiz.name }}</h1>
      <h1 class="lt-sm mefo-start-quiz-name-xs">{{ this.$store.state.selectedQuiz.name }}</h1>
      <q-btn class="primaryButton" no-caps :label="$t('startPage.startButton')" :to="{name: 'quiz'}" />
    </div>
    <q-page-sticky class="q-pa-lg" position="bottom-left">
      <q-btn class="secondaryButton" @click="resetQuizSelection" round color="primary" icon="meeting_room" :to="{ name: 'home'}" />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: "QuizStart",

  methods:{
    /**
     * Resets all data stored in the vuex store.
     */
    resetQuizSelection(){
      this.$store.commit('clearSelectedQuiz')
      this.$store.commit('clearActualQuestion')
      this.$store.commit('clearFinishedQuestions')
      this.$store.commit('clearStepCount')
      this.$store.commit('resetInitialMarkerLatLangBool')
    }
  }
}
</script>
