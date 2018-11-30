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
                <span class="font-weight-bold subheading">토끼정</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>

        <!-- 음식점 List -->
        <v-flex v-for="store in storeItems" xs12 class="pt-2">
          <router-link :to="store.detailPath" class="text--decoration-none">
            <v-layout row wrap align-center>
              <!-- 왼쪽-사진 -->
              <v-flex xs5 sm12 class="pa-0 black">
                <v-img
                  :src="`${store.img}`"
                >
                </v-img>
              </v-flex>
              <!-- 오른쪽 -->
              <v-flex xs7 sm12 class="pl-2">
                <v-layout row wrap>
                  <!-- 이름 -->
                  <v-flex xs12 sm12 class="pt-0 pb-0">
                    <div class="xlarge font-weight-bold black--text">
                      <span>{{store.name}}</span>
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
                          <span>{{store.star}}</span>
                        </div>
                      </v-flex>
                      <!-- 위치 -->
                      <v-flex xs6 sm12 class="pa-0">
                        <div class="medium grey--text text--darken-2 font-weight-bold">
                          <span>약 300m</span>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <!-- 2행 -->
                  <v-flex xs12 sm12 class="pt-0 pb-1">
                    <v-layout align-center justify-center row fill-height >
                      <!-- 자리현황-제목 -->
                      <v-flex xs6 sm12 class="pa-0">
                        <div class="medium grey--text text--darken-1">
                          <span>자리현황</span>
                        </div>
                      </v-flex>
                      <!-- 자리현황-내용 -->
                      <v-flex xs6 sm12 class="pa-0">
                        <div v-if="store.onOff" class="medium">
                          <span class="green--text">{{store.nowSeat}}</span><span> / </span><span>{{store.limitSeat}}</span><span>석</span>
                        </div>
                        <div v-else class="medium">
                          <span class="red--text">준비중</span>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <!-- 3행 -->
                  <v-flex xs12 sm12 class="pt-0 pb-1">
                    <v-layout align-center justify-center row fill-height>
                      <!-- 태그들 -->
                      <v-flex v-for="tag in store.tags" xs4 sm12 class="pa-0">
                        <div class="medium pink--text text--lighten-3">
                          <span>{{tag}}</span>
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
      category:'',
      lat:0,
      lng:0,
      keyword:'',
      locationLimit:'',
      mainPath:'/home',
      storeItems: [],

    }
  },
    mounted() {
      this.category = this.$route.query.category
      this.lat = this.$route.query.lat
      this.lng = this.$route.query.lng
      this.keyword = this.$route.query.keyword
      this.locationLimit = this.$route.query.locationLimit
      
      this.getStores()
      
    },
  methods: {
    getStores () {
      this.$axios.get('http://localhost:3000/api/store/list',{
        category: this.category,
        lat: this.lat,
        lng: this.lng,
        keyword: this.keyword,
        locationLimit: this.locationLimit,
      })
      .then((r) => {
        console.log(r.data)
        this.storeItems = r.data
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