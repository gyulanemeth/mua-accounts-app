<script setup>
import { ref } from 'vue'

import useSystemMessagesStore from '../stores/systemMessages.js'

const systemMessages = useSystemMessagesStore()
const snackbar = ref(true)

</script>

<template>

<v-snackbar v-for="(error, n) in systemMessages.items" :timeout="-1" :key="n" :color="error.type" rounded="pill" location="top" v-model="snackbar" :style="`top: ${n*60}px`">
    {{ error.message && error.name ? `${error.message} / ${error.name}` : (error.message || error.name ) }}
</v-snackbar>

</template>
