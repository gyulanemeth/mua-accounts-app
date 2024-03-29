<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import MeDetails from '../components/MeDetails.vue'
import { useCurrentUserAndAccountStore, useUsersStore } from '../stores/index.js'
import useSystemMessagesStore from '../stores/systemMessages.js'

let store = useCurrentUserAndAccountStore()
const route = useRoute()
const router = useRouter()
const { tm } = useI18n()

const data = ref()

if (route.name === 'verify-email') {
  const res = await store.patchEmailConfirm(route.query.token)
  if (!res.message) {
    await store.readOne()
    router.push(`/${store.account.urlFriendlyName}/me`)
    useSystemMessagesStore().addSuccess({ message: tm('changeEmail.verifyMessage') })
  }
} else if (!store.user || !store.user.name) {
  await store.readOneUser()
  if (store.user === null) {
    useSystemMessagesStore().addError({
      status: 404,
      name: 'NOT_FOUND',
      message: 'User data not found please login'
    })
    router.push('/')
  }
}
data.value = store.user

async function handleUpdateUserName (params) {
  const res = await store.patchUserName(params)
  if (!res.message) {
    useSystemMessagesStore().addSuccess({ message: tm('meView.updateNameAlert') })
  }
}

async function handleUpdatePassword (params, statusCallBack) {
  const res = await store.patchPassword(params.oldPassword, params.newPassword, params.confirmNewPassword)
  statusCallBack(!res.message)
}
async function handleUpdateEmail (params, statusCallBack) {
  const res = await store.patchEmail(params.newEmail, params.confirmNewEmail)
  statusCallBack(!res.message)
}
async function handleDeleteEvent (params) {
  store = useUsersStore()
  const res = await store.deleteOne(params)
  if (!res.message) {
    useSystemMessagesStore().addSuccess({ message: tm('meView.accountDeleteAlert') })
    store = useCurrentUserAndAccountStore()
    await store.logout()
  }
}

async function uploadProfilePicture (params, statusCallBack) {
  const res = await store.uploadUserProfilePicture(params)
  data.value = store.user
  statusCallBack(res.profilePicture)
}

async function deleteProfilePicture (statusCallBack) {
  const res = await store.deleteUserProfilePicture()
  data.value = store.user
  statusCallBack(res)
}

</script>

<template>

<MeDetails v-if="data" :data="data" @deleteProfilePictureHandler="deleteProfilePicture" @uploadProfilePictureHandler="uploadProfilePicture" @updateNameHandler='handleUpdateUserName' @updatePasswordHandler='handleUpdatePassword' @updateEmailHandler='handleUpdateEmail' @deleteMyAccountHandler='handleDeleteEvent' />

</template>
