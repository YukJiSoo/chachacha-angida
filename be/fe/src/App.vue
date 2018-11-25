<template>
  <v-app>
    <!-- content -->
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      title: '안기다'
    }
  },
  methods : {
  }
}
</script>
<style>
</style>
