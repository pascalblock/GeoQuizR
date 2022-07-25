<template>
  <q-card class="mefo-quiz-card">
    <q-img :ratio="16/9" style="max-height: 500px" src="../assets/quizImages/Maps.jpg" />
    <q-card-section>
      <q-btn
        fab
        color="primary"
        :icon="icon"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%);"
      />

      <div class="row no-wrap items-center">
        <h6 class="col ellipsis mefo-quiz-name">
          {{ name }}
        </h6>
        <div class="col-auto text-grey text-caption q-pt-md q-mr-sm row no-wrap items-center">
          <q-icon name="groups" class="q-mr-xs q-mb-md" />
          <p>{{ player }}</p>
        </div>
      </div>

      <q-rating color="accent" :v-model="stars" :max="5" size="32px"  model-value=""/>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <p class="text-subtitle1">
        {{ description }}
      </p>
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
      required: true,
      default: 5
    }
  },
  methods: {
    selectQuizHandler() {
      this.$emit('select-quiz')
    }
  }
}
</script>
