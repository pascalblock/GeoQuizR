<template>
  <q-page>
    <div class="text-left">
      <pageHeader :headline-title="$t('Imprint.headline') "/>
      <div class="mefo-page-text">
        <p class="gt-sm multiColums-2">{{ $t('Imprint.text')}}</p>
        <p class="lt-md">{{ $t('Imprint.text')}}</p>
      </div>
    </div>
    <pageFooter :footer-button-label="$t('Buttons.contact.label')" :target-destination="$t('contact')"/>
  </q-page>
</template>

<script>

import pageHeader from "components/PageHeader";
import pageFooter from "components/PageFooter";

export default {
  name: "Imprint",

  components: {
    pageHeader,
    pageFooter,
  }
}
</script>
