<template>
  <div class="q-pl-lg q-pr-lg q-ma-none mefo-page-header">
    <h1 class="headlineSection">{{headlineTitle}}</h1>
  </div>
</template>

<script>
export default {
  props: ['headlineTitle'],
  name: "PageHeader"
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
}

</style>
