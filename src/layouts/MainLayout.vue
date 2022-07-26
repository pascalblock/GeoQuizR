<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/" @click="resetQuizSelection" class="titleRouter">GeoQuizR</router-link>
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      side="right"
      v-model="rightDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1 eras-font"
    >
      <q-list class="mefo-menu-list">
        <q-item class="mefo-menu-item" clickable tag="a" :to="{ name: 'Faq' }">
          <q-item-section avatar>
            <q-icon name="quiz" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ this.$t('sideBar.faq') }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="mefo-menu-item" clickable tag="a" :to="{ name: 'Contact' }">
          <q-item-section avatar>
            <q-icon color="$accent" name="contact_mail" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ this.$t('sideBar.contact') }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="mefo-menu-item" clickable tag="a" :to="{ name: 'Imprint' }">
          <q-item-section avatar>
            <q-icon name="policy" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ this.$t('sideBar.imprint') }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="mefo-menu-item" clickable tag="a" :to="{ name: 'Settings' }">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ this.$t('sideBar.config') }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-select
          v-model="locale"
          :options="localeOptions"
          :label="$t('Language.title')"
          dense
          borderless
          emit-value
          map-options
          options-dense
          class="mefo-language-selection"
          style="width: 100%; font-size: 15px"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const rightDrawerOpen = ref(false)
    const { locale } = useI18n({ useScope: 'global' })

    return {
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },

      locale,
      localeOptions: [
        { value: 'en-US', label: 'English'},
        { value: 'de-DE', label: 'Deutsch' }
      ]
    }
  },

  watch: {
    locale(newLang, oldLang){
      if(newLang !== oldLang){
      }
    }
  },

  methods:{
    /**
     * Resets all data stored in the vuex store.
     */

    resetQuizSelection(){
      this.$store.commit('clearSelectedQuiz')
      this.$store.commit('clearActualQuestion')
      this.$store.commit('clearFinishedQuestions')
      this.$store.commit('clearStepCount')
      this.$store.commit('resetInitialMarkerLatLangBool')
    }
  }
})
</script>
