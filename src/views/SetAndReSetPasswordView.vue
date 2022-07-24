<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import SetAndReSetPassword from '../components/SetAndReSetPassword.vue'
import stores from '../stores/index.js'

const store = stores().currentUserAndAccountStore()
const route = useRoute()
const router = useRouter()

const formData = ref()

async function loadData () {
  if (route.name === 'forgot-password-reset') {
    formData.value = { text: 'Reset Password' }
  } else if (route.name === 'accept-invitation') {
    formData.value = { text: 'Set Password' }
  }
}

async function eventHandler (data) {
  let res
  if (formData.value.text === 'Reset Password') {
    res = await store.resetForgotPassword(data.token, data.newPassword, data.newPasswordAgain)
  } else if (formData.value.text === 'Set Password') {
    res = await store.acceptInvitation(data.token, data.newPassword, data.newPasswordAgain, data.name)
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
  <SetAndReSetPassword :formData="formData" @buttonEvent="eventHandler" />
</template>
