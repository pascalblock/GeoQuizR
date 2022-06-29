<template>
  <q-page>
    <div class="text-left">
      <pageHeader :headline-title="$t('Settings.headline') "/>
      <div class="q-pa-lg q-ma-none">
        <p>{{ $t('Settings.intro')}}</p>
      </div>
    </div>
    <pageFooter :footer-button-label="$t('Buttons.save.label')" />
  </q-page>
</template>

<script>
import pageHeader from "components/PageHeader";
import pageFooter from "components/PageFooter";

export default {
  name: "Settings",

  components: {
    pageHeader,
    pageFooter,
  }
}
</script>

<style scoped>

</style>
