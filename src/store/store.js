export default {
  state: {
    selectedQuiz: {},
    actualQuestion: {},
    finishedQuestions: [],
    stepCounter: 1,
    maps: [
      'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.png',
      'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
      'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',
    ],
    actualMap: 0,
    initialMarkerLatLangBool: true,
  },
  mutations: {
    changeInitialMarkerBool(state){
      state.initialMarkerLatLangBool = false
    },
    resetInitialMarkerLatLangBool(state) {
      state.initialMarkerLatLangBool = true
    },

    storeNewActualMap(state, payload){
      state.actualMap = payload.actualMapID
    },

    increaseStepCounter(state){
      state.stepCounter++
    },

    saveUserAnswer(state, answer){
      state.finishedQuestions = [...state.finishedQuestions, {...answer}]
    },

    storeSelectedQuiz (state, selectedQuiz) {
      state.selectedQuiz = {...selectedQuiz}
    },

    howManyQuestions(state, selectedQuiz) {
      state.selectedQuiz = {...selectedQuiz, ...state.selectedQuiz}
    },

    clearSelectedQuiz (state) {
      state.selectedQuiz = {}
    },

    storeActualQuestion(state, actualQuestion) {
      state.actualQuestion = {...actualQuestion}
    },

    clearActualQuestion (state) {
      state.actualQuestion = {}
    },

    clearFinishedQuestions(state) {
      state.finishedQuestions = []
    },
    clearStepCount(state) {
      state.stepCounter = 1
    },
  }
}
