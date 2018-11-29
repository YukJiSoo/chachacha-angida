<template>
  <v-container class="pa-0">
    <v-layout row wrap>
      <!-- 상단 -->
      <v-flex xs12 sm12>
        <v-toolbar
          app
          dark
          height="40"
          class="angida-gradiation">
          <v-btn icon @click="$goBack()">
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <span class="font-weight-bold subheading">쿠폰함</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>

      <div class="body-2 grey--text text--darken-1 px-3 pt-3">
        <span>보유 쿠폰 {{couponNum}}개</span>
      </div>

      <!-- 쿠폰 리스트 -->
      <v-flex xs12 sm12>
        <!-- 쿠폰 아이템 -->
        <v-card v-for="coupon in coupons" class="mt-2">
          <v-layout row wrap>
            <v-flex xs7 align-self-center>
              <v-layout column>
                <v-flex xs12>
                  <div class="subheading font-weight-bold px-2">
                    <span>{{coupon.name}}</span>
                  </div>
                </v-flex>
                <v-flex xs12>
                  <div class="caption grey--text px-3">
                    <span>{{coupon.firstDay}} ~ {{coupon.lastDay}}</span>
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs5 text-xs-center class="py-4">
              <div class="display-1 orange--text text--darken-3">
                <span>-{{coupon.discount}}원</span>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      mypagePath:'/mypage',
      userCode: localStorage.getItem('code'),
      couponNum: 0,
      coupons: []
    }
  },
  mounted() {
    this.getCoupons()
  },
  methods: {
    getCoupons(){
      this.$axios.get(`http://localhost:3000/api/coupon/list/${this.userCode}`)
      .then((r) => {
        console.log(r.data)
        for(var i=0; i<r.data.length; i++){
          console.log(r.data[i])
          this.coupons.push(r.data[i])
          this.couponNum = this.coupons.length
        }
      })
      .catch((e) => {
      this.pop(e.message)
      })  
    }
  }
}
</script>

<style scoped>
</style>
