<template>
  <v-container class="pa-1">
    <!-- 상단, 결제금액 -->
    <v-layout align-space-around column>
      <v-flex xs12 sm12>
        <!-- 상단 -->
        <v-icon @click="$goBack()" class="pl-3 pt-2">keyboard_arrow_left</v-icon>
        <v-divider class="mx-3 mt-2"></v-divider>

        <!-- 금액 -->
        <v-layout justify-space-between row class="pl-4 mt-2">
          <v-flex xs12 sm12>
            <div class="pt-3 pb-1 xlarge">
              결제금액
            </div>
            <div class="pt-2 pb-2 font-weight-bold large">
              <span>{{reservationInfo.total_price-reservationInfo.point_discount-couponChoice.coupon_discount}}원</span>
            </div>
            <div>
              <span class="grey--text text--darken-2 small">포인트 - {{reservationInfo.point_discount}}P</span>
              <span class="pl-3 grey--text text--darken-2 small">할인쿠폰 - {{couponChoice.coupon_discount}}원</span>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- 결제수단 -->
    <v-layout align-center column class="mt-4 mb-3">
      <v-flex xs12 sm12>
        <v-dialog v-model="dialogPayRule" fullscreen hide-overlay transition="dialog-bottom-transition">
          <!-- 선택 -->
          <v-card hover slot="activator">
            <div class="px-5 py-2 mx-5 xlarge " :class="`${payMethod.color}--text`">
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
                <div class="xlarge font-weight-bold">
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
                <div slot="label" class="xlarge black-text">{{method.name}}</div>
              </v-radio>
            </v-radio-group>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>

    <!-- 쿠폰 -->
    <v-layout align-center justify-space-around>
      <!-- 쿠폰-제목 -->
      <v-flex xs4 sm12 class="pa-2 mb-1">
        <div class="xlarge">
          할인쿠폰
        </div>
      </v-flex>
      <!-- 쿠폰사용여부, 선택 -->
      <v-layout align-end column>
        <v-flex xs6 sm12 class="pa-2 mb-1">
          <v-dialog v-model="dialogCoupone" fullscreen hide-overlay transition="dialog-bottom-transition">
            <!-- 선택 -->
            <v-card slot="activator" class="px-4 py-2">
              <div class="medium grey--text text--darken-2">
                {{couponChoice.coupon_name}}
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
                <div class="xlarge font-weight-bold">
                  할인쿠폰
                </div>
              </v-list-tile>
            </v-list>
            
            <!-- 쿠폰-체크박스 -->
            <v-radio-group v-model="couponChoice" class="ml-4 mt-2">
              <v-radio
                v-for="coupon in couponItems"
                :value="coupon"
                color="orange"
                class="mb-4"
              >
                <div slot="label" class="xlarge black-text">{{coupon.coupon_name}}</div>
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
        <div class="xlarge">
          보유 포인트
        </div>
      </v-flex>
      <!-- 보유포인트 및 적립예정 -->
      <v-flex xs5 sm12 class="pa-2 mb-1">
        <v-layout align-end column>
          <v-flex xs12>
            <div class="medium grey--text text--darken-2">
              {{pointHave}} P
            </div>
          </v-flex>
          <v-flex xs12>
            <div class="small grey--text text--darken-2">
              {{reservationInfo.total_price/100}}P 적립예정
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
        <div class="xlarge">
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
              v-model="reservationInfo.point_discount"
              persistent-hint
              class="medium"
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
          <v-btn class="angida-gradiation px-5" dark large @click="pay">
            <div class="large px-5" >
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
      reservationInfo:{
        customer_code: '',
        store_code: '',
        hour: 0,
        minute: 0,
        no_of_people: 0,
        total_price: 0,
        menuItems: {},
        point_discount: 0,
        coupon_discount: 0, //
      },
      payMethod: {
        name: '결제수단',
        color: 'black'
      },
      couponChoice: {
        coupon_name: '쿠폰을 선택해주세요',
        coupon_discount: 0,
        coupon_code: 1
      },
      pointHave: '',

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

      couponItems: [],
      dialogPayRule: false,
      dialogCoupone: false,
    }
  },
  mounted() {
    console.log(this.$route.params)
    this.reservationInfo.store_code = this.$route.params.storeId
    this.reservationInfo.hour = this.$route.params.hour
    this.reservationInfo.minute = this.$route.params.minute
    this.reservationInfo.no_of_people = this.$route.params.peopleNum
    this.reservationInfo.total_price = this.$route.params.allPrice
    this.reservationInfo.menuItems = this.$route.params.cart
    

    this.reservationInfo.customer_code = localStorage.getItem('code')

    this.getCoupons()
    this.getPoint()
  },
  methods: {
    getCoupons(){
      this.$axios.get(`http://localhost:3000/api/coupon/list/${this.userId}`)
      .then((r) => {
        this.couponItems = r.data
      })
      .catch((e) => {
      this.pop(e.message)
      })

    },
    getPoint(){
      this.$axios.get(`http://localhost:3000/api/point/${this.userId}`)
      .then((r) => {
        
        this.pointHave = r.data.TOTAL_POINT
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    putCoupon(couponId){
      this.$axios.put(`http://localhost:3000/api/coupon/${this.userId}/${couponId}`,{status: 'N'})
      .then((r) => {
        console.log(r.data)

        if(r.data) this.paySuccess()
        else this.payFail()
      })
      .catch((e) => {
      this.pop(e.message)
      })

    },
    putPoint(){
      var pointChange = this.pointHave - this.point_discount
      this.$axios.put(`http://localhost:3000/api/point/${this.userId}`, { point: pointChange})
      .then((r) => {
        console.log(r.data)

        if(r.data) this.paySuccess()
        else this.payFail()
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    postReservation(){
      this.$axios.post(`http://localhost:3000/api/reservation/${this.userId}`, this.reservationInfo)
      .then((r) => {
        console.log(r.data)
        
        if(r.data) this.paySuccess()
        else this.payFail()
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    pay(){
      this.putCoupon(this.couponChoice.coupon_code)
      this.putPoint()
      this.postReservation()
    },
    paySuccess(){
      alert("결제가 완료되었습니다. 예약 수락응답 기다려주세요.")
      //this.$router.push('/home')
    },
    payFail(){
      alert("결제에 실패했습니다.")
    }
  }
}
</script>

<style scoped>
</style>