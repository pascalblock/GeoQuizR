<template>
  <q-page>
    <div class="text-left">
      <pageHeader :headline-title="$t('Imprint.headline') "/>
      <div class="q-pa-lg q-ma-none">
        <p class="gt-sm multiColums-2">{{ $t('Imprint.text')}}</p>
        <p class="lt-md">{{ $t('Imprint.text')}}</p>
      </div>
    </div>
    <pageFooter :footer-button-label="$t('Buttons.contact.label')" />
  </q-page>
</template>

<script>

import pageHeader from "components/PageHeader";
import pageFooter from "components/PageFooter";

export default {
  name: "Contact",

  components: {
    pageHeader,
    pageFooter,
  }
}
</script>

<style scoped>

</style>
