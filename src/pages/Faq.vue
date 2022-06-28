<template>
  <q-page>
    <div class="text-left q-pa-lg">
      <h2>{{ $t('FAQ.headline') }}</h2>
      <p>{{ $t('FAQ.intro')}}</p>
    </div>

    <div>
      <q-list>
        <q-expansion-item
          expand-separator
          icon="public"
          :label="$t('FAQ.q1.title')"
        >
          <q-card>
            <q-card-section>
              {{ $t('FAQ.q1.text') }}
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="share"
          :label="$t('FAQ.q2.title')"
        >
          <q-card>
            <q-card-section>
              {{ $t('FAQ.q2.text') }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Faq"
}
</script>

<style scoped>

</style>
