<template>
  <v-app class="main">
    <v-main>
      <router-view />
    </v-main>

    <Sidebar/>
    
  </v-app>
</template>

<script setup>
  //
</script>

<style lang="sass">
.main
  border-radius: 20px
  overflow: hidden
</style>
