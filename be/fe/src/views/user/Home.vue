<template>
  <v-container class="pa-1">
    <v-layout>
      <v-flex xs12 sm12>
        <!-- toolbar -->
        <v-toolbar
          app
          dark
          class="angida-gradiation">
          <v-btn icon :to="myPagePath">
            <v-icon>account_circle</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12 class="pt-1">
                <span class=" small">음식이 나에게</span>
              </v-flex>
              <v-flex xs8 sm12 class="pl-5">
                <span class="xlarge">안기다</span>
                <span class=" small">린다</span>
              </v-flex>
            </v-layout>
          </v-container>
          <v-spacer></v-spacer>
          <v-btn icon v-on:click="isHidden = !isHidden" >
            <v-icon>search</v-icon>
          </v-btn>

          <v-toolbar
            dense
            absolute
            v-if="!isHidden"
            class="deep-orange accent-3"
          >
            <v-btn icon  v-on:click="isHidden = !isHidden" >
              <v-icon>keyboard_arrow_up</v-icon>
            </v-btn>
            <v-text-field
              single-line
            >{{ searchWord }}</v-text-field>
            <v-btn icon @click="keywordSearch">
              <v-icon>search</v-icon>
            </v-btn>
          </v-toolbar>
        </v-toolbar>

        <!-- advertisement -->
        <v-carousel
          hide-delimiters
          app
          height="30%"
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
            <v-flex v-for="menuCategory in menuCategoryList" xs4>
              <!-- <router-link :to="restaurantListPath">
                <img
                  :src="`${menuCategory.url}`" :data-menu-name="`${menuCategory.name}`"
                  class="image" alt="lorem" width="100%" height="100%"
                  @click="categorySearch(menuCategory.name)"
                  >
              </router-link> -->
              <img
                :src="`${menuCategory.url}`" :data-menu-name="`${menuCategory.name}`"
                class="image" alt="lorem" width="100%" height="100%"
                @click="categorySearch(menuCategory.name)">
              <!-- <img :src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`" class="image" alt="lorem" width="100%" height="100%"> -->
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
            <v-layout align-center justify-center column fill-height class="medium">
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
                          <div class="grey--text small text--darken-2">장소설정</div>
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
                            <v-btn round dark color="red" @click="locationSearch()" class="medium">
                              현 위치로 주소 설정
                            </v-btn>
                          </v-flex>
                          <!-- <v-flex xs4 sm6>

                          </v-flex> -->
                        </v-layout>
                      </v-container>

                      <v-container fluid grid-list-lg class="pa-0">
                        <v-layout row wrap>
                          <v-flex xs12 class="px-3 py-0">
                            <v-subheader class="mt-1 pb-4 px-0 black--text medium">검색반경</v-subheader>
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

              <v-container grid-list-xl flex class="pt-2">
                <v-layout align-center justify-center row fill-height>
                  <v-flex xs7 sm6 class="pa-0">
                    <div class="caption text--darken-2">
                      <span>내 위치 : </span>
                      <span>{{ currentLoadName }}</span>
                    </div>
                  </v-flex>
                  <v-flex xs4 sm6 class="pa-0">
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
import Vue from 'vue'
import axios from 'axios'
  export default {
    name: 'Home',
    data () {
      return {
        myPagePath: {
          path: '/mypage'
        },
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
        locationSlider: 500,
        currentLoadName: '',
        isHidden: true,
        searchWord:'',
        menuCategoryList:{
          category1:{
            name: 'all',
            url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/menucategory%2Fall.PNG?alt=media&token=53c537f8-caa2-499b-bab3-569cc54e4bbe',
          },
          category2:{
            name: 'korea',
            url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/menucategory%2Fkorea.PNG?alt=media&token=eb829e31-3c5a-46b1-a9fa-64e057b5bf06',
          },
          category3:{
            name: 'chicken',
            url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/menucategory%2Fchicken.PNG?alt=media&token=10fe4622-8eaf-45b4-843a-0407af27f585',
          },
          category4:{
            name: 'china',
            url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/menucategory%2Fchina.PNG?alt=media&token=4d02ddf2-2b52-4c0c-a8a3-a4da091f23d4',
          },
          category5:{
            name: 'japanese',
            url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/menucategory%2Fjapan.PNG?alt=media&token=2c3e231e-e2cb-47f3-b727-9c2febc8f913',
          },
          category6:{
            name: 'western',
            url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/menucategory%2Fwestern.PNG?alt=media&token=dc96e7cb-414d-4c58-86eb-129404d3121e',
          },
          category7:{
            name: 'bossam',
            url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/menucategory%2Fbossam.PNG?alt=media&token=4661f42e-55a3-406a-85fb-6e4a43483456',
          },
          category8:{
            name: 'bunsik',
            url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/menucategory%2Fbunsik.PNG?alt=media&token=22da5759-c347-4b18-8c2c-aed5c44c6712',
          },
          category9:{
            name: 'cafe',
            url: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/menucategory%2Fcafe.PNG?alt=media&token=9a34a1d8-d905-4c20-8306-96c2c708cfee',
          }
        }
      }
    },
    mounted () {
      // this.geolocation();
      this.$refs.mapRef.$mapPromise.then((map) => {
        // map.panTo({lat: 1.38, lng: 103.80})
        // Vue.$geocoder.setDefaultCountryCode('KR');
        // Vue.$geocoder.setDefaultMode('lat-lng');    // this is default
        // var latLngObj = {
        //     lat: this.currentLocation.lat,
        //     lng: this.currentLocation.lng
        // }
        // Vue.$geocoder.send(latLngObj, response => { console.log(response) });

        // 좌표 -> 도로명 변환
        axios.post('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.currentLocation.lat + ',' + this.currentLocation.lng + '&key=AIzaSyBXFrZJqgTE4OSbcv_ewXkpHro-P9dfg80')
          .then(response => {
            console.log(response.data.results[0].formatted_address.slice(5));
            this.currentLoadName = response.data.results[0].formatted_address.slice(5);
            this.currentLoadName = this.currentLoadName.slice(0,2) + this.currentLoadName.slice(5)
          })
          .catch(e => {
            this.errors.push(e)
          })
      })

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
      keywordSearch() { // 키워드 기반 검색
        this.$router.push({path: '/restaurantList', query: {
          keyword: this.searchWord,
          locationLimit: this.locationSlider, // 반경
          lat: this.currentLocation.lat,
          lng: this.currentLocation.lng
        }});
      },
      categorySearch(categoryName) { // 카테고리 기반 검색
        this.$router.push({path: '/restaurantList', query: {
          category: categoryName,
          locationLimit: this.locationSlider,
          lat: this.currentLocation.lat,
          lng: this.currentLocation.lng
        }});
      },
      locationSearch() { // 위치 기반 검색
        this.$router.push({path: '/restaurantList', query: {
          locationLimit: this.locationSlider,
          lat: this.currentLocation.lat,
          lng: this.currentLocation.lng
        }});
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
