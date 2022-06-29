export default {
  state: {
    selectedQuiz: {},

    actualQuestion: {},

    finishedQuestions: []
  },
  mutations: {
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
  }
}
