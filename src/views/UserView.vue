<script setup>
import { ref } from 'vue'
import UsersList from '../components/UsersList.vue'
import { useCurrentUserAndAccountStore, useUsersStore } from '../stores/index.js'
import alerts from '../alerts/alert.js'

const currentUserAndAccountStore = await useCurrentUserAndAccountStore()
const alert = alerts()

const data = ref()
const roles = ref()
const accountName = ref()
const currentUser = ref()

const store = useUsersStore()

accountName.value = currentUserAndAccountStore.account.name
currentUser.value = currentUserAndAccountStore.user
data.value = store.items
if (currentUserAndAccountStore.user.role === 'admin') {
  const config = await store.config()
  roles.value = config.role
}

async function handleUpdateRole (params) {
  const res = await store.patchRole(params.id, {
    role: params.role
  })
  if (!res.message) {
    alert.message('User role updated successfully')
    await store.load()
    data.value = store.items
  }
}

async function handleDeleteUser (params) {
  const res = await store.deleteOne(params)
  if (!res.message) {
    alert.message('Account Deleted successfully')
    await store.load()
    data.value = store.items
    if (currentUserAndAccountStore.user._id === params.id) {
      await currentUserAndAccountStore.logout()
    }
  }
}

async function handleInviteMember (params, statusCallBack) {
  const res = await currentUserAndAccountStore.sendInvitation(params.email)
  statusCallBack(!res.message)
  if (!res.message) {
    await store.load()
    data.value = store.items
  }
}

async function handleReInviteMember (params) {
  const res = await currentUserAndAccountStore.reSendInvitation(params.email)
  if (!res.message) {
    alert.message('Invitation sent successfully')
  }
}

async function loadMore (params) {
  if (store.items.length !== store.count) {
    store.skip = params * 10
    await store.loadMore()
    data.value = store.items
  }
}

async function searchBarHandler (filter, statusCallBack) {
  if (filter === '') {
    store.filter = {}
  } else {
    store.filter = {
      $or: [{
        name: {
          $regex: filter,
          $options: 'i'
        }
      },
      {
        email: {
          $regex: filter,
          $options: 'i'
        }
      }]
    }
  }
  await store.load()
  data.value = store.items
  statusCallBack()
}

</script>

<template>

<UsersList :items="data" :currentAccName="accountName" :currentUser="currentUser" :roles="roles" @loadMore='loadMore' @inviteEventHandler="handleInviteMember" @reInviteEventHandler="handleReInviteMember"  @updateRoleEventHandler="handleUpdateRole" @deleteEventHandler='handleDeleteUser' @searchEvent="searchBarHandler" />

</template>
