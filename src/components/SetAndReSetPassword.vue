<script setup >
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  formData: Object
})
const route = useRoute()

const data = ref({})

</script>

<template>
  <v-container>
    <v-row class="text-center" justify="center">
        <v-col cols="6">
        <form>
          <v-col>
            <h1>{{props.formData.text}}</h1>
          </v-col>
          <v-col>
            <v-text-field v-if="props.formData.text === 'Set Password' "
              name="name"
              label="Name"
              id="name"
              type="text"
              v-model="data.name"
              required />

            <v-text-field
              name="newPassword"
              label="New Password"
              id="newPassword"
              type="password"
              v-model="data.newPassword"
              required />

            <v-text-field
              name="newPasswordAgain"
              label="New Password Again"
              id="newPasswordAgain"
              type="password"
              v-model="data.newPasswordAgain"
              required />
            </v-col>
            <v-col>
              <v-btn color="primary" @click="$emit('buttonEvent',{token:route.query.token,...data})">{{props.formData.text}}</v-btn>
            </v-col>

        </form>
      </v-col>
    </v-row >
  </v-container>
</template>
