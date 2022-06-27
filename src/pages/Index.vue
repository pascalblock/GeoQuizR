<template>
  <q-page class="flex flex-center">
    <q-btn @click="getQuiz" label="quiz" />

    <quizCard
      v-for="quiz in availableQuizzes"
      :key="quiz.id"
      v-bind="quiz"
    />
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
  },

  methods: {
    async getQuiz(){
      const quizList = query(collection(db, 'quiz'))

      const querySnapshot = await getDocs(quizList);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        let lanG = this.$i18n.locale
        this.availableQuizzes.push({
          ...doc.data(),
          id: doc.id,
          description: doc.data().description[lanG],
          name: doc.data().name[lanG]
        })
      })
    }
  }
})
</script>
