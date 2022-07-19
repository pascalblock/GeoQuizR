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
              {{lorem}}
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card-actions>
    </div>
    <div class="gt-sm col">
      <l-map class="" style="border-radius: 0" :zoom="zoom" :min-zoom="minZoom" :max-zoom="maxZoom" :center="markerLatLang">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker :icon="marker.icon" v-model:lat-lng="markerLatLang" :visible="marker.visible" >
        </l-marker>
        <l-marker :icon="marker.icon" v-model:lat-lng="markerLatLang2" :visible="marker.visible" >
        </l-marker>
        <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>
      </l-map>
    </div>
  </q-card>
</template>

<script>
import { ref } from 'vue'
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LPolyline } from "@vue-leaflet/vue-leaflet";

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
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
  },

  data(){
    return {
    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',      subdomains: 'abcd',
      minZoom: 4,
      maxZoom: 10,
      zoom: 4,
      geojson: null,
      // Random marker on start placed in germany or close to germany
      markerLatLang: [48.35693, 10.98461],
      markerLatLang2: [50.11552, 8.68417],
      polyline: {
        latlngs: [[48.35693, 10.98461], [50.11552, 8.68417]],
        color: 'purple',
      },
      marker:
        {
          visible: true,
          draggable: true,
        }
    };
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
.map{
  width: 50%;
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
