<template>
  <q-page>
    <quizHeader/>
    <div class="relative-position text-center">
      <l-map class="fixed" :zoom="zoom" :min-zoom="minZoom" :max-zoom="maxZoom" :center="markerLatLang">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker :icon="marker.icon" v-model:lat-lng="markerLatLang" :draggable="marker.draggable"
                  :visible="marker.visible">
          <l-icon
            :icon-size="[50, 50]"
            :icon-anchor="[25, 50]"
            icon-url="icons/marker-purple.png"
          />
        </l-marker>
        <l-geo-json :geojson="geojson"></l-geo-json>
      </l-map>
    </div>
    <q-page-sticky position="bottom-left" :offset="[18, 70]">
      <q-btn round color="primary" icon="arrow_back" :to="{ name: 'QuizStart'}"/>
    </q-page-sticky>
    <q-page-sticky position="bottom-right" :offset="[18, 70]">
      <q-btn round color="primary" @click="titleSound($t('Language.key'))" icon="record_voice_over"/>
    </q-page-sticky>
    <helpOptions
      @layer-Switch="getRandomMap()"
    />
    <quizFooter
      @save-Answer="saveProcess()"
      @load-nextQuest="nextQuestion()"
      @inc-StepCounter="increaseStepCount()"
      v-bind="initialMarkerLatLangBool"
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
import { LMap, LGeoJson, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import {ScreenReader} from "@capacitor/screen-reader";

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
    LIcon,
  },

  data(){
    return {
      actualQuestionID: '',
      actualQuestion: {},
      url: '',
      ext: 'png',
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',      subdomains: 'abcd',
      minZoom: 4,
      maxZoom: 10,
      zoom: 8,
      geojson: null,
      // Random marker on start placed in germany or close to germany
      markerLatLang: [Math.random()*3+50, Math.random()*5+6],
      initialMarkerLatLang: [],
      initialMarkerLatLangBool: true,
      marker:
        {
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
    this.getInitialMap()
    console.log(this.markerLatLang)

    if(this.$store.state.stepCounter === 1){
      this.showInitialInfo()
      this.initialMarkerLatLang = this.markerLatLang
    }
  },

  watch: {
    markerLatLang(newMarker, oldMarker){
      if(newMarker !== this.initialMarkerLatLang){
        this.$store.commit('changeInitialMarkerBool')
        this.initialMarkerLatLang = []
      }
    }
  },

  methods: {
    /**
     * The
     */

    showInitialInfo(){
      this.$q.notify({
        message: this.$t('quizFrame.informationNotify.message'),
        color: 'secondary',
        position: 'top',
        progress: true,
        actions: [
          { iconRight: 'close', color: 'white' }
        ]
      })
    },

    /**
     * The first map that is loaded from the Vuex Store initially.
     */
    getInitialMap(){
      const maps = this.$store.state.maps
      this.url = maps[0]
    },

    /**
     * Loads a random map from the vuex store that is not the same as before
     */
    getRandomMap(){
      this.$q.loading.show(
        {
          spinnerColor: 'primary',
          backgroundColor: 'secondary'
        }
      )
      const max = this.$store.state.maps.length
      const randomMapIndex = Math.floor(Math.random() * max)
      const randomMap = this.$store.state.maps[randomMapIndex]

      const actualMapIndex = this.$store.state.actualMap
      const actualMap = this.$store.state.maps[actualMapIndex]

      if(actualMap !== randomMap) {
        this.url = randomMap

        this.$store.commit('storeNewActualMap', {
          actualMapID: randomMapIndex
        })
        this.$q.loading.hide()

      } else{
        this.getRandomMap()
        this.$q.loading.hide()
      }
    },
    async titleSound(languageKey){
      await ScreenReader.speak({value: this.$store.state.actualQuestion.name, language: languageKey});
    },

    /**
     * Increases the step counter to show the player his progress in the quiz.
     */
    increaseStepCount(){
      if(this.$store.state.stepCounter < this.$store.state.selectedQuiz.randomQuestions.length) {
        this.$store.commit('increaseStepCounter')
      }
    },

    /**
     * First calls the distance calculation and then, if successful, the save function
     */

    saveProcess() {
      this.calculateDistance()
        if(this.calculatedDistance !== null){
          this.savePlayerAnswer()
          this.$store.commit('resetInitialMarkerLatLangBool')
          console.log('4')
        }else{
          console.log('Etwas ist bei der Brechnung schief gelaufen!')
        }
      },

    /**
     * Saves all given answers of the player in the vuex store
     */

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

    /**
     * Calculates the distance between the entered coordinates and those from the DB in kilometers
     * @param lat1 latitude of the current question
     * @param lon1 longitude of the current question
     * @param lat2 entered latitude of the player
     * @param lon2 entered longitude of the player
     * @param unit return unit in Km
     * @returns {number}
     */

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

    /**
     * Loads initial first questionID and calls the DB request
     */
    firstQuestion(){
      const questionID = this.$store.state.selectedQuiz.randomQuestions[0]
      this.actualQuestionID = questionID
      this.getQuestion()
    },

    /**
     * Loads all the following questionIDs until the last one. Then it redirects to the Finished page
     */

    nextQuestion(){
      if(this.questionIndex < this.$store.state.selectedQuiz.randomQuestions.length){
        const questionID = this.$store.state.selectedQuiz.randomQuestions[this.questionIndex]
        this.actualQuestionID = questionID
        this.questionIndex++
        this.getQuestion()
        this.finishedQuestionsLength++

      } else {
        this.$router.push({ name: 'Finished' })
      }
    },

    /**
     * Loads questions from the database using the corresponding ID
     * @returns {Promise<void>}
     */

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
            name: doc.data().name[lanG],
            information: doc.data().information[lanG]
          }
        }
      })
      console.log('Frage', this.actualQuestion)
      this.$store.commit('storeActualQuestion', {
        ...this.actualQuestion
      })
      if(this.$store.state.stepCounter > 1){
        this.$store.commit('changeInitialMarkerBool')
      }
    },

    async created () {
      const response = await fetch('https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson');
      this.geojson = await response.json();
    },
  }
}
</script>
