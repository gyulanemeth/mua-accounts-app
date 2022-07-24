<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import jwtDecode from 'jwt-decode'

import EmailAndNameForm from '../components/EmailAndNameForm.vue'
import LoginSelectAccount from '../components/LoginSelectAccount.vue'
import stores from '../stores/index.js'
import alerts from '../alerts/alert.js'

const store = stores().currentUserAndAccountStore()
const route = useRoute()
const router = useRouter()
const alert = alerts()


const data = ref()
const formData = ref()

async function loadData () {

  if (route.name === 'loginSelect' && route.query.token) {
    data.value = jwtDecode(route.query.token)
  } else {
    if (route.name === 'finalize-registration' && route.query.token){
      let res = await store.finalizeRegistration(route.query.token)
      if (res === 'success') {
        await alert.message(`your registration has been finalized`)
      }
    }
    formData.value = { inputType: 'email', inputText: 'Login Email', text: 'Login Email' }
  }
}

async function eventHandler (data) {
  let res
  if (formData.value.text === 'Login Email') {
    res = await store.loginGetAccounts(data)
    if (res.success) {
      await alert.message(`message Send to your email`)
    }
  }
  if (res === 'success') {
    router.push('/me')
  }
}

watchEffect(async () => {
  loadData()
})
</script>

<template>
  <EmailAndNameForm v-if="route.name === 'login'" :formData="formData" @buttonEvent="eventHandler" />
  <LoginSelectAccount v-if="data" :token="route.query.token" :data="data.accounts" />
</template>
