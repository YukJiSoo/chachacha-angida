<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout>
      <v-flex xs12 sm12>

        <v-list two-line>
          <p class="text-xs-left" style= "font-size:15pt; font-weight:bold">이벤트 혜택 알림</p>
            <v-switch v-model="switch1"></v-switch>
          <v-divider></v-divider>
        </v-list>
        <v-list two-line>
          <p class="text-xs-left" style= "font-size:15pt; font-weight:bold">리뷰 알림</p>
            <v-switch v-model="switch2"></v-switch>
          <v-divider></v-divider>
        </v-list>
        <v-list two-line>
          <p class="text-xs-left" style= "font-size:15pt; font-weight:bold">댓글 알림</p>
            <v-switch v-model="switch3"></v-switch>
          <v-divider></v-divider>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'default',
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style scoped>
</style>
