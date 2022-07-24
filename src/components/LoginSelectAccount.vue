<script setup >
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import stores from '../stores/index.js'

const Store = stores().currentUserAndAccountStore()
const route = useRoute()
const router = useRouter()

const props = defineProps({
  data: Object,
  token: String
})

const password = ref('')
const account = ref({ name: 'Please select account' })

async function submit () {
  const res = await Store.login(props.token, password.value, account.value._id)
  if (res === 'success') {
    router.push('/me')
  }
}

function redirect(){
  router.push(`/forgot-password?accountId=${account.value._id}`)
}

</script>

<template>
  <v-container>
    <v-row class="text-center" justify="center">
        <v-col cols="6">
        <form>
          <v-col>
            <h1>Sign In</h1>
          </v-col>
            <v-col>
              <h3>{{account.name}}</h3>
              <v-list v-for="item in props.data" :key="item._id">
                <v-list-item  :title="item.name" @click="account=item"></v-list-item>
              </v-list>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="password"
                required></v-text-field>
            </v-col>
            <v-row>
            <v-col>
                <v-list-item class="d-flex flex-row mb-1 ml-4" title=" Forget password? Reset Password" @click="redirect"></v-list-item>
              <v-btn color="primary" @click="submit" >Sign In</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row >
  </v-container>
</template>
