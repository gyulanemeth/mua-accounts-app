<script setup>

import { ref } from 'vue'

const props = defineProps({
  items: Array,
  roles: Array
})

const filter = ref('')
const radioGroup = ref(false)
const newName = ref('')
const editemood = ref(false)


function edite (id) {
  newName.value = ''
  radioGroup.value = ''
  editemood.value = editemood.value === id ? false : id
}


</script>

<template>

<v-container>
  <v-layout class="d-flex flex-wrap">

  <v-text-field class="my-2 ml-4"
  variant="outlined"
  label="Search"
  prepend-inner-icon="mdi-magnify"
  v-model.lazy="filter"
    color="primary"
  @change="$emit('searchEvent',filter)"

  ></v-text-field>

  <v-btn class="py-7 my-2 ml-4"
  variant="outlined"
  color="primary"
  to="/invitation"
  >
  Invite User
</v-btn>
</v-layout>
    <v-layout class="d-flex flex-wrap">
      <v-card class="mx-2 my-5 pa-2 align-self-start " min-width="275"  v-for="item in props.items" :key="item._id" >
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="150px"
          cover
        ></v-img>
        <v-card-title>
        <input
          :value="item.data.name"
          :label="item.data.name"
          disabled
        />
        <v-card-subtitle>
          - {{item.status}}
        </v-card-subtitle >
      </v-card-title>

              <v-card-actions v-if='editemood === item._id'>
                <v-radio-group inline v-model="radioGroup">
                  <v-radio
                  v-for="data in props.roles"
                  :key="data+item._id"
                  :disabled = "item.data.role === data"
                  :label="data"
                  :value="data"
                  ></v-radio>
                </v-radio-group>

                      <v-divider />
                    <v-btn
                    color="primary"
                    variant="outlined"
                    icon="mdi-check"
                    size="small"
                    @click.stop="$emit('buttonEvent',{id: item._id, name:newName ,role: radioGroup, operation: 'updateRole'}); edite(item._id)" />

                    <v-btn
                      class="ml-2"
                      color="red"
                      variant="outlined"
                      icon="mdi-window-close"
                      size="small" @click="edite(item._id)" />
                  </v-card-actions>
                    <v-card-actions v-else>
                      <v-btn
                        color="primary"
                        variant="text"
                        @click.stop="edite(item._id)"
                      >
                        Update
                      </v-btn>
                      <v-btn
                        color="red-lighten-2"
                        variant="text"
                        @click="$emit('buttonEvent',{id:item._id,operation: 'delete'})"
                      >
                        Delete
                      </v-btn>
                    </v-card-actions>

      </v-card>
</v-layout>
</v-container>
</template>
