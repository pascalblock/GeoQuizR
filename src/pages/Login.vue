<template>
  <div class="mefo-login-page">
    <div class="mefo-login-logo">
      <h1>Logo</h1>
    </div>

    <div class="mefo-login-form col-lg-8">
      <div class="mefo-login-input">
        <q-input v-model="email" :label="$t('loginPage.email')" />

        <q-input v-model="password" :type="isPwd ? 'password' : 'text'" :label="$t('loginPage.password')">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>

      <div class="mefo-login-button">
        <q-btn  @click="login" color="primary" text-color="white" :label="$t('loginPage.loginButton')" :to="{ name: 'home'}" no-caps/>
      </div>

      <div class="mefo-login-lang-change">
        <q-select
          v-model="locale"
          :options="localeOptions"
          dense
          borderless
          emit-value
          map-options
          options-dense
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: "login",

  setup(){
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
      localeOptions: [
        { value: 'en-US', label: 'EN' },
        { value: 'de-DE', label: 'DE' }
      ],

      email: ref(''),
      password: ref(''),
      isPwd: ref(true)
    }
  },
  methods: {
    login(){
      console.log('E-Mail', this.email + ',' + 'Password', this.password)
    }
  }
}
</script>

<style lang="scss">
.mefo-login-page{
  height: 100vh;
}

.mefo-login-logo{
  display: flex;
  justify-content: center;
}

.mefo-login-form{
  margin: 1rem;
}

.mefo-login-input{
  margin-bottom: .75rem;
}

.mefo-login-button{
  display: flex;
  justify-content: center;
  margin-bottom: .75rem;
}
.mefo-login-lang-change{
  display: flex;
  justify-content: center;
  margin-bottom: .75rem;
}

</style>
