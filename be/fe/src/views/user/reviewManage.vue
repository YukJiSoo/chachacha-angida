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
                <span class="font-weight-bold subheading">내가 쓴 리뷰</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>

      <!-- 리뷰내역 -->
      <v-flex xs12 sm12>
        <v-card flat>
          <v-layout column wrap class="px-3">
            <!-- 이용내역 아이템 -->
            <v-layout
            v-for="(item,index) in reviewItems"
            v-model="item.index"
            row wrap class="pb-3">
              <!-- 가게이름, 수정, 삭제 -->
              <v-flex xs12>
                <v-layout align-center justify-center row wrap>
                  <v-flex xs8>
                    <div class="xlarge pl-3 py-0 orange--text">
                      <span>{{item.restaurantName}}</span>
                    </div>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn flat small fab color="success" :to="writingReview"><v-icon>edit</v-icon></v-btn>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn flat small fab color="error" @click="deleteReview(index)"><v-icon>clear</v-icon></v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
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
                    <div class="medium">
                      <span>wltn3231</span>
                    </div>
                  </v-flex>
                  <!-- 날짜 -->
                  <v-flex xs12 class="pl-1">
                    <div class="small grey--text pt-1">
                      <span>{{item.date}}</span>
                    </div>
                  </v-flex>
                  <!-- 별점 -->
                  <v-flex xs12>
                    <v-rating
                      v-model="item.rating"
                      background-color="yellow darken-3"
                      color="yellow darken-3"
                      small
                      readonly="true"
                    ></v-rating>
                  </v-flex>
                  <!-- 이미지 -->
                  <!-- 내용 -->
                  <v-flex xs12>
                    <div class="small grey--text text--darken-1 pt-1">
                      <span>{{item.review}}</span>
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
      mypagePath: '/mypage',
      writingReview: '/writingReview',
      reviewItems:[
        {
          restaurantName:'강서',
          rating: 4,
          date:'2018.12.01.',
          review:'맛있게 잘 먹었습니다'
        },
        {
          restaurantName:'버거킹',
          rating: 2,
          date:'2018.11.01.',
          review:'맛없네요'
        }
      ]
    }
  },
  methods: {
    deleteReview(index){
      this.$delete(this.reviewItems, index),
      alert("삭제되었습니다.")
    }
  }
}
</script>

<style scoped>
</style>
