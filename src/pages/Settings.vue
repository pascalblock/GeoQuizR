<template>
  <q-page>
    <div class="text-left">
      <pageHeader :headline-title="$t('Settings.headline') "/>
      <div class="mefo-page-text">
        <p>{{ $t('Settings.intro')}}</p>
      </div>
    </div>
    <pageFooter :footer-button-label="$t('Buttons.save.label')" :target-destination="$t('/')"/>
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
