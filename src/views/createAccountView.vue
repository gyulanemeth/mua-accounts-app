<script setup>
import { useRouter } from 'vue-router'

import CreateAccount from '../components/CreateAccount.vue'
import stores from '../stores/index.js'

const store = stores().currentUserAndAccountStore()

const router = useRouter()

async function eventHandler (data) {
  const res = await store.createAccount(data)

  if (res === 'success') {
    router.push('/')
  }
}

</script>

<template>
  <CreateAccount @buttonEvent="eventHandler" />
</template>
