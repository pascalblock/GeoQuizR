<template>
  <q-page>
    <div class="text-left">
      <pageHeader :headline-title="$t('Contact.headline') "/>
      <div class="mefo-page-text">
        <p>{{ $t('Contact.intro')}}</p>
      </div>
    </div>
    <pageFooter :footer-button-label="$t('Buttons.send.label')" :target-destination="$t('/')" />
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
