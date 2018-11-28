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
    <v-layout v-for="i in 5" column wrap>
      <!-- 예약일 -->
      <v-flex xs12 sm12>
        <div class="body-2 grey--text text--darken-1 px-3 pt-3">
          <span>9/2 (일)</span>
          <span v-if="i===1">
            <span class="mx-4 green--text text--darken-2">수락대기</span>
            <v-btn v-if="progress" outline color="orange" class="angida-gradiation px-0 mx-2" dark small :to="reservationPage">
              예약취소
            </v-btn>
            <v-btn v-if="!progress" outline color="red" class="angida-gradiation px-0 mx-2" dark small>
              취소불가
            </v-btn>
            <span class="mx-4 red--text text--darken-2">{{times[0].time}} : {{times[1].time}}</span>
          </span>
          <span v-if="i===2">
            <span class="mx-4 red--text text--darken-2">예약취소</span>
          </span>
          <span v-if="i===3">
            <span class="mx-4 grey--text text--darken-2">방문완료</span>
          </span>
          <span v-if="i===4">
            <span class="mx-4 blue--text text--darken-2">예약완료</span>
            <v-btn outline color="orange" class="angida-gradiation px-0 mx-2" dark small :to="reservationPage">
              예약취소
            </v-btn>
          </span>
        </div>
      </v-flex>
      <!-- 가게이름 -->
      <v-flex xs12 sm12>
        <div v-if="!progress" class="red--text body-2 px-4 pt-2">
          예약취소를 원하시면 식당에 직접 연락해주세요.
        </div>
        <div class="title font-weight-bold px-3 pt-3">
          <span>강서 동국대점</span>
        </div>
      </v-flex>
      <!-- 주문내역-간단히 -->
      <v-flex xs12 sm12>
        <div class="body-2 px-4 pt-2">
          <span>간짜장 볶음밥 외 2개 20,000원</span>
        </div>
      </v-flex>
      <!-- 안아주기 버튼 -->
      <v-flex xs12 sm12 align-self-center class="mt-2">
        <div>
          <v-btn outline color="orange" class="angida-gradiation px-5" dark large :to="reservationPage">
            <div class="headline font-weight-bold px-5">
              다시 안아주기
            </div>
          </v-btn>
        </div>
      </v-flex>
      <!-- 리뷰작성하러가기 -->
      <v-flex xs12 sm12 align-self-center>
        <div v-if="i===1" class="pt-2 pb-1 caption light-blue--text text--darken-2 font-weight-bold">
          <router-link :to="writingReviewPage" class="text--decoration-none">
            <span>리뷰 작성하러 가기</span>
          </router-link>
        </div>
        <div v-else class="caption grey--text text--darken-2 font-weight-bold">
          <span>리뷰작성기간이 지났습니다</span>
        </div>
      </v-flex>
      <v-divider class="mt-2"></v-divider>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'default',
  data () {
    return {
      mypagePath:'/mypage',
      reservationPage:'/reservation',
      writingReviewPage:'/writingReview',
      startTime: "July 9, 2019 13:54:00",
      endTime: "Nov 29, 2018 01:06:30",
      times: [
        { id: 0, time: 1 },
        { id: 1, time: 1 },
      ],
      progress: 100,
      // isActive: false,
      timeinterval: undefined
    }
  },
  created: function() {
    this.updateTimer();
    this.timeinterval = setInterval(this.updateTimer, 1000);
  },
  methods: {
    updateTimer: function() {
      if (
        this.times[1].time > 0 ||
        this.times[0].time > 0
      ) {
        this.getTimeRemaining();
      } else {
        clearTimeout(this.timeinterval);
        // this.times[3].time = this.times[2].time = this.times[1].time = this.times[0].time = 0;
         this.progress = 0;

      }
    },
    getTimeRemaining: function() {
      let t = Date.parse(new Date(this.endTime)) - Date.parse(new Date());
      if(t >= 0){
        this.times[1].time = Math.floor(t / 1000 % 60); //seconds
        this.times[0].time = Math.floor(t / 1000 / 60 % 60); //minutes
        if(this.times[0].time<10)
          this.times[0].time = '0' + this.times[0].time
        if(this.times[1].time<10)
          this.times[1].time = '0' + this.times[1].time
      }else {
        this.times[1].time = this.times[0].time  = 0;
        this.progress = 0;
      }
    }
  }
}
</script>

<style scoped>
</style>
