<template>
  <q-page class="mefo-results-page">
    <h4>
      {{ $t('resultPage.headline') }}
    </h4>

    <div>
      <p style="text-align: center" class="text-h6"><b>{{ $t('resultPage.statistics') }}</b></p>
      <div class="row" style="display: flex; justify-content: space-around">
        <div>
          <q-circular-progress
            show-value
            font-size="16px"
            class="text-green"
            :value="closePercent"
            size="60px"
            :thickness="0.1"
            color="green"
            track-color="grey-3"
          >
            <q-icon name="thumb_up" size="1.5rem"/>
          </q-circular-progress>
          <p style="text-align: center; color: green;">{{ this.closePercent }}%</p>
        </div>

        <div>
          <q-circular-progress
            show-value
            font-size="16px"
            class="text-orange"
            :value="furtherPercent"
            size="60px"
            :thickness="0.1"
            color="orange"
            track-color="grey-3"
          >
            <q-icon name="thumbs_up_down" size="1.5rem" />
          </q-circular-progress>
          <p style="text-align: center; color: orange">{{ this.furtherPercent }}%</p>
        </div>

        <div>
          <q-circular-progress
            show-value
            font-size="16px"
            class="text-red"
            :value="farPercent"
            size="60px"
            :thickness="0.1"
            color="red"
            track-color="grey-3"
          >
            <q-icon name="thumb_down" size="1.5rem" />
          </q-circular-progress>
          <p style="text-align: center; color: red">{{ this.farPercent }}%</p>
        </div>
      </div>
    </div>

    <div class="mefo-results">
      <ResultCard
        v-for="answer in this.$store.state.finishedQuestions"
        :key="answer.id"
        v-bind="answer"
      />
    </div>

    <q-page-sticky position="bottom" :offset="[0, 18]">
      <q-btn color="primary" no-caps @click="resetAllResults" :to="{name: 'home'}" :label="$t('resultPage.goToHome')" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import ResultCard from "components/ResultCard";

export default {
  name: "Finished",

  components: {
    ResultCard
  },

  data(){
    return{
      closeAnswersArray: [],
      furtherAwayAnswersArray: [],
      farAwayAnswersArray: [],
      closePercent: '',
      furtherPercent: '',
      farPercent: ''
    }
  },

  created() {
    this.closeAnswers()
    this.furtherAwayAnswers()
    this.farAwayAnswers()
  },

  methods:{
    closeAnswers(){
      const closeAns = this.$store.state.finishedQuestions
      this.closeAnswersArray = closeAns.filter(answer => answer.distance < 30)
      const closeAnswerCount = this.closeAnswersArray.length

      this.closePercent = Math.round((closeAnswerCount/closeAns.length)*100)
    },
    furtherAwayAnswers(){
      const furtherAwayAns = this.$store.state.finishedQuestions
      this.furtherAwayAnswersArray = furtherAwayAns.filter(answer => answer.distance >= 30 && answer.distance < 50)

      const furtherAnswerCount = this.furtherAwayAnswersArray.length
      this.furtherPercent = Math.round((furtherAnswerCount/furtherAwayAns.length)*100)
    },
    farAwayAnswers(){
      const farAwayAns = this.$store.state.finishedQuestions
      this.farAwayAnswersArray = farAwayAns.filter(answer => answer.distance >= 50)

      const farAnswerCount = this.farAwayAnswersArray.length
      this.farPercent = Math.round((farAnswerCount/farAwayAns.length)*100)
    },


    resetAllResults(){
      this.$store.commit('clearSelectedQuiz')
      this.$store.commit('clearActualQuestion')
      this.$store.commit('clearFinishedQuestions')
      this.$store.commit('clearStepCount')
    }
  }
}
</script>

<style lang="scss">
.mefo-results-page h4{
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.mefo-results{
  margin-bottom: 5rem;
}

</style>
