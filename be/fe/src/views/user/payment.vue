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
              <span>
                {{ reservationInfo.total_price - reservationInfo.point_discount - reservationInfo.couponChoice.discount_amount }}원
              </span>
            </div>
            <div>
              <span class="grey--text text--darken-2 small">포인트 - {{reservationInfo.point_discount}}P</span>
              <span class="pl-3 grey--text text--darken-2 small">할인쿠폰 - {{reservationInfo.couponChoice.discount_amount}}원</span>
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
            <div class="px-5 py-2 mx-5 xlarge " :class="`${reservationInfo.payMethod.color}--text`">
              {{reservationInfo.payMethod.payment_status}}
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
            <v-radio-group v-model="reservationInfo.payMethod" class="ml-4 mt-2">
              <v-radio
                v-for="method in payMethods"
                class="mb-4"
                :value="method"
                 color="orange"
              >
                <div slot="label" class="xlarge" :class="`${method.color}--text`">{{method.payment_status}}</div>
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
                {{reservationInfo.couponChoice.coupon_name}}
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
            <v-radio-group v-model="reservationInfo.couponChoice" class="ml-4 mt-2">
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
            <div class="small red--text text--darken-2">
              {{((reservationInfo.total_price - reservationInfo.point_discount)*reservationInfo.point_rate).toFixed(0)}}P 적립예정
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
              v-model="reservationInfo.point_discount"
              solo
              placeholder="0"
              hint="1000P 이상 사용가능"
              persistent-hint
              class="medium"
              :disabled="pointCondition == 1 ? false : true"
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
      customerInfo: {},
      reservationInfo:{
        store_name: '',
        store_code: '',
        // customer_code는 localStorage에서 customerInfo를 JSON.parse 해서 갖고와야함.
        customer_code: '',
        reserv_time: '',
        no_of_people: 0,
        total_price: 0,
        menuItems: {},
        point_discount: 0, // 사용할 포인트
        coupon_discount: 0,
        couponChoice: { // 사용할 쿠폰
          coupon_name: '쿠폰을 선택해주세요',
          discount_amount: 0,
          coupon_code: 1
        },
        payMethod: {
          payment_status: '결제수단',
          color: 'black'
        },
      },
      pointHave: 0,
      pointCondition: 0,
      payMethods: [
        {
          payment_status: '네이버페이',
          color: 'green'
        },
        {
          payment_status: '카카오페이',
          color: 'yellow'
        },
        {
          payment_status: '신용카드',
          color: 'blue'
        },
        {
          payment_status: '무통장입금',
          color: 'black'
        }
      ],

      couponItems: [],
      dialogPayRule: false,
      dialogCoupone: false,
    }
  },
  mounted() {
    this.customerInfo = JSON.parse(localStorage.getItem('customerInfo'))
    /* 트랜잭션에 필요한 예약 정보 초기화 */
    this.reservationInfo.customer_code = this.customerInfo.customer_code
    this.reservationInfo.point_rate = this.customerInfo.point_rate
    this.reservationInfo.store_code = this.$route.params.storeInfo.store_code
    this.reservationInfo.reserv_time = new Date()
    this.reservationInfo.order_time = new Date()
    this.reservationInfo.no_of_people = this.$route.params.no_of_people
    this.reservationInfo.total_price = this.$route.params.total_price
    this.reservationInfo.menuItems = this.$route.params.cart
    this.reservationInfo.store_name = this.$route.params.storeInfo.store_name
    this.reservationInfo.selected_hour = this.$route.params.selected_hour
    this.reservationInfo.selected_min = this.$route.params.selected_min
    this.getCoupons()
    this.getPoint()
  },
  methods: {
    getCoupons(){
      this.$axios.get(`http://localhost:3000/api/coupon/list/${this.reservationInfo.userId}`)
      .then((r) => {
        this.couponItems = r.data
        console.log("갖고온 쿠폰 정보:", this.couponItems)
      })
      .catch((e) => {
        this.pop(e.message)
      })

    },
    getPoint(){
      var data = {};
      data.customer_code = this.customerInfo.customer_code;
      this.$axios.get('http://localhost:3000/api/point/', {
        params: data
      })
      .then((r) => {
        console.log("갖고온 포인트 정보:", r.data)
        this.pointHave = r.data.total_point
        if(this.pointHave >= 1000)
          this.pointCondition = 1
        console.log("pointCondition:",this.pointCondition)
      })
      .catch((e) => {
        this.pop(e.message)
      })
    },
    postReservation(){
      this.$axios.post(`http://localhost:3000/api/reservation/`, this.reservationInfo)
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
      this.postReservation()
    },
    paySuccess(){
      alert("결제가 완료되었습니다. 예약 수락응답 기다려주세요.")
      this.$router.push('/Home')
    },
    payFail(){
      alert("결제에 실패했습니다.")
    }
  }
}
</script>

<style scoped>
</style>
