<template>
  <q-page>
    <quizHeader />

    <p>{{ this.$store.state.actualQuestion }}</p>

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
import { collection, onSnapshot, doc, deleteDoc, updateDoc, getDocs, orderBy, query, addDoc, where } from "firebase/firestore";
import { db, auth } from "src/boot/firebase";

export default {
  name: "QuizFrame",

  components: {
    quizHeader,
    quizFooter,
    helpOptions
  },

  date(){
    return {
      actualQuestionID: '',
      actualQuestion: {}
    }
  },

  created() {
    this.getQuestionID()
  },

  methods: {
    getQuestionID(){
      const questionID = this.$store.state.selectedQuiz.randomQuestions.slice(0,1).shift()
      this.actualQuestionID = questionID

      this.getQuestion()
    },

    async getQuestion(){
      const question = query(collection(db, 'questions'))

      const querySnapshot = await getDocs(question)

      querySnapshot.forEach((doc) => {
        let lanG = this.$i18n.locale
        if(doc.id === this.actualQuestionID){
          this.actualQuestion = {
            ...doc.data(),
            id: doc.id,
            help: doc.data().help[lanG],
            name: doc.data().name[lanG]
          }
        }
      })
      console.log('Frage', this.actualQuestion)

      this.$store.commit('storeActualQuestion', {
        ...this.actualQuestion
      })
    }
  }
}
</script>

<style scoped>

</style>
