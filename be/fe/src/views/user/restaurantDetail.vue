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
            <v-icon color="white" @click="$goBack()">keyboard_arrow_left</v-icon>
          </v-btn>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <span class="font-weight-bold subheading">{{storeInfo.store_name}}</span>
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
                :src="`${storeInfo.profile_img_url}`"
              >
              </v-img>
            </v-flex>
            <!-- 이름 -->
            <v-flex xs12 sm12 class="pt-4 pl-2 pb-0">
              <div class="font-use font-weight-bold" style="font-size:50px">
                <span>{{storeInfo.store_name}}</span>
              </div>
            </v-flex>
            <!-- 간단한 설명 -->
            <v-flex xs12 sm12 class="pl-4 pt-3 pr-4">
              <div class="medium grey--text text--darken-2">
                <span>{{storeInfo.store_desc}} </span>
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
                  <div class="font-use font-weight-bold red--text text-xs-center" style="font-size:40px">
                    <span>{{storeInfo.total_rate}}</span>
                  </div>
                </v-flex>
                <!-- 점수 -->
                <v-flex xs12 sm12 class="pa-0">
                  <v-rating
                    v-model="storeInfo.total_rate"
                    background-color="yellow darken-3"
                    color="yellow darken-3"
                    small
                    readonly="true"
                  ></v-rating>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-divider vertical class="ma-0 pa-0"></v-divider>
            <!-- 리뷰 -->
            <v-flex xs5.5 sm12 class="pa-0">
              <router-link :to="reviewPath" class="text--decoration-none">
              <v-layout column wrap align-center>
                <!-- 리뷰-제목 -->
                <v-flex xs12 sm12 class="pa-0">
                  <div class="medium text-xs-center black--text">
                    <span>리뷰보기</span>
                  </div>
                </v-flex>
                <!-- 리뷰개수 -->
                <v-flex xs12 sm12 class="pa-0">
                  <div class="font-use font-weight-bold red--text text-xs-center" style="font-size:50px">
                    <span>{{storeInfo.review_num}}</span>
                  </div>
                </v-flex>
              </v-layout>
              </router-link>
            </v-flex>
          </v-layout>
          <v-divider class="mt-2"></v-divider>

          <!-- 4행 주소, 전화번호 -->
          <v-flex xs12 sm12 class="pl-4 pt-3 pr-4 pb-2">
            <div class="small grey--text text--darken-2">
              <span>주소 : </span><span>{{storeInfo.address}}</span>
            </div>
            <div class="small grey--text text--darken-2">
              <span>전화번호 : </span><span>{{storeInfo.phone_no}}</span>
            </div>
          </v-flex>
          <v-divider class="mt-2"></v-divider>

          <!-- 5행 메뉴종류 -->
          <v-layout row wrap class="mt-2">
            <v-flex v-for="menu in menuItems" xs6 class="pa-1">
              <v-card @click="menuDialog = true">
                <v-img
                  :src="`${menu.menu_img_url}`"
                  aspect-ratio="1"
                >
                <!-- 메뉴이름 -->
                </v-img>
                <v-card-text class="pa-1">
                  <v-layout align-center justify-space-between column>
                    <v-flex xs12 class="pt-1 pb-0">
                      <div class="py-0 medium font-weight-bold">{{menu.menu_name}}</div>
                    </v-flex>
                    <v-flex xs12 class="pt-0 pb-1">
                      <div class="py-0 small mx-5 body-1">{{menu.menu_price}}</div>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
              <v-dialog
                v-model="menuDialog"
                max-width="290"
              >
                <v-card>
                  <v-card-title class="large">{{menu.menu_name}}</v-card-title>
                  <v-img
                    :src="`${menu.menu_img_url}`"
                    aspect-ratio="1"
                    width="100%"
                    height="100%"
                  >
                  </v-img>
                  <v-card-text class="medium">
                    {{menu.menu_desc}}
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      color="orange darken-1"
                      flat="flat"
                      @click="menuDialog = false"
                      class="font-use"
                    >
                      닫기
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
              class="large white--text px-5"
              large
              @click="toReservation"
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
      store_code: '',
      storeInfo:{},
      menuItems: [],

      reservationPath: {
        path: '/reservation',
        query: {
          store_code:'',
          name:''
        }
      },
      reviewPath: {
        path: '/review',
        query: {
          store_code:'',
          store_name:''
        }
      },

      menuDialog: false
    }
  },
  mounted() {
    this.store_code = this.$route.query.store_code
    console.log("passed store_code:", this.store_code);
    this.getStore()
    this.getMenu()
    this.reservationPath.query.store_code = this.store_code
  },
  methods: {
    // 서버에서 가게정보 받아옴
    getStore () {
      var data = {};
      data.store_code = this.store_code;
      this.$axios.get(`http://localhost:3000/api/store`, {
        params: data
      })
      .then((r) => {
        console.log(r.data)
        this.storeInfo = r.data
        this.reviewPath.query.store_code = this.store_code
        this.reviewPath.query.store_name = this.storeInfo.store_name
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    // 메뉴 정보 받아오기
    getMenu () {
      var data = {};
      data.store_code = this.store_code;
      this.$axios.get(`http://localhost:3000/api/menu`, {
        params: data
      })
      .then((r) => {
        console.log(r.data)
        this.menuItems = r.data
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    toReservation(){
      this.$router.push({
        path: '/reservation',
        query: {
          store_code:this.store_code,
          store_name:this.storeInfo.store_name
        }
      })
    }
  }
}
</script>
