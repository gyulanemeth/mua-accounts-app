<script setup>

</script>

<template>
        <v-navigation-drawer
        permanent
      >
        <v-list >
          <v-list-item prepend-icon="mdi-file-document" title="Me" to="/me"></v-list-item>
          <v-list-item prepend-icon="mdi-file-document" title="Account Settings" to="/account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group" title="Account Users" to="/users" ></v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>