<script setup>

import stores from '../stores/index.js'

const store = stores().currentUserAndAccountStore()

const menuItems = [
  { title: 'Me', path: '/me' },
  { title: 'Account Settings', path: '/account' },
  { title: 'Account Users', path: '/users' }
]

</script>

<template>
  <v-app-bar  v-if="store.user">
    <v-app-bar-title >MUA Account's UI</v-app-bar-title>
    <v-avatar color="secondary">
     Pic
   </v-avatar>
      <v-menu

       location="bottom " origin="end top" >
            <template v-slot:activator="{ props }">
              <v-btn
                icon="mdi-dots-vertical"
                v-bind="props"
              />
            </template>
            <v-list>
              <v-list-item
              v-for="item in menuItems"
              :key="item.title"
              :to="item.path"
              :value="item.title"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
              <v-list-item @click="store.logout()">
                <v-list-item-title> Logout </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
  </v-app-bar>

  <v-app-bar v-else >
      <v-app-bar-title >MUA Account's UI</v-app-bar-title>
    <v-btn

      variant="text"
      to="/"
    >
      Login
    </v-btn>
  </v-app-bar>
</template>

<!--
<v-list color="transparent">
  <v-list-item prepend-icon="mdi-account-group" title="Admins List" ></v-list-item>
  <v-list-item prepend-icon="mdi-file-document" title="Accounts List"></v-list-item>
</v-list>
-->
