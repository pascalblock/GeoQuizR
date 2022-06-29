<template>
  <q-page>
    <quizHeader />
    <p class="q-pl-lg">Moin</p>
    <q-page-sticky position="bottom-left" :offset="[18, 56]">
      <q-btn round color="primary" icon="arrow_back" :to="{ name: 'QuizStart'}" />
    </q-page-sticky>
    <helpOptions />
    <quizFooter />
  </q-page>
</template>

<script>
import quizHeader from "components/QuizHeader";
import quizFooter from "components/QuizFooter";
import helpOptions from "components/HelpOptions";

export default {
  name: "QuizFrame",

  components: {
    quizHeader,
    quizFooter,
    helpOptions
  }
}
</script>

<style scoped>

</style>
