<template>
  <q-card class="mefo-quiz-card">
    <q-img :ratio="16/9" style="max-height: 500px" :src="image" />
    <q-card-section style="padding: 12px; height: 150px">
      <q-btn
        fab
        color="primary"
        :icon="icon"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%);"
        @click="selectQuizHandler"
        :to="{name: 'QuizStart'}"
      />
      <div class="row no-wrap items-center mefo-quiz-name-section">
        <h2 class="mefo-quiz-name q-pr-lg">
          {{ name }}
        </h2>
      </div>
      <p class="mefo-quiz-description">
        {{ description }}
      </p>
      <div class="row justify-between">
        <q-rating color="accent" :v-model="stars" :max="5" size="32px"  model-value=""/>
        <div class="text-grey row no-wrap items-center">
          <q-icon name="groups" class="mefo-quiz-card-visitors" />
          <p class="mefo-quiz-card-count">{{ player }}</p>
        </div>
      </div>
    </q-card-section>
    <q-card-actions class="mefo-quiz-select">
      <q-btn class="primaryButton" style="width: 180px;" @click="selectQuizHandler" :label="$t('quizCard.select')" no-caps :to="{name: 'QuizStart'}"/>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "QuizCard",

  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    player: {
      type: Number,
      required: true,
      default: 0
    },
    icon: {
      type: String,
      required: true
    },
    stars: {
      type: Number,
      default: 5
    },
    image: {
      type: String,
      required: true
    }
  },
  methods: {
    selectQuizHandler() {
      this.$emit('select-quiz')
    }
  }
}
</script>
