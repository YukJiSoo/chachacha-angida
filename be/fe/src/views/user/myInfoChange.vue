<template>
  <v-container class="pa-1">
    <v-layout row wrap>
      <!-- 상단 -->
      <v-flex xs12 sm12>
        <v-toolbar
          app
          dark
          height="40"
          class="angida-gradiation">
          <v-btn icon @click="$goBack()">
            <v-icon >keyboard_arrow_left</v-icon>
          </v-btn>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <span class="font-weight-bold subheading">내정보 변경</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>

      <v-flex xs12 sm6 md3 class="px-3">
        <v-text-field
          label="주소"
          color="orange"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md3 class="px-3">
        <v-text-field
          label="핸드폰번호"
          color="orange"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md3 class="px-3">
        <v-text-field
          label="카드회사"
          color="orange"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md3 class="px-3">
        <v-text-field
          label="카드번호"
          color="orange"
        ></v-text-field>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'default',
  data () {
    return {
      mypagePath: '/mypage',
      
    }
  },
  computed: {
    
  },
  methods: {
  }
}
</script>

<style>
</style>
