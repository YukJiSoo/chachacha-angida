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
                <span>보유포인트 {{pointHave}}P</span>
              </div>
            </v-flex>
            <v-flex xs12>
              <div class="medium pt-1">
                <span>1000원이상 100원 단위로 사용 가능</span>
              </div>
            </v-flex>
            <v-flex xs12>
              <div class="medium grey--text py-3">
                <span>이번 달 소멸 예정포인트 {{pointRemove}}원</span>
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
                      <span>{{pointItem.store}}</span>
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <div class="medium grey--text pt-1">
                      <span>{{pointItem.date}} ({{getPointRemoveDay(pointItem.date)}})</span>
                    </div>
                  </v-flex>
                </v-layout>                  
              </v-flex>

              <!-- 적립, 소멸포인트 값 -->
              <v-flex xs3>
                <div class="medium orange--text pt-2">
                  <span>+{{pointItem.point}}원 적립</span>
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
      pointHave: 0,
      pointRemove: 0,
      pointHistorys: [
        {
          store: '',
          date: '',
          point: '',
        }
      ],
      
    }
  },
  mounted() {
    //this.userCode = localStorage.getItem('code')

    this.getPoint()
    this.getPointHistory()
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
      
    },
    getPointHistory(){
      axios.get(`http://localhost:3000/api/point/list/${this.userCode}`)
      .then((r) => {
        console.log(r.data)
        for(var i=0; i<r.data.length; i++){
          console.log(r.data[i])
          this.pointHistorys.push(r.data[i])
        }
      })
      .catch((e) => {
      this.pop(e.message)
      })  
      
    },
    getPointRemoveDay(date){
      var dateArr = date.split('.')
      var month = dateArr[1]

      return '2018.12.23 소멸';
    }
  }
}
</script>

<style scoped>
</style>