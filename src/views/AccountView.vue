<script setup>
import { ref } from 'vue'
import AccountDetails from '../components/AccountDetails.vue'
import { useCurrentUserAndAccountStore } from '../stores/index.js'
import alerts from '../alerts/alert.js'

const alert = alerts()
const store = useCurrentUserAndAccountStore()
const data = ref()

data.value = store.account

async function handleUpdateAccountName (params) {
  const res = await store.patchAccountName(params)
  if (!res.message) {
    await alert.message('Name updated successfully')
  }
}

async function handleUpdateUrlFriendlyName (params) {
  const res = await store.patchUrlFriendlyName(params)
  if (!res.message) {
    await alert.message('urlFriendlyName updated successfully')
  }
}

async function handleUploadLogo (params, statusCallBack) {
  const res = await store.uploadLogo(params)
  statusCallBack(res.logo)
  data.value = store.account
  if (res) {
    await alert.message('Updated Successfully')
  }
}

async function handleDeleteLogo (statusCallBack) {
  const res = await store.deleteLogo()
  statusCallBack(!res.message)
  data.value = store.account
  if (!res.message) {
    await alert.message('Updated Successfully')
  }
}

</script>

<template>

<AccountDetails v-if="data" @uploadLogoHandler="handleUploadLogo" @deleteLogoHandler="handleDeleteLogo" @updateNameHandler='handleUpdateAccountName' @updateUrlFriendlyNameHandler='handleUpdateUrlFriendlyName' :role="store.user && store.user.role === 'admin'" :logo="data.logo" :name="data.name" :urlFriendlyName="data.urlFriendlyName" />

</template>
