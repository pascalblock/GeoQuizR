<template>
  <q-page>
    <quizHeader />
<!--
    <p>{{ this.$store.state.actualQuestion }}</p>
    <p>{{markerLatLang}}</p>
    <p>{{ this.$store.state.finishedQuestions }}</p>
    <p>{{ markerLatLang.lat }}, {{ markerLatLang.lng}}</p>
    <p>{{calculatedDistance}}</p>
    <p>Index {{questionIndex}}</p>
-->
    <l-map class="fixed" :zoom="zoom" :min-zoom="minZoom" :max-zoom="maxZoom" :center="markerLatLang">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :icon="marker.icon" v-model:lat-lng="markerLatLang" :draggable="marker.draggable" :visible="marker.visible" ></l-marker>
      <l-geo-json :geojson="geojson"></l-geo-json>
    </l-map>
    <q-page-sticky position="bottom-left" :offset="[18, 56]">
      <q-btn round color="primary" icon="arrow_back" :to="{ name: 'QuizStart'}" />
    </q-page-sticky>
    <helpOptions />
    <!--
    @save-Answer="savePlayerAnswer()"
      @calc-Dist="calculateDistance()"
      @load-prevQuest="previousQuestion()"
    -->
    <quizFooter
      @save-Answer="saveProcess()"
      @load-nextQuest="nextQuestion()"
    />
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
      questionIndex: 1,
      calculatedDistance: null,
      prevQuestion:{},
      finishedQuestionsLength: 0
    };
  },
  created() {
    this.firstQuestion()
  },

  methods: {
    /*
    previousQuestion(){
      console.log('vorherige Frage')
      this.prevQuestion = this.$store.state.finishedQuestions[this.finishedQuestionsLength-1]
      console.log('vor Frage: ', this.prevQuestion)
      this.finishedQuestionsLength--
      this.actualQuestion = this.prevQuestion
      this.$store.commit('storeActualQuestion', {
        ...this.actualQuestion
      })
      console.log('Store Frage', this.$store.state.actualQuestion)
    },
     */
    /*
    previousQuestion(){
      this.finishedQuestionsLength--
      if(this.$store.state.finishedQuestions.length > 0) {
        this.prevQuestion = this.$store.state.finishedQuestions[this.finishedQuestionsLength]
        console.log(this.prevQuestion)
        this.actualQuestion = this.prevQuestion
        this.$store.commit('storeActualQuestion', {
          ...this.actualQuestion
        })

      }else {
        this.prevQuestion = this.$store.state.finishedQuestions.at(0)
        console.log(this.prevQuestion)
      }
    },
 */

    saveProcess() {
      this.calculateDistance()
        if(this.calculatedDistance !== null){
          this.savePlayerAnswer()
        }else{
          console.log('Etwas ist bei der Brechnung schief gelaufen!')
        }
      },

    savePlayerAnswer(){
      this.$store.commit('saveUserAnswer', {
        savedLocation: {
          lat: this.markerLatLang.lat,
          long: this.markerLatLang.lng
        },
        distance: this.calculatedDistance,
       ...this.actualQuestion
      })
    },

    calculateDistance(
      lat1 = this.actualQuestion.location.latitude,
      lon1 = this.actualQuestion.location.longitude,
      lat2 = this.markerLatLang.lat,
      lon2 = this.markerLatLang.lng,
      unit = 'K'
    ){
      if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
      }
      else {
        let radlat1 = Math.PI * lat1/180;
        let radlat2 = Math.PI * lat2/180;
        let theta = lon1-lon2;
        let radtheta = Math.PI * theta/180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        //if (unit=="N") { dist = dist * 0.8684 }
        console.log('Distanz', dist)
        //return dist;
        this.calculatedDistance = dist
      }
    },

    firstQuestion(){
      const questionID = this.$store.state.selectedQuiz.randomQuestions[0]
      this.actualQuestionID = questionID
      this.getQuestion()
    },

    nextQuestion(){
      if(this.questionIndex < this.$store.state.selectedQuiz.randomQuestions.length){
        const questionID = this.$store.state.selectedQuiz.randomQuestions[this.questionIndex]
        this.actualQuestionID = questionID
        this.questionIndex++
        console.log(this.questionIndex)
        this.getQuestion()
        this.finishedQuestionsLength++
        console.log('Länge', this.finishedQuestionsLength)
      }
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
    },
  }
}
</script>

<style scoped>

</style>
