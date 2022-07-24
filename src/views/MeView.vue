<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import MeDetails from '../components/MeDetails.vue'
import UpdatePassword from '../components/UpdatePassword.vue'
import EmailAndNameForm from '../components/EmailAndNameForm.vue'
import stores from '../stores/index.js'
import useSystemMessagesStore from '../stores/systemMessages.js'

const store = stores().currentUserAndAccountStore()
const route = useRoute()
const router = useRouter()

const formData = ref()

async function loadData () {
  if (route.name === 'patchUserName') {
    formData.value = { inputType: 'text', inputText: 'New Name', text: 'Update Name' }
  } else {
    if (store.user === null) {
      useSystemMessagesStore().addError({ status: 404, name: 'NOT_FOUND', message: 'User data not found please login' })
      return router.push('/')
    }
    formData.value = await store.user
  }
}

async function eventHandler (data) {
  let res
  if (formData.value.text === 'Update Name') {
    res = await store.patchUserName(data)
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
  <EmailAndNameForm v-if="route.name === 'patchUserName'" :formData="formData" @buttonEvent="eventHandler" />
  <UpdatePassword v-else-if="route.name === 'patchPassword'"  />
  <template v-else>
    <MeDetails v-if="formData" :data="formData" />
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
