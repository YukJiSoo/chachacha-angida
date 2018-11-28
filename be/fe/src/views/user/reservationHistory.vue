<template>
  <v-container class="pa-0">
    <v-layout column wrap>
      <!-- 상단 -->
      <v-flex xs12 sm12>
        <v-toolbar
          app
          flat
          height="40"
          class="angida-gradiation white--text">
          <v-btn dark icon :to="mypagePath">
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <span class="font-weight-bold subheading">예약내역</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>
    </v-layout>

    <!-- 주문내역 리스트 -->
    <v-layout v-for="i in items" column wrap>
      <!-- 예약일 -->
      <v-flex xs12 sm12>
        <div class="body-2 grey--text text--darken-1 px-3 pt-3">
          <span>{{i.reservation_time}}</span>
          <br>
          <span>{{i.arrival_time}}</span>
          <span>
            <span class="mx-4 green--text text--darken-2">{{i.status}}</span>
            <v-btn v-if="i.status==='수락대기'" outline color="orange" class="angida-gradiation px-0 mx-2" dark small :to="reservationPage">
              예약취소
            </v-btn>
          </span>
        </div>
      </v-flex>
      <!-- 가게이름 -->
      <v-flex xs12 sm12>
        <div class="title font-weight-bold px-3 pt-3">
          <span>{{i.store_name}}</span>
        </div>
      </v-flex>
      <!-- 주문내역-간단히 -->
      <v-flex xs12 sm12>
        <div class="body-2 px-4 pt-2">
          <span>{{i.menu_list}}</span>
          &nbsp;
          <span>{{i.total_price}}</span>
        </div>
      </v-flex>
      <!-- 안아주기 버튼 -->
      <v-flex xs12 sm12 align-self-center class="mt-2">
        <div>
          <v-btn v-if="i.status==='방문완료'" outline color="orange" class="angida-gradiation px-5" dark large :to="reservationPage">
            <div class="headline font-weight-bold px-5">
              다시 안아주기
            </div>
          </v-btn>
        </div>
      </v-flex>
      <!-- 리뷰작성하러가기 -->
      <v-flex xs12 sm12 align-self-center>
        <div v-if="i.status==='방문완료'"class="pt-2 pb-1 caption light-blue--text text--darken-2 font-weight-bold">
          <router-link :to="writingReviewPage" class="text--decoration-none">
            <span>리뷰 작성하러 가기</span>
          </router-link>
        </div>
      </v-flex>
      <v-divider class="mt-2"></v-divider>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'default',
  data () {
    return {
      mypagePath:'/mypage',
      reservationPage:'/reservation',
      writingReviewPage:'/writingReview',
      items:[]
    }
  },
  methods: {
  },
  mounted() {
    axios.get('http://localhost:3000/api/reservation')
    .then((r) => {
      this.items = r.data.reserv_list
      console.log(r)
    })
    .catch((e) => {
      console.error(e.message)
    })
  }
}
</script>

<style scoped>
</style>
