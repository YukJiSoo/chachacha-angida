<template>
  <v-container class="pa-1">
    <!-- 상단, 결제금액 -->
    <v-layout align-space-around column>
      <v-flex xs12 sm12>
        <!-- 상단 -->
        <v-btn icon class="ma-1" @click="$goBack()">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-divider class="mx-3 mt-2"></v-divider>

        <!-- 금액 -->
        <v-layout justify-space-between row class="pl-4 mt-2">
          <v-flex xs12 sm12>
            <div class="pt-3 pb-1 title">
              결제금액
            </div>
            <div class="pt-2 pb-2 font-weight-bold headline">
              <span>{{allPrice-pointUsing-couponChoice.discount}}원</span>
            </div>
            <div class="font-weight-bold headline">
              <span class="grey--text text--darken-2 body-2">포인트 - {{pointUsing}}P</span>
              <span class="pl-3 grey--text text--darken-2 body-2">할인쿠폰 - {{couponChoice.discount}}원</span>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- 결제수단 -->
    <v-layout align-center column class="mt-4">
      <v-flex xs12 sm12>
        <v-dialog v-model="dialogPayRule" fullscreen hide-overlay transition="dialog-bottom-transition">
          <!-- 선택 -->
          <v-card hover slot="activator">
            <div class="px-5 py-3 mx-5 title font-weight-bold" :class="`${payMethod.color}--text`">
              {{payMethod.name}}
            </div>
          </v-card>
          <!-- 수단내역 새창출력-->
          <v-card>
            <!-- 상단 -->
            <v-list >
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-btn icon class="ma-1" @click="dialogPayRule = false">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <div class="subheading font-weight-bold">
                  결제수단
                </div>
              </v-list-tile>
            </v-list>

            <!-- 결제수단-라디오그룹 -->
            <v-radio-group v-model="payMethod" class="ml-4 mt-2">
              <v-radio
                v-for="method in payMethods"
                class="mb-4"
                :value="method"
                 color="orange"
              >
                <div slot="label" class="headline black-text font-weight-bold">{{method.name}}</div>
              </v-radio>
            </v-radio-group>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>

    <!-- 요청사항 -->
    <v-layout align-space-around column class="mx-2 mt-5">
      <v-flex xs12 sm12>
        <v-text-field
          label="requirement"
          placeholder="요청사항"
          v-model="requirement"
          solo
        ></v-text-field>
      </v-flex>
    </v-layout>

    <!-- 쿠폰 -->
    <v-layout align-center justify-space-around>
      <!-- 쿠폰-제목 -->
      <v-flex xs4 sm12 class="pa-2 mb-1">
        <div class="font-weight-black subheading">
          할인쿠폰
        </div>
      </v-flex>
      <!-- 쿠폰사용여부, 선택 -->
      <v-layout align-end column>
        <v-flex xs6 sm12 class="pa-2 mb-1">
          <v-dialog v-model="dialogCoupone" fullscreen hide-overlay transition="dialog-bottom-transition">
            <!-- 선택 -->
            <v-card slot="activator" class="px-4 py-2">
              <div class="body-1 grey--text text--darken-2">
                {{couponChoice.name}}
              </div>
            </v-card>
            <v-card>
            <!-- 상단 -->
            <v-list >
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-btn icon class="ma-1" @click="dialogCoupone = false">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <div class="subheading font-weight-bold">
                  할인쿠폰
                </div>
              </v-list-tile>
            </v-list>
            
            <!-- 쿠폰-체크박스 -->
            <v-radio-group v-model="couponChoice" class="ml-4 mt-2">
              <v-radio
                v-for="coupon in couponItems"
                :key="n"
                :value="coupon"
                color="orange"
                class="mb-4"
              >
                <div slot="label" class="title black-text font-weight-bold">{{coupon.name}}</div>
              </v-radio>
            </v-radio-group>

          </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-layout>
    <v-divider></v-divider>

    <!-- 보유포인트 -->
    <v-layout align-center justify-space-around>
      <!-- 보유포인트-제목 -->
      <v-flex xs7 sm12 class="pa-2 mb-1">
        <div class="font-weight-black subheading">
          보유 포인트
        </div>
      </v-flex>
      <!-- 보유포인트 및 적립예정 -->
      <v-flex xs5 sm12 class="pa-2 mb-1">
        <v-layout align-end column>
          <v-flex xs12>
            <div class="body-1 grey--text text--darken-2">
              {{pointHave}} P
            </div>
          </v-flex>
          <v-flex xs12>
            <div class="caption grey--text text--darken-2">
              {{allPrice/100}}P 적립예정
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>

    <!-- 포인트사용 -->
    <v-layout align-center justify-space-around>
      <!-- 포인트사용-제목 -->
      <v-flex xs7  sm12 class="pa-2 mb-1">
        <div class="font-weight-black subheading">
          포인트 사용
        </div>
      </v-flex>
      <!-- 포인트입력 -->
      <v-flex xs5 sm12 class="pa-2 mb-1">
        <v-layout align-end column>
          <v-flex xs6>
            <v-text-field
              solo
              placeholder="0"
              hint="1000P 이상 사용가능"
              v-model="pointUsing"
              persistent-hint
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>

    <!-- 결제버튼 -->
    <v-layout align-center column class="mt-5">
      <v-flex xs12>
        <div>
          <v-btn class="angida-gradiation px-5" dark large :to="paySuccessPath" @click="paySuccess">
            <div class="headline font-weight-bold px-5">
              결제하기
            </div>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  name: 'default',
  data () {
    return {
      storeId: '',
      hour: 0,
      minute: 0,
      peopleNum: 0,
      allPrice: 0,
      requirement: '',
      payMethod: {
        name: '결제수단',
        color: 'black'
      },
      couponChoice: {
        name: '쿠폰을 선택해주세요',
        discount: 0
      },

      pointUsing: '',
      pointHave: 1000,

      payMethods: [
        {
          name: '네이버페이',
          color: 'green'
        }, 
        {
          name: '카카오페이',
          color: 'yellow'
        }, 
        {
          name: '신용카드',
          color: 'blue'
        }, 
        {
          name: '무통장입금',
          color: 'black'
        }
      ],
      couponItems: [
        {
          name: '1000원 할인',
          discount: 1000
        }, 
        {
          name: '5000원 할인',
          discount: 5000
        }, 
        {
          name: '3000원 할인',
          discount: 3000
        }, 
      ],
      paySuccessPath: '/home',
      dialogPayRule: false,
      dialogCoupone: false,
    }
  },
  mounted() {
    this.storeId = this.$route.query.storeId
    this.hour = this.$route.query.hour
    this.minute = this.$route.query.minute
    this.peopleNum = this.$route.query.peopleNum
    this.allPrice = this.$route.query.allPrice
    
    this.userId = localStorage.getItem('id')

    // getCoupons()
    // getPoint()
  },
  methods: {
    getCoupons(){
      axios.get('http://localhost:3000/api/coupon',{
        userId: this.userId
      })
      .then((r) => {
        console.log(r.data)
        var couponNum = r.data.length

        for(var i=0; i<couponNum; i++)
          this.couponItems.push(r.data[i]) 
      })
      .catch((e) => {
      this.pop(e.message)
      })

    },
    getPoint(){
      axios.get('http://localhost:3000/api/point',{userId: this.userId})
      .then((r) => {
        console.log(r.data)
        this.pointHave = r.data.point
      })
      .catch((e) => {
      this.pop(e.message)
      })  
    },
    paySuccess(){
      alert("결제가 완료되었습니다. 예약 수락응답 기다려주세요.")
    }
  }
}
</script>

<style scoped>
</style>