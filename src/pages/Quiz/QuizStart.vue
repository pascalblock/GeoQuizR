<template>
  <q-page class="mefo-start-quiz">
    <div class="mefo-quiz-title">
      <h1 class="nexa-font mefo-start-quiz-name">{{ this.$store.state.selectedQuiz.name }}</h1>
      <q-btn style="width: 180px" size="lg" class="eras-font-demi" no-caps color="primary" :label="$t('startPage.startButton')" :to="{name: 'quiz'}" />
    </div>
    <q-page-sticky class="q-pa-lg" position="bottom-left">
      <q-btn @click="resetQuizSelection" round color="primary" icon="meeting_room" :to="{ name: 'home'}" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref } from 'vue'
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
    }
  }
}
</script>

<style lang="scss">
.mefo-start-quiz{
  display: flex;
}
.mefo-start-quiz::after{
  content: '';
  position: absolute;
  background-image: url("../../assets/quizImages/Maps.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  opacity: 0.6;
  width: 100%;
  height: 100%;
}
.mefo-quiz-title{
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-40%);
  text-align: center;
}

.mefo-start-quiz-name{
  color: $primary;
  font-size: 3rem;
  margin-bottom: unset;
}
</style>
