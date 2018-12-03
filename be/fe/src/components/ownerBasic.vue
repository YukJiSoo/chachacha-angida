<template>
  <v-container grid-list-md text-xs-center align-center class="pa-0">
    <v-layout>
        <!--네비게이션-->
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
      <!--사용자 정보-->
        <v-list>
          <v-list-tile avatar :to="ownerInfoPath">
            <v-list-tile-avatar>
              <v-img :src="ownerInfo.profile_img_url"></v-img>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title class="font-use black--text">{{ownerInfo.owner_name}}</v-list-tile-title>
              <v-list-tile-title class="xlarge black--text">{{ownerInfo.store_name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-btn color="orange" class="font-use font-weight-bold white--text" @click="logout">로그아웃</v-btn>
        </v-list>
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <!--한칸-->
          <div v-for="menuItem in menuItems">
            <v-list-tile :to="menuItem.path">
              <v-list-tile-content>
                <v-list-tile-title class="medium">{{menuItem.title}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
          </div>
          <!--끝-->
        </v-list>
      </v-navigation-drawer>
      <!--네비게이션 끝-->
    </v-layout>
    <v-layout row wrap class="mb-0">
      <v-flex xs12 sm12>
        <!-- toolbar -->
        <v-toolbar
          app
          dark
          class="angida-gradiation">
          <v-icon
          @click.stop="drawer = !drawer"
          >list</v-icon>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12 class="pb-0">
                <router-link :to="mainPath" class="text--decoration-none">
                  <span class="small white--text">음식이 나에게</span>
                </router-link>
              </v-flex>
              <v-flex xs8 sm12 class="pt-0 pl-5">
                <router-link :to="mainPath" class="text--decoration-none">
                  <span class="xlarge white--text">안기다</span>
                  <span class="small white--text">린다</span>
                </router-link>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
        <!-- toolbar end-->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'ownerInfo',
  data () {
    return {
      ownerInfo: JSON.parse(localStorage.getItem('ownerInfo')),

      drawer: null,
      mainPath: '/ownerHome',
      ownerInfoPath: '/ownerInfo',
      
      menuItems: [
        {
          title: '주문관리',
          path: '/ownerOrderManage',
        },
        {
          title: '매출관리',
          path: '/ownerSalemanage',
        },
        {
          title: '메뉴관리',
          path: '/ownerMenuManage',
        },
        {
          title: '리뷰관리',
          path: '/ownerReviewManage',
        },
        {
          title: '환경설정',
          path: '/ownerSetting',
        }
      ]
    }
  },
  mounted() {
    console.log(this.ownerInfo)
    clearInterval(this.updateOrder)
  },
  methods: {
    logout(){
      alert("로그아웃 되었습니다."),
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.angida-gradiation{
   background: #fc8e53;
   background: -moz-linear-gradient(left, #fc8e53 0%, #f17432 0%, #fc8e53 0%, #fc8e53 17%, #ea5507 55%, #f70000 100%);
   background: -webkit-linear-gradient(left, #fc8e53 0%,#f17432 0%,#fc8e53 0%,#fc8e53 17%,#ea5507 55%,#f70000 100%);
   background: linear-gradient(to right, #fc8e53 0%,#f17432 0%,#fc8e53 0%,#fc8e53 17%,#ea5507 55%,#f70000 100%);
   filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fc8e53', endColorstr='#f70000',GradientType=1 );
}
</style>
