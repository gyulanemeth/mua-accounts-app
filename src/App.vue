<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
import ErrorMessage from './components/ErrorMessage.vue'
import { useCurrentUserAndAccountStore } from './stores/index.js'
import NetworkChecker from './dialogs/NetworkChecker.vue'
const store = useCurrentUserAndAccountStore()
const route = useRoute()

onMounted(() => {
  document.title = window.config.appTitle
})

</script>

<template>

    <v-app>
        <div v-if="store.loggedIn && route.meta.requiresAuth ">
            <NavBar  />
            <SideBar />
        </div>

        <v-main>
            <ErrorMessage/>
            <NetworkChecker />
            <Suspense>
                <router-view/>
            </Suspense>
        </v-main>
</v-app>

</template>
