<template>
  <v-container grid-list-md text-xs-center align-center>
    <!-- 한칸 -->
    <v-layout align-center justify-end row fill-height>
      <v-flex xs10 sm10>
        <p class="text-xs-left" style= "font-size:15pt; font-weight:bold">이벤트 혜택 알림</p>
      </v-flex>
      <v-flex xs2 sm2 class="pt-0">
        <v-switch v-model="switch1" class="pt-0"></v-switch>
      </v-flex>
      <v-divider></v-divider>
    </v-layout>
    <v-layout align-center justify-end row fill-height class="mb-2">
      <v-flex xs12 sm12>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
    <!-- 끝 -->
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
