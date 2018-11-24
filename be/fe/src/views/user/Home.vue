<template>
  <v-container class="pa-1">
    <v-layout>
      <v-flex xs12 sm12>
        <!-- toolbar -->
        <v-toolbar
          app
          dark
          class="angida-gradiation">
          <v-btn icon>
            <v-icon @click="goToPage(mypage)">account_circle</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <span @click="goToMain" class="font-weight-bold caption">음식이 나에게</span>
              </v-flex>
              <v-flex xs8 sm12 class="pl-5">
                <span @click="goToMain" class="font-weight-bold title">안기다</span>
                <span @click="goToMain" class="font-weight-bold caption">린다</span>
              </v-flex>
            </v-layout>
          </v-container>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>

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
        <v-container fluid grid-list-sm class="pa-0 mt-2">
          <v-layout row wrap>
            <v-flex v-for="i in 9" :key="i" xs4>
              <img :src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`" class="image" alt="lorem" width="100%" height="100%">
            </v-flex>
          </v-layout>
        </v-container>

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
                <v-bottom-sheet>
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
                          <!-- <v-img
                            src="https://cdn.vuetifyjs.com/images/toolbar/map.jpg"
                          ></v-img> -->
                          <GmapMap
                            ref="mapRef"
                            :center="{lat:currentLocation.lat, lng:currentLocation.lng}"
                            :zoom="15"
                            options="{disableDefaultUI:true}"
                            map-type-id="terrain"
                            style="width: 550px; height: 300px"
                          >
                            <GmapMarker
                              :key="index"
                              v-for="(m, index) in markers"
                              :position="m.position"
                              :clickable="true"
                              :draggable="true"
                              @click="center=m.position"
                            />
                          </GmapMap>
                        </v-flex>
                      </v-layout>

                      <v-container fluid grid-list-xl text-xs-center class="pa-0">
                        <v-layout align-center justify-center row>
                          <v-flex xs8 sm6 class="px-1">
                            <v-text-field
                              label="위치를 입력하세요"
                              solo
                            ></v-text-field>
                            <v-btn round dark color="red">
                              현재 위치
                            </v-btn>
                          </v-flex>
                          <!-- <v-flex xs4 sm6>

                          </v-flex> -->
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
                              :max="1000"
                              :min="100"
                              :step="10"
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
                    <v-icon color="grey" class="pt-0 ml-0" @click="goToPage(restaurantListPage)">my_location</v-icon>
                  </v-flex>
                  <v-flex xs7 sm6 class="pa-0">
                    <div class="caption text--darken-2">
                      <span>내 위치 : </span>
                      <span>강남역 11번 출구</span>
                    </div>
                  </v-flex>
                  <v-flex xs2 sm6 class="pa-0">
                    <div class="caption text--darken-2">
                      <span>주변 : </span>
                      <span>{{ locationSlider }}</span>
                      <span>m 이내</span>
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
import {gmapApi} from 'vue2-google-maps'
  export default {
    name: 'Home',
    data () {
      return {
        mypage:'http://localhost:8080/mypage',
        restaurantListPage:'http://localhost:8080/restaurantList',
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
        currentLocation: { lat : 37.558196, lng : 127.000131},
        searchAddressInput: '',
        locationSlider: 500
      }
    },
    mounted () {
      this.geolocation();
      // this.$refs.mapRef.$mapPromise.then((map) => {
      //   map.panTo({lat: 1.38, lng: 103.80})
      // })
    },
    computed: {
      google: gmapApi
    },
    methods: {
      geolocation: function () {
        navigator.geolocation.getCurrentPosition((position) => {
          this.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        });
      },
      initMap: function(){//document.getElementById('map')
        // var elementId = this.$ref.el;
        // map = new google.maps.Map(elementId, {
        //   center: {lat: -34.397, lng: 150.644},
        //   zoom: 6
        // });

      },
      handleLocationError : function(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      },
      greet: function (event) {
        // 메소드 안에서 사용하는 `this` 는 Vue 인스턴스를 가리킵니다
        alert('Hello ' + this.name + '!')
        // `event` 는 네이티브 DOM 이벤트입니다
        if (event) {
          alert(event.target.tagName)
        }
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
<style>
.footer-style {
  border-radius: 20px;
  bottom: -20px;
  box-shadow: 0px 0px 1px 0px #000808
}
</style>
