<template>
  <v-container class="pa-0 ">
    <v-layout>
      <v-flex xs12 sm12>
        <!-- advertisement -->
        <v-carousel
          hide-delimiters
          app
          height="200"
        >
          <v-carousel-item
            v-for="(item,i) in ad_items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>

        <!-- category - 그리드 형식으로 한눈에 보이게 -->

        <!-- 위치기반 검색 창 푸터 -->
        <v-footer
          :fixed="false"

          app
          height="auto"
          color="grey lighten-4"
          class="footer-style pb-3"
        >
          <v-container grid-list-xl class="pt-2">
            <v-layout align-center justify-center column fill-height>
              <v-flex class="pa-0">
                <v-bottom-sheet v-model="sheet">
                  <v-btn slot="activator" small flat icon color="grey">
                    <v-icon>keyboard_arrow_up</v-icon>
                  </v-btn>
                  <v-list class="py-0">
                    <!-- 장소설정 -->
                    <v-container grid-list-xl class="pt-0">
                      <v-layout align-center justify-center column fill-height>
                        <v-flex xs12 sm12 class="pa-1">
                          <div class="grey--text caption text--darken-2">장소설정</div>
                        </v-flex>
                      </v-layout>
                      <v-divider></v-divider>
                      <!-- 지도 -->
                      <v-layout align-center justify-center row fill-height>
                        <v-flex xs12 sm6 class="px-0">
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/toolbar/map.jpg"
                          ></v-img>
                        </v-flex>
                      </v-layout>

                      <v-container fluid grid-list-xl class="pa-0">
                        <v-layout row>
                          <v-flex xs8 sm6 class="px-1">
                            <v-text-field
                              label="위치를 입력하세요"
                              solo
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs4 sm6>
                            <v-btn round dark color="red">
                              현재 위치
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </v-container>

                      <v-container fluid grid-list-lg class="pa-0">
                        <v-layout row wrap>
                          <v-flex xs12 class="px-3 py-0">
                            <v-subheader class="mt-1 pb-4 px-0 black--text font-weight-bold">검색반경</v-subheader>
                            <v-slider
                              v-model="locationSlider"
                              color="red"
                              thumb-color="red"
                              :thumb-size="24"
                              thumb-label="always"
                              :max="10"
                              :min="0"
                              :step="0.1"
                            ></v-slider>
                          </v-flex>
                        </v-layout>
                      </v-container>

                    </v-container>
                  </v-list>
                </v-bottom-sheet>
              </v-flex>

              <v-container grid-list-xl flex class="pt-0">
                <v-layout align-center justify-center row fill-height>
                  <v-flex xs2 sm6 class="pa-0">
                    <v-icon color="grey" class="pt-0 ml-0">my_location</v-icon>
                  </v-flex>
                  <v-flex xs7 sm6 class="pa-0">
                    <div class="caption text--darken-2">
                      <span>내 위치 : </span>
                      <span>강남역 11번 출구</span>
                    </div>
                  </v-flex>
                  <v-flex xs2 sm6 class="pa-0">
                    <div class="caption text--darken-2">
                      <span>주변</span>
                      <span> 1.5km</span>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>

            </v-layout>
          </v-container>
      </v-footer>


      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        size: 'sm',
        ad_items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
          }
        ],
        reviews: 413,
        value: 4.5,
        locationSlider: 5,
      }
    },
    methods: {
      showInfo () {
        window.location.href = 'http://localhost:8080/restaurantInfo';
      }
  }
}
</script>
<style>
.footer-style {
  border-radius: 20px;
  bottom: -20px;
  box-shadow: 0px 0px 1px 0px #000808
}
</style>
