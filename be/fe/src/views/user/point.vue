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
                <span class="font-weight-bold subheading">포인트</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>

      <!-- 포인트 상황 -->
      <v-flex xs12 sm12>
        <v-card flat>
          <v-layout align-center column wrap>
            <v-flex xs12>
              <div class="large font-weight-bold pt-4">
                <span>보유포인트 {{ total_point }}P</span>
              </div>
            </v-flex>
            <v-flex xs12>
              <div class="medium grey--text pt-1 pb-3">
                <span>1000원이상 100원 단위로 사용 가능</span>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <!-- 포인트 이용내역 -->
      <v-flex xs12 sm12 class="mt-3">
        <v-card flat>
          <v-layout column wrap class="px-3">
            <v-flex xs12>
              <div class="xlarge font-weight-bold pl-1 py-3">
                <span>포인트 이용내역</span>
              </div>
            </v-flex>
            <!-- 이용내역 아이템 -->
            <v-layout v-for="pointItem in pointHistorys" row wrap class="pt-1">
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>

              <!-- 가게이름, 예약날짜, 소멸예정날짜 -->
              <v-flex xs8>
                <v-layout column wrap>
                  <v-flex xs12>
                    <div class="medium ">
                      <span>{{pointItem.store_name}}</span>
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <div class="medium grey--text pt-1">
                      <span>{{pointItem.occur_date.substring(0, 10)}} ({{getPointRemoveDay(pointItem.occur_date)}})</span>
                    </div>
                  </v-flex>
                </v-layout>
              </v-flex>

              <!-- 적립, 소멸포인트 값 -->
              <v-flex xs3>
                <div class="medium orange--text pt-2">
                  <span>+{{pointItem.occur_point.toFixed(0)}}원 적립</span>
                </div>
              </v-flex>
            </v-layout>

          </v-layout>
        </v-card>
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
      mypagePath:'/mypage',
      userCode: localStorage.getItem('code'),
      total_point: 0,
      pointHave: 0,
      pointHistorys: [],

    }
  },
  mounted() {
    //this.userCode = localStorage.getItem('code')
    this.customerInfo = JSON.parse(localStorage.getItem('customerInfo'))
    this.getPoint()
    this.getPointHistory()
    // this.getTotalPoint()
  },
  methods: {
    // getTotalPoint(){
    //   this.pointHistorys((v) => {
    //     this.pointHave += v.OCCUR_POINT
    //   })
    // },
    getPoint(){
      var data = {};
      data.customer_code = this.customerInfo.customer_code;
      this.$axios.get('http://localhost:3000/api/point/', {
        params: data
      })
      .then((r) => {
        console.log("갖고온 포인트 정보:", r.data)
        this.total_point = r.data.total_point
      })
      .catch((e) => {
        this.pop(e.message)
      })
    },
    getPointHistory(){
      axios.get(`http://localhost:3000/api/point/list/`, {
        params: { customer_code: this.userCode }
      })
      .then((r) => {
        console.log(r.data)
        this.pointHistorys = r.data

      })
      .catch((e) => {
      this.pop(e.message)
      })

    },
    getPointRemoveDay(date){
      // var dateArr = date.substring(10)
      // var month = dateArr[1]

      return '2018.12.23 소멸';
    }
  }
}
</script>

<style scoped>
</style>
