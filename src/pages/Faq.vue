<template>
  <q-page>
    <div class="text-left">
      <pageHeader :headline-title="$t('FAQ.headline') "/>
      <div class="q-pa-lg q-ma-none">
        <p>{{ $t('FAQ.intro')}}</p>
      </div>
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
    <pageFooter :footer-button-label="$t('Buttons.home.label')" :target-destination="$t('/')"/>
  </q-page>
</template>

<script>
import pageHeader from "components/PageHeader";
import pageFooter from "components/PageFooter";

export default {
  name: "Faq",

  components: {
    pageHeader,
    pageFooter,
  }
}
</script>
