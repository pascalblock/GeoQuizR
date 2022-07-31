<template>
  <q-page>
    <q-pull-to-refresh
      @refresh="refresh"
      color="primary"
      icon="location_on"
      class=""
    >
    <div class="gt-sm quiz-wrapper">
      <QuizCard
        v-for="quiz in availableQuizzes"
        :key="quiz.id"
        v-bind="quiz"
        @select-quiz="selectTheQuiz(quiz)"
        class=""
      />
    </div>
      <div class="lt-md">
      <QuizCard
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
import { defineComponent, ref } from 'vue';
import { collection, onSnapshot, doc, deleteDoc, updateDoc, getDocs, orderBy, query, addDoc, where } from "firebase/firestore";
import { db, auth } from "src/boot/firebase";
import QuizCard from "components/QuizCard";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: 'PageIndex',

  components: {
    QuizCard
  },

  data() {
    return {
      availableQuizzes: []
    }
  },

  created() {
    this.getQuiz()
  },

  setup(){
    const { locale } = useI18n({ useScope: 'global' })
    return{
      locale
    }
  },

  watch: {
    locale(newValue){
      this.getQuiz()
    }
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
