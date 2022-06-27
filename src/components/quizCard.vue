<template>
  <q-card class="mefo-quiz-card">
    <q-img :ratio="16/9" src="../assets/quizImages/Maps.jpg" />
    <q-card-section>
      <q-btn
        fab
        color="primary"
        :icon="icon"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%);"
      />

      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis mefo-quiz-name">
          {{ name }}
        </div>
        <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
          <q-icon name="groups" />
          {{ player }}
        </div>
      </div>

      <q-rating :v-model="stars" :max="5" size="32px" />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">
        {{ description }}
      </div>
    </q-card-section>

    <q-card-actions class="mefo-quiz-select">
      <q-btn color="primary" :label="$t('quizCard.select')" no-caps :to="{name: 'StartQuiz'}"/>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "quizCard",

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
  }
}
</script>

<style lang="scss">
.mefo-quiz-card{
  margin: .75rem;
}

.mefo-quiz-select{
  display: flex;
  justify-content: center;

  .q-btn {
    width: 60%;
  }
}

.mefo-quiz-name{
  text-transform: uppercase;
}
</style>
