<template>
  <q-card class="mefo-result-card" :class="resultRating">
    <q-card-section>
      <p class="text-h6 mefo-quiz-name">
        {{ name }}
      </p>
      <p><b>{{ $t('resultPage.card.result1') }} {{Math.round(distance)}} {{ $t('resultPage.card.result2') }}</b></p>
    </q-card-section>

    <q-card-actions>
      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2">
            {{ lorem }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "ResultCard",
  props: {
    name: {
      type: String,
      required: true
    },
    distance: {
      type: Number,
      required: true
    }
  },

  setup () {
    return {
      expanded: ref(false),
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  computed: {
    resultRating(){
      return {
        close: this.distance < 30,
        furtherAway: this.distance >= 30,
        farAway: this.distance >= 50,
      }
    }
  }
}
</script>

<style lang="scss">
.mefo-result-card{
  margin: .75rem;

  .q-card__section{
    padding-bottom: 0;
  }

  .q-icon{
    color: $dark;
  }
}

.close{
  background-color: green;
}

.furtherAway{
  background-color: orange;
}

.farAway{
  background-color: red;
}

</style>
