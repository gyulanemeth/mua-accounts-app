<script setup>
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
import ErrorMessage from './components/ErrorMessage.vue'
import stores from './stores/index.js'

const store = stores().currentUserAndAccountStore()

</script>
<template>
  <v-app>
    <NavBar v-if="store.loggedIn" />
    <SideBar v-if="store.loggedIn" />
    <v-main >
      <ErrorMessage/>
      <router-view/>
    </v-main>
  </v-app>
</template>
