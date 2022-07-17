<template>
  <q-page>
    <q-pull-to-refresh
      @refresh="refresh"
      color="primary"
      icon="location_on"
      class=""
    >
    <div class="gt-sm quiz-wrapper">
      <quizCard
        v-for="quiz in availableQuizzes"
        :key="quiz.id"
        v-bind="quiz"
        @select-quiz="selectTheQuiz(quiz)"
        class=""
      />
    </div>
      <div class="lt-md">
      <quizCard
        v-for="quiz in availableQuizzes"
        :key="quiz.id"
        v-bind="quiz"
        @select-quiz="selectTheQuiz(quiz)"
        class=""
      />
    </div>
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { collection, onSnapshot, doc, deleteDoc, updateDoc, getDocs, orderBy, query, addDoc, where } from "firebase/firestore";
import { db, auth } from "src/boot/firebase";
import quizCard from "components/quizCard";

export default defineComponent({
  name: 'PageIndex',

  components: {
    quizCard
  },

  data() {
    return {
      availableQuizzes: [],
      currentLang: this.$i18n.locale
    }
  },

  created() {
    this.getQuiz()
    //this.currentLang = this.$i18n.locale
  },

  watch: {
    currentLang: function(value){
      console.log('watch', value)
    },

    /*currentLang(newLang, oldLang){
      if( this.currentLang !== this.$i18n.locale ){
        this.getQuiz()
        console.log('Mooooin')
      } else {
        console.log('Fail')
      }
    },*/

    /*currentLang: function(value){
      console.log(value, 'teeeesst')
      this.getQuiz()
    }*/
  },



  methods: {
    async getQuiz(){
      this.$q.loading.show(
        {
          spinnerColor: 'primary',
          backgroundColor: 'secondary'
        }
      )
      const quizList = query(collection(db, 'quiz'))

      const querySnapshot = await getDocs(quizList)
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        let lanG = this.$i18n.locale
        if (!this.availableQuizzes.find(obj => obj.id === doc.id)){
          this.availableQuizzes.push({
            ...doc.data(),
            id: doc.id,
            description: doc.data().description[lanG],
            name: doc.data().name[lanG]
          })
          this.$q.loading.hide()
        }else {
          let index = this.availableQuizzes.findIndex(obj => obj.id === doc.id)
          this.availableQuizzes.splice(index, 1)
          this.availableQuizzes.push({
            ...doc.data(),
            id: doc.id,
            description: doc.data().description[lanG],
            name: doc.data().name[lanG]
          })
          this.$q.loading.hide()
        }
      })
    },

    selectTheQuiz(quiz) {
      const randomQuest = quiz.questions.sort(() => 0.5 - Math.random()).slice(0, 10)

      this.$store.commit('storeSelectedQuiz', {
        ...quiz, randomQuestions: randomQuest
      })
      console.log('State', this.$store.state.selectedQuiz)
      console.log( 'random', randomQuest)
    },

    refresh (done) {
      setTimeout(() => {
        this.getQuiz()
        done()
      }, 1000)
    }
  }
})
</script>
