<template>
  <q-card class="mefo-result-card row" :class="resultRating">
    <div class="col">
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
    </div>
    <div v-show="!expanded" class="gt-sm col">
      <l-map class="" style="border-radius: 0; height: 100%" :zoom="zoom" :min-zoom="minZoom" :max-zoom="maxZoom" :center="seekedLatLang">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker v-model:lat-lng="seekedLatLang" :visible="marker.visible">
          <l-icon
            :icon-size="[30, 30]"
            :icon-anchor="[15, 30]"
            icon-url="icons/marker-green.png"
          />
        </l-marker>
        <l-marker v-model:lat-lng="markedLatLang" :visible="marker.visible">
          <l-icon
            :icon-size="[30, 30]"
            :icon-anchor="[15, 30]"
            icon-url="icons/marker-purple.png"
          />
        </l-marker>
        <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>
      </l-map>
    </div>
  </q-card>
</template>

<script>
import { ref } from 'vue'
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LPolyline, LIcon } from "@vue-leaflet/vue-leaflet";


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
    },
    savedLocation: {
      type: Object,
      required: false
    },
    location: {
      type: Object,
      required: false
    }
  },

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
    LIcon,
  },

  data(){
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',      subdomains: 'abcd',
      minZoom: 4,
      maxZoom: 10,
      zoom: 4,
      geojson: null,
      // seeked location
      seekedLatLang: [],
      // marked location
      markedLatLang: [],
      polyline: {
        latlngs: [[], []],
        color: 'purple',
      },
      marker:
        {
          visible: true,
          draggable: true,
        }
    };
  },

  created() {
    this.setMarkedLocation()
    this.setSeekedLocation()
    if (this.seekedLatLang.length > 0 && this.markedLatLang.length > 0) {
      this.setPolyLine()
    } else{
      this.$q.notify({
        message: this.$t('resultPage.noPolyLine'),
        color: 'secondary',
        position: 'top'
      })
    }

  },

  methods: {
    setMarkedLocation(){
      this.markedLatLang = [
        this.savedLocation.lat,
        this.savedLocation.long
      ];
    },
    setSeekedLocation(){
      this.seekedLatLang = [
        this.location.latitude,
        this.location.longitude
      ]
    },
    setPolyLine(){
      this.polyline.latlngs = [
        this.seekedLatLang,
        this.markedLatLang
      ]
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
.map{
  width: 50%;
  height: 100%;
}

.close{
  border-radius: 0;
  border-left: 15px solid;
  border-left-color: $answerGood;
}

.furtherAway{
  border-radius: 0;
  border-left: 15px solid;
  border-left-color: $answerOK;
}

.farAway{
  border-radius: 0;
  border-left: 15px solid;
  border-left-color: $answerWrong;
}

</style>
