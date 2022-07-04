<template>
  <q-page>
    <quizHeader />

    <p>{{ this.$store.state.actualQuestion }}</p>
    <p>{{markerLatLang}}</p>
    <l-map class="fixed" :zoom="zoom" :min-zoom="minZoom" :max-zoom="maxZoom" :center="markerLatLang">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :icon="marker.icon" v-model:lat-lng="markerLatLang" :draggable="marker.draggable" :visible="marker.visible" ></l-marker>
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
import { LMap, LGeoJson, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

export default {
  name: "QuizFrame",

  components: {
    quizHeader,
    quizFooter,
    helpOptions,
    LMap,
    LGeoJson,
    LTileLayer,
    LMarker,
  },

  data(){
    return {
      actualQuestionID: '',
      actualQuestion: {},
      // url: 'https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png',
      // url: 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
      ext: 'png',
      // url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.{ext}',
      url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.png',
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',      subdomains: 'abcd',
      minZoom: 4,
      maxZoom: 10,
      zoom: 8,
      geojson: null,
      markerLatLang: [47.313220, -1.319482],
      marker:
        {
          position: { lat: 47.313220, lang: -1.319482 },
          visible: true,
          draggable: true,
        },
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
