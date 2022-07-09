export default {
  state: {
    selectedQuiz: {},
    actualQuestion: {},
    finishedQuestions: [],
    stepCounter: 1
  },
  mutations: {
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
    }
  }
}
