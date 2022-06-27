<template>
  <div>
    <q-input v-model="user.name"> Name</q-input>

    <q-input v-model="user.email"> Mail</q-input>
    <q-input v-model="user.password"> Password</q-input>
    <q-input v-model="user.password_confirm"> Password Confirm</q-input>

    <q-btn @click="register">Sign Up</q-btn>
  </div>
</template>

<script>
export default {
  name: "register",

  data(){
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirm: ''
      }
    }
  },
  methods: {
    register() {

    }
  }
}
</script>

<style scoped>

</style>
