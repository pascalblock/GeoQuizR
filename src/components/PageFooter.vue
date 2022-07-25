<template>
  <div class="mefo-page-footer row q-pl-lg q-pr-lg">
    <q-btn class="primaryButton relative-position" :label="footerButtonLabel" :to="targetDestination" unelevated no-caps/>
  </div>
</template>

<script>
export default {
  props: ['footerButtonLabel', 'targetDestination'],
  name: "PageFooter"
}
</script>
