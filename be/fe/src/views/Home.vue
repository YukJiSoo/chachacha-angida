<template>
  <v-container class="pa-0">
    <v-layout>
      <v-flex xs12 sm12>
        <!-- 검색창 -->
        <v-text-field
            solo
            label="어떤 가게를 안을래요?"
            append-icon="place"
            color="deep-orange lighten-1"
            class="mt-3 mb-0 mx-2"
          ></v-text-field>

        <!-- advertisement -->
        <v-subheader class="mt-0 mb-0">이것 좀 봐봐!!</v-subheader>
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

        <!-- category -->
        <v-subheader>뭐 먹으러 갈까~~</v-subheader>
        <v-carousel
          hide-controls
          hide-delimiters
          app
          :cycle = "false"
          height="300"
        >
          <v-carousel-item
            v-for="(item,i) in ad_items"
            :key="i"
            :src="item.src"
            class="mx-1"
          ></v-carousel-item>
        </v-carousel>

        <!-- hot place -->
        <v-subheader>많이 안긴 식당!</v-subheader>
        <v-container class="pa-0">
          <v-layout row>
            <v-flex xs12 sm4>
              <v-hover v-for="n in 3" class="mb-2">
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-img
                    :aspect-ratio="16/9"
                    src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                  ></v-img>
                  <v-card-title>
                    <div>
                      <span class="headline">토끼정 강남점</span>
                      <div class="d-flex">
                        <v-rating
                          :value="4.5"
                          :full-icon="favorite"
                          color="amber"
                          dense
                          half-increments
                          readonly
                          size="14"
                        ></v-rating>
                        <div class="ml-2 grey--text text--darken-2">
                          <span>4.5</span>
                          <span>(413)</span>
                        </div>
                      </div>
                    </div>
                    <div class="ml-5 grey--text text--darken-2">
                      <v-btn color="deep-orange lighten-1">안아주기</v-btn>
                    </div>
                  </v-card-title>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-container
        >
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
