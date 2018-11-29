<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout>
      <v-flex xs12 sm12>
        <h1>
          {{restaurantName}}
        </h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'default',
  data () {
    return {
      restaurantName:'강남역 토끼정'
    }
  },
  methods: {}
}
</script>

<style scoped>
</style>
