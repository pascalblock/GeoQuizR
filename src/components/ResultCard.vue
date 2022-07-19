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
            <p>{{ information }}</p>

            <p>{{ $t('resultPage.card.informationSource') }} {{ informationSource }} </p>
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
    },
    information: {
      type: String,
      required: true
    },
    informationSource: {
      type: String,
      required: true
    }
  },

  setup () {
    return {
      expanded: ref(false),
    }
  },
  computed: {
    /**
     * Defines how well the player guessed (Distance in km)
     * @returns {{farAway: boolean, furtherAway: boolean, close: boolean}}
     */

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
