<template>
  <div class="mefo-page-footer row q-pl-lg q-pr-lg">
    <q-btn class="eras-font-demi relative-position" size="md" :label="footerButtonLabel" color="primary" :to="targetDestination" unelevated no-caps/>
  </div>
</template>

<script>
export default {
  props: ['footerButtonLabel', 'targetDestination'],
  name: "PageFooter"
}
</script>

<style lang="scss" scoped>

.mefo-page-footer{
  border-top: solid 2px $primary;
  height: 3rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: center;
  align-items: center;

  .btn {
    width: 180px
  }
}

</style>
