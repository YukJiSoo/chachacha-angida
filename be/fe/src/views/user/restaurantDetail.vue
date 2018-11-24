<template>
  <v-container class="pa-1">
    <v-layout row wrap>
      <!-- toolbar -->
      <v-flex xs12 sm12>
        <v-toolbar
          app
          dark
          height="40"
          class="angida-gradiation">
          <v-btn icon>
            <v-icon @click="goToMain">keyboard_arrow_left</v-icon>
          </v-btn>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <span @click="goToMain" class="font-weight-bold subheading">토끼정 강남점</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>

        <!-- 음식점 item -->
        <v-flex xs12 class="pt-2">
          <!-- 1행,2행 -->
          <v-layout row wrap align-center class="pb-2">
            <!-- 사진 -->
            <v-flex xs12 sm12 class="pa-0 black">
              <v-img
                :src="require('../../assets/mlogo.png')"
              >
              </v-img>
            </v-flex>
            <!-- 이름 -->
            <v-flex xs12 sm12 class="pt-4 pl-2 pb-0">
              <div class="display-2 font-weight-bold">
                <span>토끼정 강남점</span>
              </div>
            </v-flex>
            <!-- 간단한 설명 -->
            <v-flex xs12 sm12 class="pl-4 pt-3 pr-4">
              <div class="caption grey--text text--darken-2">
                <span>갓 구운 토끼를 이쁜 접시에 담아서 사진찍기 좋은 음식점. 토끼구이의 색다른 맛. 토끼회도 있어요. </span>
              </div>
            </v-flex>
          </v-layout>
          <v-divider class="mt-2"></v-divider>

          <!-- 3행 -->
          <v-layout row wrap align-center class="my-3">
            <!-- 별점 점수 -->
            <v-flex xs5.5 sm12 class="pa-0">
              <v-layout column wrap align-center>
                <!-- 별 -->
                <v-flex xs12 sm12 class="pa-0">
                  <div class="display-2 font-weight-bold red--text text-xs-center">
                    <span>4.6</span>
                  </div>
                </v-flex>
                <!-- 점수 -->
                <v-flex xs12 sm12 class="pa-0">
                  <v-rating
                    v-model="rating"
                    background-color="yellow lighten-3"
                    color="yellow"
                    small
                  ></v-rating>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-divider vertical class="ma-0 pa-0"></v-divider>
            <!-- 리뷰 -->
            <v-flex xs5.5 sm12 class="pa-0">
              <v-layout column wrap align-center>
                <!-- 리뷰-제목 -->
                <v-flex xs12 sm12 class="pa-0">
                  <div class="subheading font-weight-black text-xs-center">
                    <span>리뷰</span>
                  </div>
                </v-flex>
                <!-- 리뷰개수 -->
                <v-flex xs12 sm12 class="pa-0">
                  <div class="display-2 font-weight-bold red--text text-xs-center">
                    <span>130</span>
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-divider class="mt-2"></v-divider>

          <!-- 4행 주소, 전화번호 -->
          <v-flex xs12 sm12 class="pl-4 pt-3 pr-4 pb-2">
            <div class="caption grey--text text--darken-2">
              <span>주소 : </span><span>서울특별시 중구 장충동 2가 193-179번지 201호</span>
            </div>
            <div class="caption grey--text text--darken-2">
              <span>전화번호 : </span><span>02-2345-6789</span>
            </div>
          </v-flex>
          <v-divider class="mt-2"></v-divider>

          <!-- 5행 메뉴종류 -->
          <v-layout row wrap class="mt-2">
            <v-flex v-for="i in 9" :key="i" xs6 class="pa-1">
              <img :src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`" class="image" alt="lorem" width="100%" height="100%">
            </v-flex>
          </v-layout>
        </v-flex>

        <!-- 안아주기 버튼 -->
        <v-footer
          :fixed="false" 
          app
          color="transparent"
          class="mb-2"
        >
          <v-layout align-center justify-center row fill-height>
            <v-btn
              color="deep-orange lighten-1"
              class="font-weight-bold headline white--text px-5"
              @click="goToPage(reservationPage)"
            >
              안아주기
            </v-btn>
          </v-layout>
        </v-footer>

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
      detailPage:'http://localhost:8080/restaurantDetail',
      reservationPage:'http://localhost:8080/reservation',
    }
  },
  methods: {
    goToMain () {
      window.location.href = 'http://localhost:8080/home';
    },
    goToPage (page) {
      window.location.href = page;
    }
  }
}
</script>