<template>
  <q-page class="mefo-start-quiz">
    <div>
      <h5 class="mefo-start-quiz-name">{{ this.$store.state.selectedQuiz.name }}</h5>
      <q-btn color="secondary" no-caps :label="$t('startPage.startButton')" :to="{name: 'quiz'}" />
    </div>
    <q-page-sticky position="bottom-left" :offset="[18, 56]">
      <q-btn round color="primary" @click="resetQuizSelection" icon="arrow_back" :to="{ name: 'home'}" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "QuizStart",

  methods:{
    resetQuizSelection(){
      this.$store.commit('clearSelectedQuiz')
      this.$store.commit('clearActualQuestion')
    }
  }
}
</script>

<style lang="scss">
.mefo-start-quiz{
  background-image: url("../../assets/quizImages/Maps.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;

  div{
    text-align: center;
    .mefo-start-quiz-name{
      font-size: 2rem;
      font-weight: 600;
      color: $secondary;
      margin-bottom: 1rem;
      text-transform: uppercase;
    }
  }
}
</style>
