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
          <v-btn dark icon @click="$goBack()">
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
        <div class="body-2 grey--text text--darken-1 px-3 pt-2">
          <span class="mx-4 blue--text text--darken-2">주문시간</span>
          <span>{{i.reservation_time}}</span>
          <span class="mx-4 blue--text text--darken-2">도착시간</span>
          <span>{{i.arrival_time}}</span>
        </div>
      </v-flex>
      <v-flex xs12 sm12>
        <div class="body-2 grey--text text--darken-1 px-3 pt-3">
          <span>
            <span class="mx-4 green--text text--darken-2">{{i.status}}</span>
            <v-btn v-if="i.progress" outline color="orange" class="angida-gradiation px-0 mx-2" dark small :to="reservationPage">
              예약취소
            </v-btn>
            <v-btn v-if="!i.progress && i.status !=='취소완료'" outline color="red" class="angida-gradiation px-0 mx-2" dark small>
              취소불가
            </v-btn>
            <!-- 취소할 수 있는 남은 시간 -->
            <span v-if="i.progress" class="mx-4 red--text text--darken-2">{{i.times[0].time}} : {{i.times[1].time}}</span>
          </span>
        </div>
      </v-flex>
      <!-- 가게이름 -->
      <v-flex xs12 sm12>
        <div v-if="cancelMsg(i)" class="red--text body-2 px-4 pt-2">
          예약취소를 원하시면 식당에 직접 연락해주세요.
        </div>
        <div class="xlarge font-weight-bold px-3 pt-3">
          <span>{{i.store_name}}</span>
        </div>
      </v-flex>
      <!-- 주문내역-간단히 -->
      <v-flex xs12 sm12>
        <div class="medium px-4 pt-2">
          <span>{{i.menu_list}}</span>
          &nbsp;
          <span>{{i.total_price}}</span>
        </div>
      </v-flex>
      <!-- 안아주기 버튼 -->
      <v-flex xs12 sm12 align-self-center class="mt-2">
        <div>
          <v-btn v-if="i.status==='방문완료'" outline color="orange" class="angida-gradiation px-5" dark large :to="reservationPage">
            <div class="xlarge font-weight-bold px-5">
              다시 안아주기
            </div>
          </v-btn>
        </div>
      </v-flex>
      <!-- 리뷰작성하러가기 -->
      <v-flex xs12 sm12 align-self-center>
        <div v-if="i.status==='방문완료'"class="pt-1 pb-1 light-blue--text text--darken-2 font-weight-bold">
          <router-link :to="writingReviewPage" class="text--decoration-none small">
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
// import reservItem from '../../plugins/reservItem'
export default {
  name: 'default',
  data () {
    return {
      userCode : localStorage.getItem('code'),
      mypagePath:'/mypage',
      reservationPage:'/reservation',
      writingReviewPage:'/writingReview',
      // startTime: "July 9, 2019 13:54:00",
      endTimeTest: "Nov 30, 2018 01:06:30",
      // times: [
      //   { id: 0, time: 1 },
      //   { id: 1, time: 1 },
      // ],
      // progress: 100,
      // isActive: false,
      // timeinterval: undefined,
      items:[]
    }
  },
  mounted() {
    this.getReservationHistory()
  },
  computed:{ },
  created: function() {
    this.updateTimerTest();
    this.timeinterval = setInterval(this.updateTimerTest, 1000);
  },
  methods: {
    updateTimerTest: function() {
      for(var i=0; i<this.items.length; i++){
        // console.log("updateTimerTest")
        // console.log(this.items[i])
        if (
          this.items[i].times[1].time > 0 ||
          this.items[i].times[0].time > 0
        ) {
          this.getTimeRemainingTest(this.items[i]);
        } else {
          clearTimeout(this.items[i].timeinterval);
          // this.times[3].time = this.times[2].time = this.times[1].time = this.times[0].time = 0;
          this.items[i].progress = 0;
        }
      }

    },
    getTimeRemainingTest: function(cur) {
      // console.log("cur")
      // console.log(cur)
      let t = Date.parse(new Date(cur.endTime)) - Date.parse(new Date());
      if(t >= 0){
        cur.times[1].time = Math.floor(t / 1000 % 60); //seconds
        cur.times[0].time = Math.floor(t / 1000 / 60 % 60); //minutes
        if(cur.times[0].time<10)
          cur.times[0].time = '0' + cur.times[0].time
        if(cur.times[1].time<10)
          cur.times[1].time = '0' + cur.times[1].time
      }else {
        cur.times[1].time = cur.times[0].time  = 0;
        cur.progress = 0;
      }
    },
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
    },
    getReservationHistory(){
      this.$axios.get(`http://localhost:3000/api/reservation/${this.userCode}`)
      .then((r) => {
        this.items = r.data.reserv_list

        // 확인
        console.log(this.items)
        for(var item in this.items){
          console.log(item.endTime);
        }
        // // item 객체 생성
        // for(var i in r.data.reserv_list){
        //   this.items.push(new reservItem(i.reservation_time, i.arrival_time, i.menu_list, i.status, i.store_name, i.total_price))
        // }
        // // 객체 생성됐는지 확인
        // for(i=0; i<r.data.reserv_list.length; i++){
        //   console.log(this.items[i])
        // }
      })
      .catch((e) => {
        console.error(e.message)
      })
    },
    cancelMsg (item) {
      // let status = ((item.status === '수락대기') && !item.progress) && (item.status !== '예약완료' && item.progress)
      let status = !item.progress && (item.status === '수락대기' && item.status !== '예약완료')
      return status;
    }
  }
}
</script>

<style scoped>
</style>
