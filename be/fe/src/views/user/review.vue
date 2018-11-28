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
                <span class="font-weight-bold subheading">리뷰</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>

      <!-- 리뷰 상황 -->
      <v-flex xs12 sm12>
        <v-card flat class="pb-3">
          <v-layout align-center column wrap>
            <v-flex xs12>
              <div class="headline font-weight-bold pt-4">
                <span>강서 동국대점</span>
              </div>
            </v-flex>
            <v-flex xs12>
              <div class="body-2 py-1">
                <span>총 <strong class="orange--text">10</strong>개의 리뷰가 있어요</span>
              </div>
            </v-flex>
            <v-flex xs12>
              <v-btn outline color="orange" large :to="writingPath">
                <div class="px-5 mx-4 font-weight-bold subheading">리뷰 작성하기</div>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <!-- 리뷰내역 -->
      <v-flex xs12 sm12 class="mt-3">
        <v-card flat>
          <v-layout column wrap class="px-3 pt-2">
            <!-- 이용내역 아이템 -->
            <v-layout v-for="i in 3" row wrap class="py-3">
              
              <!-- 가게이름, 예약날짜, 소멸예정날짜 -->
              <v-flex xs2>
                <v-avatar>
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  >
                </v-avatar>
              </v-flex>

              <!-- 적립, 소멸포인트 값 -->
              <v-flex xs10 class="pl-2">
                <v-layout column wrap>
                  <!-- 아이디 -->
                  <v-flex xs12 class="pl-2">
                    <div class="caption">
                      <span>wltn3231</span>
                    </div>
                  </v-flex>
                  <!-- 날짜 -->
                  <v-flex xs12 class="pl-1">
                    <div class="caption grey--text pt-1">
                      <span>2018.10.03</span>
                    </div>
                  </v-flex>
                  <!-- 별점 -->
                  <v-flex xs12>
                    <v-rating
                      v-model="rating"
                      background-color="yellow darken-3"
                      color="yellow darken-3"
                      small
                    ></v-rating>
                  </v-flex>
                  <!-- 이미지 -->
                  <!-- 내용 -->
                  <v-flex xs12>
                    <div class="caption grey--text text--darken-1 pt-1">
                      <span> 늘 뭔가 당도 조절을 잊거나 얼음 조절을 잊거나 사이즈를 잘못 선택하거나 펄을 추가하지 않던가 이런 짓을 때때로 해왔는데 오늘은</span>
                    </div>
                  </v-flex>
                </v-layout>                  
              </v-flex>
            </v-layout>

          </v-layout>
        </v-card>
      </v-flex>


    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'default',
  data () {
    return {
      rating: 4,
      writingPath: '/writingReview',
      restaurantDetailPath: '/restaurantDetail'
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>