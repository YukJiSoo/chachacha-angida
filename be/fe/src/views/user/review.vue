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
              <div class="large font-weight-bold pt-4">
                <span>{{ store_name }}</span>
              </div>
            </v-flex>
            <v-flex xs12>
              <div class="medium py-1">
                <span>총 <strong class="orange--text">{{ reviewItems.length }}</strong>개의 리뷰가 있어요</span>
              </div>
            </v-flex>
            <v-flex xs12>
              <v-btn outline color="orange" large :to="writingPath">
                <div class="px-5 mx-4 font-weight-black xlarge">리뷰 작성하기</div>
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
            <v-layout v-for="review in reviewItems" row wrap class="py-3">

              <!-- 가게이름, 예약날짜, 소멸예정날짜 -->

              <!-- 적립, 소멸포인트 값 -->
              <v-flex xs10 class="pl-2">

                  <!-- 아이디 -->
                  <v-flex xs12 class="pl-2">
                    <div class="small">
                      <span>{{ review.customer_name }}</span>
                    </div>
                  </v-flex>
                  <!-- 날짜 -->
                  <v-flex xs12 class="pl-1">
                    <div class="small grey--text pt-1">
                      <span>{{ review.review_date.substring(0, 10) }}</span>
                    </div>
                  </v-flex>
                  <!-- 별점 -->
                  <v-flex xs12>
                    <v-rating
                      v-model="review.review_rate"
                      background-color="yellow darken-3"
                      color="yellow darken-3"
                      small
                      :readonly="true"
                    >{{ review.review_rate }}</v-rating>
                  </v-flex>
                  <!-- 내용 -->
                  <v-flex xs12>
                    <div class="small grey--text text--darken-1 pt-1">
                      <span> {{ review.contents }}</span>
                    </div>
                  </v-flex>
                  <v-img v-if="review.review_img_url != NULL" width=250 height=200
                    :src="`${review.review_img_url}`"
                  ></v-img>

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
      store_code: '',
      store_name: '',
      rating: 4,
      writingPath: '/writingReview',
      restaurantDetailPath: '/restaurantDetail',
      reviewItems: []
    }
  },
  mounted () {
    this.store_code = this.$route.query.store_code
    this.store_name = this.$route.query.store_name
    console.log("review store_code:", this.store_code, ", ", this.store_name)
    this.getReview()
  },
  methods: {
    // 리뷰 정보 받아오기
    getReview () {
      var data = {};
      data.store_code = this.store_code;
      this.$axios.get(`http://localhost:3000/api/review`, {
        params: data
      })
      .then((r) => {
        console.log(r.data)
        this.reviewItems = r.data
      })
      .catch((e) => {
        this.pop(e.message)
      })
    },
  }
}
</script>

<style scoped>
</style>
