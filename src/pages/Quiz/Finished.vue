<template>
  <q-page class="mefo-results-page">
    <page-header :headline-title="$t('resultPage.headline') "/>
    <div>
      <p style="text-align: center"><b>{{ $t('resultPage.statistics') }}</b></p>
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
    <q-page-sticky position="bottom" class="mefo-overlap" :offset="[0, 18]">
      <q-btn class="primaryButton" no-caps @click="increasePlayerCounter() ;resetAllResults()" :to="{name: 'home'}" :label="$t('resultPage.goToHome')" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import ResultCard from "components/ResultCard";
import {db} from "boot/firebase";
import {doc, updateDoc, increment } from "firebase/firestore";
import pageHeader from "components/PageHeader";

export default {
  name: "Finished",

  components: {
    ResultCard,
    pageHeader,
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
    /**
     * The following three functions calculate how many answers were good, average and bad
     */

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

    /**
     * Resets all data stored in the vuex store.
     */

    resetAllResults(){
      this.$store.commit('clearSelectedQuiz')
      this.$store.commit('clearActualQuestion')
      this.$store.commit('clearFinishedQuestions')
      this.$store.commit('clearStepCount')
      this.$store.commit('resetInitialMarkerLatLangBool')
    },

    /**
     * Increases the number of users in the database
     * @returns {Promise<void>}
     */

    async increasePlayerCounter(){
      const quizID = this.$store.state.selectedQuiz.id

      const playerRef = doc(db, 'quiz', quizID)

      await updateDoc(playerRef, {
        player: increment(1)
      });
    }
  }
}
</script>
