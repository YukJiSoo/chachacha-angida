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
                <span class="font-weight-bold subheading">Mypage</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>

      <!-- 포인트, 쿠폰, 주문내역, 리뷰관리
      <v-container fluid grid-list-sm class="pa-0">
        <v-layout row wrap>
          <v-flex v-for="userMenu in userMenuList" xs3>
            <router-link :to="userMenu.to">
              <img :src="`${userMenu.url}`" class="image" alt="lorem" width="100%" height="100%">
            </router-link>
          </v-flex>
        </v-layout>
      </v-container> -->

      <!-- 포인트, 쿠폰, 주문내역, 리뷰관리 -->
      <v-container text-xs-center fluid grid-list-sm class="pa-0 mt-2">
        <v-layout align-center justify-center row wrap>
          <v-flex xs2.5 class="white py-2 mx-1">
            <v-icon large >local_parking</v-icon>
            <div class="medium">포인트</div>
          </v-flex>
          <v-flex xs2.5 class="white py-2 mx-1">
            <v-icon large>copyright</v-icon>
            <div class="medium">쿠폰</div>
          </v-flex>
          <v-flex xs2.5 class="white py-2 mx-1">
            <v-icon large>credit_card</v-icon>
            <div class="medium">주문내역</div>
          </v-flex>
          <v-flex xs2.5 class="white py-2 mx-1">
            <v-icon large>more_horiz</v-icon>
            <div class="medium">리뷰관리</div>
          </v-flex>
        </v-layout>
      </v-container>

      <!-- 내정보 -->
      <v-flex xs12 sm12>
        <v-container grid-list-md align-center class="py-4">
          <v-layout row wrap>
            <v-flex xs2 sm12 class="mr-2">
              <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                >
              </v-avatar>
            </v-flex>
            <v-layout column>
              <v-flex xs12 sm6>
                <div class="xlarge">
                  <span>{{myId}}</span>
                </div>
              </v-flex>
              <v-flex xs12 sm6 class="pt-0 pl-2">
                <div class="medium orange--text text--darken-4 font-weight-bold">
                  <span>{{point}}p</span>
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
              v-for="anotherMenu in anotherMenuList"
              xs12 sm12 class="py-3 grey--text text--lighten-5 orange lighten-3" >
              <router-link :to="anotherMenu.to" class="text--decoration-none">
                <div class="xlarge white--text">
                  <span>{{anotherMenu.name}}</span>
                </div>
              </router-link>
            </v-flex>
            
          </v-layout>
        </v-container>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'default',
  data () {
    return {
      myId: localStorage.getItem('id'),
      userCode: localStorage.getItem('code'),
      point: 0,

      mainPath: '/home',
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
          to:{
            path:'/point',
          }
        },
        userMenu2:{
          name: 'coupon-list',
          url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/usermenu%2Fcoupon.PNG?alt=media&token=36e4eeac-f052-4123-bb64-bd89c7036d73',
          to:{
            path:'/coupon',
          }
        },
        userMenu3:{
          name: 'order-list',
          url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/usermenu%2Forder.PNG?alt=media&token=579ed091-4142-43a3-8ce3-6d15cc58ad9d',
          to:{
            path:'/reservationHistory',
          }
        },
        userMenu4:{
          name: 'review-list',
          url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/usermenu%2Freview.PNG?alt=media&token=9d7c78ab-1a29-4e66-a89a-92516c7b1a2f',
          to:{
            path:'/reviewManage',
          }
        },
      },
      anotherMenuList: {
        anotherMenu1:{
          name: '공지사항',
          url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/usermenu%2Fpoint.PNG?alt=media&token=c7d405ae-8998-46fd-8bb1-9a098d02de0a',
          to:{
            path:'/notice',
          }
        },
        anotherMenu2:{
          name: '내정보 변경',
          url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/usermenu%2Fcoupon.PNG?alt=media&token=36e4eeac-f052-4123-bb64-bd89c7036d73',
          to:{
            path:'/myInfoChange',
          }
        },
        anotherMenu3:{
          name: 'QnA',
          url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/usermenu%2Forder.PNG?alt=media&token=579ed091-4142-43a3-8ce3-6d15cc58ad9d',
          to:{
            path:'/Q&A',
          }
        },
        anotherMenu4:{
          name: '환경설정',
          url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/usermenu%2Freview.PNG?alt=media&token=9d7c78ab-1a29-4e66-a89a-92516c7b1a2f',
          to:{
            path:'/setting',
          }
        },
      }
    }
  },
  mounted() {
    this.getPoint()
  },
  methods: {
    getPoint(){
      axios.get(`http://localhost:3000/api/point/${this.userCode}`)
      .then((r) => {
        console.log(r.data)
        this.point = r.data.point
      })
      .catch((e) => {
      this.pop(e.message)
      })  
      
    }
  }
}
</script>

<style>
</style>
