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
            <v-layout v-for="i in reviewItems" row wrap class="pb-3">
              <!-- 가게이름, 수정, 삭제 -->
              <v-flex xs12>
                <v-layout align-center justify-center row wrap>
                  <v-flex xs8>
                    <div class="xlarge pl-3 py-0 orange--text">
                      <span>{{ i.store_name }}</span>
                    </div>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn flat small fab color="success"><v-icon>edit</v-icon></v-btn>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn flat small fab color="error" ><v-icon>clear</v-icon></v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
              <!-- 가게이름, 예약날짜, 소멸예정날짜 -->
              <v-flex xs2>
                <v-avatar>
                  <img
                    :src="`${i.review_img_url}`"
                    alt="John"
                  />
                </v-avatar>
              </v-flex>

              <!-- 적립, 소멸포인트 값 -->
              <v-flex xs10 class="pl-2">
                <v-layout column wrap>
                  <!-- 아이디 -->
                  <v-flex xs12 class="pl-2">
                    <div class="medium">
                      <span>{{ i.customer_name }}</span>
                      &nbsp;&nbsp;
                      <span class="small grey--text pt-1">{{ i.review_date.substring(0, 10) }}</span>
                    </div>
                  </v-flex>
                  <!-- 별점 -->
                  <v-flex xs12>
                    <v-rating
                      v-model=i.review_rate
                      background-color="yellow darken-3"
                      color="yellow darken-3"
                      half-increments
                      small
                      :readonly="true"
                    >{{ i.review_rate }}</v-rating>
                  </v-flex>
                  <!-- 이미지 -->
                  <!-- 내용 -->
                  <v-flex xs12>
                    <div class="small grey--text text--darken-1 pt-1">
                      <span>{{ i.contents }}</span>
                    </div>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-divider class="mt-2"></v-divider>
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
      customerInfo: {},
      mypagePath: '/mypage',
      rating: 4,
      reviewItems: []
    }
  },
  mounted () {
    this.customerInfo = JSON.parse(localStorage.getItem('customerInfo'))
    this.getReviewHistory();
  },
  methods: {
    getReviewHistory () {
      var data = {};
      data.customer_code = this.customerInfo.customer_code;
      console.log("Data:",data);
      this.$axios.get('http://localhost:3000/api/review/', {
        params: data
        // , headers: data
      }).then((r) => {
        this.reviewItems = r.data
        console.log(this.reviewItems)
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
