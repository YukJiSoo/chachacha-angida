<template>
  <v-container class="pa-1">
    <v-layout row wrap>


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
      <!-- 내역 -->
      <v-container fluid grid-list-sm class="pa-0">
        <v-layout row wrap>
          <v-flex v-for="userMenu in userMenuList" :key="i" xs3>
            <img :src="`${userMenu.url}`" class="image" alt="lorem" width="100%" height="100%">
          </v-flex>
        </v-layout>
      </v-container>
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
      ],
      userMenuList: {
        userMenu1:{
          name: 'point-list',
          url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/usermenu%2Fpoint.PNG?alt=media&token=c7d405ae-8998-46fd-8bb1-9a098d02de0a',
        },
        userMenu2:{
          name: 'coupon-list',
          url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/usermenu%2Fcoupon.PNG?alt=media&token=36e4eeac-f052-4123-bb64-bd89c7036d73',
        },
        userMenu3:{
          name: 'order-list',
          url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/usermenu%2Forder.PNG?alt=media&token=579ed091-4142-43a3-8ce3-6d15cc58ad9d',
        },
        userMenu4:{
          name: 'review-list',
          url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/usermenu%2Freview.PNG?alt=media&token=9d7c78ab-1a29-4e66-a89a-92516c7b1a2f',
        },
      }
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
