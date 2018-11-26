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
          <v-btn dark icon>
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <span class="font-weight-bold subheading">주문내역</span>
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
        </div>
      </v-flex>
      <!-- 가게이름 -->
      <v-flex xs12 sm12>
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
          <v-btn outline color="orange" class="angida-gradiation px-5" dark large >
            <div class="headline font-weight-bold px-5">
              다시 안아주기
            </div>
          </v-btn>
        </div>
      </v-flex>
      <!-- 리뷰작성하러가기 -->
      <v-flex xs12 sm12 align-self-center>
        <div v-if="i===1" class="caption light-blue--text text--darken-2 font-weight-bold">
          <span>리뷰 작성하러 가기</span>
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
    }
  },
  methods: {}
}
</script>

<style scoped>
</style>