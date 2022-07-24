<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import AccountDetails from '../components/AccountDetails.vue'
import useSystemMessagesStore from '../stores/systemMessages.js'
import EmailAndNameForm from '../components/EmailAndNameForm.vue'
import stores from '../stores/index.js'

const store = stores().currentUserAndAccountStore()
const route = useRoute()
const router = useRouter()

const formData = ref()

async function loadData () {
  if (route.name === 'patchAccountName') {
    formData.value = { inputType: 'text', inputText: 'New Name', text: 'Update Name' }
  } else if (route.name === 'patchUrlFriendlyName') {
    formData.value = { inputType: 'text', inputText: 'New Url Friendly Name', text: 'Update Url Friendly Name' }
  } else {
    if (store.account === null) {
      useSystemMessagesStore().addError({ status: 404, name: 'NOT_FOUND', message: 'Account data not found please login' })
      return router.push('/')
    }
    formData.value = await store.account
  }
}

async function eventHandler (data) {
  let res
  if (formData.value.text === 'Update Name') {
    res = await store.patchAccountName(data)
  } else if (formData.value.text === 'Update Url Friendly Name') {
    res = await store.patchUrlFriendlyName(data)
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
  <EmailAndNameForm v-if="route.name === 'patchAccountName'|| route.name === 'patchUrlFriendlyName' " :formData="formData" @buttonEvent="eventHandler" />
  <template v-else>
    <AccountDetails v-if="formData" :data="formData" />

  <v-row v-else class="text-center" justify="center">
    <v-progress-circular
    indeterminate
    :size="70"
    :width="7"
    color="red"
  ></v-progress-circular>
</v-row>
  </template>
</template>
