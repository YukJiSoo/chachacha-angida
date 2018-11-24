<template>
  <v-container class="pa-1">
    <v-layout row wrap>
      <!-- 내역 -->
      <v-container fluid grid-list-sm class="pa-0">
        <v-layout row wrap>
          <v-flex v-for="i in 4" :key="i" xs3>
            <img :src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`" class="image" alt="lorem" width="100%" height="100%">
          </v-flex>
        </v-layout>
      </v-container>

      <!-- 내정보 -->
      <v-flex xs12 sm12>
        <v-container grid-list-md align-center @click="goToMain" class="py-4">
          <v-layout row wrap>
            <v-flex xs2 sm12 class="mr-2">
              <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                >
              </v-avatar>
            </v-flex>
            <v-layout column>
              <v-flex xs12 sm6>
                <div class="title ">
                  <span>wltn3231</span>
                </div>
              </v-flex>
              <v-flex xs12 sm6 class="pt-0 pl-2">
                <div class="body-1 orange--text text--darken-4 font-weight-bold">
                  <span>300p</span>
                </div>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-container>
      </v-flex>

      <!-- 그 외 버튼 -->
      <v-flex xs12 sm12>
        <v-container grid-list-md text-xs-center align-center class="pa-0">
          <v-layout column wrap>
            
            <v-flex xs12 sm12 class="py-3 grey--text text--lighten-5 orange lighten-3">
              <div class="subheading font-weight-bold">
                <span>공지사항</span>
              </div>
            </v-flex>

            
            <v-flex xs12 sm12 class="py-3 grey--text text--lighten-5 orange lighten-3">
              <div class="subheading font-weight-bold">
                <span>내정보 변경</span>
              </div>
            </v-flex>

            
            <v-flex xs12 sm12 class="py-3 grey--text text--lighten-5 orange lighten-3">
              <div class="subheading font-weight-bold">
                <span>QnA</span>
              </div>
            </v-flex>

            
            <v-flex xs12 sm12 class="py-3 grey--text text--lighten-5 orange lighten-3">
              <div class="subheading font-weight-bold">
                <span>환경 설정</span>
              </div>
            </v-flex>
            
          </v-layout>
        </v-container>
      </v-flex>

      
      <!-- toolbar -->
      <v-flex xs12 sm12>
        <v-toolbar
          app
          dark
          class="angida-gradiation">
          <v-btn icon>
            <v-icon @click="goToPage(mypage)">account_circle</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <span @click="goToMain" class="font-weight-bold caption">음식이 나에게</span>
              </v-flex>
              <v-flex xs8 sm12 class="pl-5">
                <span @click="goToMain" class="font-weight-bold title">안기다</span>
                <span @click="goToMain" class="font-weight-bold caption">린다</span>
              </v-flex>
            </v-layout>
          </v-container>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'default',
  data () {
    return {
      mypage:'http://localhost:8080/mypage',
      message: [
        {
          avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          name: 'John Leider',
          title: 'Welcome to Vuetify.js!',
          excerpt: 'Thank you for joining our community...'
        }
      ]
    }
  },
  methods: {
    goToMain () {
      window.location.href = 'http://localhost:8080/home';
    },
    goToPage (page) {
      window.location.href = page;
    }
  }
}
</script>

<style>
</style>