<template>
  <q-page>
    <quizHeader />

    <p>{{ this.$store.state.actualQuestion }}</p>
    <l-map class="fixed" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-geo-json :geojson="geojson"></l-geo-json>
    </l-map>
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
import "leaflet/dist/leaflet.css"
import { LMap, LGeoJson, LTileLayer } from "@vue-leaflet/vue-leaflet";


export default {
  name: "QuizFrame",

  components: {
    quizHeader,
    quizFooter,
    helpOptions,
    LMap,
    LGeoJson,
    LTileLayer,
  },

  data(){
    return {
      actualQuestionID: '',
      actualQuestion: {},
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 8,
      center: [47.313220, -1.319482],
      geojson: null
    };
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
    },
    async created () {
      const response = await fetch('https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson');
      this.geojson = await response.json();
    }
  }
}
</script>

<style scoped>

</style>
