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
            <router-link :to="mainPath" class="text--decoration-none">
              <v-icon color="white">keyboard_arrow_left</v-icon>
            </router-link>
          </v-btn>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <span class="font-weight-bold subheading">토끼정</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>

        <!-- 음식점 List -->
        <v-flex v-for="i in 3" xs12 class="pt-2">
          <router-link :to="detailPath" class="text--decoration-none">
            <v-layout row wrap align-center>
              <!-- 왼쪽-사진 -->
              <v-flex xs5 sm12 class="pa-0 black">
                <v-img
                  :src="require('../../assets/mlogo.png')"
                >
                </v-img>
              </v-flex>
              <!-- 오른쪽 -->
              <v-flex xs7 sm12 class="pl-2">
                <v-layout row wrap>
                  <!-- 이름 -->
                  <v-flex xs12 sm12 class="pt-0 pb-0">
                    <div class="headline font-weight-bold black--text">
                      <span>토끼정 강남점</span>
                    </div>
                  </v-flex>
                  <!-- 1행 -->
                  <v-flex xs12 sm12 class="pt-0 pb-1">
                    <v-layout align-center justify-center row fill-height>
                      <!-- 별점-아이콘 -->
                      <v-flex xs2 sm12 class="pa-0">
                        <v-icon color="red">star</v-icon>
                      </v-flex>
                      <!-- 별점-숫자 -->
                      <v-flex xs4 sm12 class="pa-0">
                        <div class="body-1 grey--text text--darken-2 font-weight-bold">
                          <span>3.6</span>
                        </div>
                      </v-flex>
                      <!-- 위치 -->
                      <v-flex xs6 sm12 class="pa-0">
                        <div class="body-1 grey--text text--darken-2 font-weight-bold">
                          <span>약 300m</span>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <!-- 2행 -->
                  <v-flex xs12 sm12 class="pt-0 pb-1">
                    <v-layout align-center justify-center row fill-height>
                      <!-- 자리현황-제목 -->
                      <v-flex xs6 sm12 class="pa-0">
                        <div class="body-1 grey--text text--darken-1">
                          <span>자리현황</span>
                        </div>
                      </v-flex>
                      <!-- 자리현황-내용 -->
                      <v-flex xs6 sm12 class="pa-0">
                        <div class="body-1">
                          <span class="green--text">10</span><span> / </span><span>30</span><span>석</span>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <!-- 3행 -->
                  <v-flex xs12 sm12 class="pt-0 pb-1">
                    <v-layout align-center justify-center row fill-height>
                      <!-- 태그들 -->
                      <v-flex v-for="i in 3" xs4 sm12 class="pa-0">
                        <div class="body-1 pink--text text--lighten-3">
                          <span>#tag</span>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </router-link>
          <v-divider class="mt-2"></v-divider>
        </v-flex>
        
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'default',
  data () {
    return {
      mainPath:'/home',
      detailPath:'/restaurantDetail',
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>