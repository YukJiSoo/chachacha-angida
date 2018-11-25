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
          <v-btn icon>
            <v-icon @click="goToMain">keyboard_arrow_left</v-icon>
          </v-btn>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <span @click="goToMain" class="font-weight-bold subheading">Mypage</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>

      <!-- 내역 -->
      <v-container fluid grid-list-sm class="pa-0">
        <v-layout row wrap>
          <v-flex v-for="userMenu in userMenuList" :key="i" xs3>
            <img :src="`${userMenu.url}`" class="image" alt="lorem" width="100%" height="100%" @click="goToPage(userMenu.page)">
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
            
            <v-flex 
              v-for="anotherMenu in anotherMenuList" :key="i"
              xs12 sm12 class="py-3 grey--text text--lighten-5 orange lighten-3" 
              @click="goToPage(anotherMenu.page)">
              <div class="subheading font-weight-bold">
                <span>{{anotherMenu.name}}</span>
              </div>
            </v-flex>
            
          </v-layout>
        </v-container>
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
      noticePage:'http://localhost:8080/notice',
      qnaPage:'http://localhost:8080/Q&A',
      settingPage:'http://localhost:8080/setting',
      myInfoPage:'http://localhost:8080/myInfo',
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
          page:'http://localhost:8080/point',
        },
        userMenu2:{
          name: 'coupon-list',
          url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/usermenu%2Fcoupon.PNG?alt=media&token=36e4eeac-f052-4123-bb64-bd89c7036d73',
          page:'http://localhost:8080/coupon',
        },
        userMenu3:{
          name: 'order-list',
          url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/usermenu%2Forder.PNG?alt=media&token=579ed091-4142-43a3-8ce3-6d15cc58ad9d',
          page:'http://localhost:8080/reservationHistory',
        },
        userMenu4:{
          name: 'review-list',
          url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/usermenu%2Freview.PNG?alt=media&token=9d7c78ab-1a29-4e66-a89a-92516c7b1a2f',
          page:'http://localhost:8080/reviewManage',
        },
      },
      anotherMenuList: {
        anotherMenu1:{
          name: '공지사항',
          url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/usermenu%2Fpoint.PNG?alt=media&token=c7d405ae-8998-46fd-8bb1-9a098d02de0a',
          page:'http://localhost:8080/notice',
        },
        anotherMenu2:{
          name: '내정보 변경',
          url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/usermenu%2Fcoupon.PNG?alt=media&token=36e4eeac-f052-4123-bb64-bd89c7036d73',
          page:'http://localhost:8080/myInfoChange',
        },
        anotherMenu3:{
          name: 'QnA',
          url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/usermenu%2Forder.PNG?alt=media&token=579ed091-4142-43a3-8ce3-6d15cc58ad9d',
          page:'http://localhost:8080/Q&A',
        },
        anotherMenu4:{
          name: '환경설정',
          url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/usermenu%2Freview.PNG?alt=media&token=9d7c78ab-1a29-4e66-a89a-92516c7b1a2f',
          page:'http://localhost:8080/setting',
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
