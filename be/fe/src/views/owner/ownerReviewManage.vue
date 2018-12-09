<template>
  <v-container grid-list-md text-xs-center align-center>
    <basicSet></basicSet>
    <v-flex xs12 sm12 class="mb-3">
      <!-- 음식점 이름-->
      <h3 class="xlarge">리뷰관리</h3>
    </v-flex>
    <!--menu list-->
    <v-layout row>
      <div>
        <v-expansion-panel
          expand
        >
          <v-expansion-panel-content v-for="item in reviewItems">
            <div slot="header"><h2 class="xlarge">{{item.customer_name}} {{item.review_date.substring(0,10)}}</h2></div>
            <v-card>
              <h3 class="medium">&nbsp;&nbsp;&nbsp;&nbsp;ID: {{item.customer_name}} &nbsp;&nbsp;&nbsp;&nbsp;
                <v-icon
                  color="red"
                  @click="report">block</v-icon>
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <v-icon
                  color="green"
                  slot="activator"
                  class="ml-3">card_giftcard</v-icon>
                  <v-card>
                    <v-card-title>
                      <span class="xlarge orange--text">쿠폰발급</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field v-model="coupon_name" label="쿠폰이름" required color="orange " class="medium"></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field v-model="discount_amount" label="할인가격" required color="orange " class=" medium"></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field  v-model="min_order_amount" label="최소주문금액" required color="orange " class="medium"></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="orange" class="medium" flat @click="dialog = false">닫기</v-btn>
                      <v-btn color="orange" class="medium" flat @click="dialog = giveCoupon(item.customer_code)">발급</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </h3>
              <v-card-text class="medium">{{item.contents}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import basicSet from '@/components/ownerBasic'

export default {
  components: { basicSet },
  name: 'ownerReviewManage',
  data () {
    return {
      ownerInfo: JSON.parse(localStorage.getItem('ownerInfo')),
      reviewItems: [],
      dialog: false,
      coupon_name: '',
      discount_amount: 0,
      min_order_amount: 0
    }
  },
  methods: {
    logout(){
      alert("로그아웃 되었습니다."),
      this.$router.push('/')
    },
    report(){
      alert("신고되었습니다.")
    },
    giveCoupon(customer_code){
      alert(`${customer_code} 님에게 쿠폰이 발급되었습니다.`)
      console.log(this.ownerInfo.store_code, this.discount_amount, this.coupon_name);
      this.$axios.post('http://localhost:3000/api/coupon', {
        store_code: this.ownerInfo.store_code,
        customer_code: customer_code,
        coupon_name: this.coupon_name,
        discount_amount: this.discount_amount,
        min_order_amount: this.min_order_amount
      })
    },
    getReviewList(){
      this.$axios.get(`http://localhost:3000/api/review/owner/${this.ownerInfo.store_code}`)
      .then((r) => {
        this.reviewItems = r.data
        console.log(this.reviewItems)
      })
      .catch((e) => {
        console.error(e.message)
      })
    }
  },
  mounted() {
    this.getReviewList()
  }
}
</script>

<style scoped>
.angida-gradiation{
   background: #fc8e53;
   background: -moz-linear-gradient(left, #fc8e53 0%, #f17432 0%, #fc8e53 0%, #fc8e53 17%, #ea5507 55%, #f70000 100%);
   background: -webkit-linear-gradient(left, #fc8e53 0%,#f17432 0%,#fc8e53 0%,#fc8e53 17%,#ea5507 55%,#f70000 100%);
   background: linear-gradient(to right, #fc8e53 0%,#f17432 0%,#fc8e53 0%,#fc8e53 17%,#ea5507 55%,#f70000 100%);
   filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fc8e53', endColorstr='#f70000',GradientType=1 );
}
</style>
