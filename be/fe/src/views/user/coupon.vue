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
          <v-btn icon :to="mypagePath">
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
        <span>보유 쿠폰 5개</span>
      </div>

      <!-- 쿠폰 리스트 -->
      <v-flex xs12 sm12>
        <!-- 쿠폰 아이템 -->
        <v-card v-for="i in 5" class="mt-2">
          <v-layout row wrap>
            <v-flex xs8 align-self-center>
              <v-layout column>
                <v-flex xs12>
                  <div class="subheading font-weight-bold px-2">
                    <span>생일 기념 10% 할인쿠폰</span>
                  </div>
                </v-flex>
                <v-flex xs12>
                  <div class="caption grey--text px-3">
                    <span>2018.11.27 ~ 2018.12.26</span>
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs4 text-xs-center class="py-4">
              <div class="display-1 orange--text text--darken-3">
                <span>20%</span>
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
      }
    }
  }
</script>

<style scoped>
</style>
