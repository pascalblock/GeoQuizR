<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          GeoQuizR
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      side="right"
      v-model="rightDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <q-list>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />

        <q-select
          v-model="locale"
          :options="localeOptions"
          label="Quasar Language"
          dense
          borderless
          emit-value
          map-options
          options-dense
          style="min-width: 150px"
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

  components: {
    EssentialLink
  },

  data(){
    return {
      linksList: [
        {
          title: this.$t('sideBar.faq'),
          icon: "quiz",
          link: "Faq",
        },
        {
          title: this.$t('sideBar.contact'),
          icon: "contact_mail",
          link: "Contact",
        },
        {
          title: this.$t('sideBar.imprint'),
          icon: "policy",
          link: "Imprint",
        },
        {
          title: this.$t('sideBar.config'),
          icon: "settings",
          link: "https://forum.quasar.dev",
        }
      ]
    }
  },

  setup () {
    const rightDrawerOpen = ref(false)
    const { locale } = useI18n({ useScope: 'global' })

    return {
      rightDrawerOpen,
      toggleLeftDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },

      locale,
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'de-DE', label: 'Deutsch' }
      ]
    }
  }
})
</script>
