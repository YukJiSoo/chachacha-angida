<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout>
      <!--네비게이션-->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
    <!--사용자 정보-->
      <v-list class="pa-1">
        <v-list-tile avatar :to="ownerInfoPath">
          <v-list-tile-avatar>
            <img :src='info.avatar'>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{info.ownerName}}</v-list-tile-title>
            <v-list-tile-title>{{info.restaurantName}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-btn color="orange" class="font-weight-bold" @click="logout">로그아웃</v-btn>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <!--한칸-->
        <div v-for="menuItem in menuItems">
          <v-list-tile :to="menuItem.path">
            <v-list-tile-content>
              <v-list-tile-title>{{menuItem.title}}</v-list-tile-title>
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
              <v-flex xs12 sm12>
                <router-link :to="mainPath" class="text-decoration-none">
                  <span class="font-weight-bold caption white--text">음식이 나에게</span>
                </router-link>
              </v-flex>
              <v-flex xs8 sm12 class="pl-5">
                <router-link :to="mainPath" class="text-decoration-none">
                  <span class="font-weight-bold title white--text">안기다</span>
                  <span class="font-weight-bold caption white--text">린다</span>
                </router-link>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
        <!-- toolbar end-->
        </v-flex>
    </v-layout>
    <v-layout v-layout align-center justify-center row wrap fill-height>
      <v-flex sm12 sm12>   <h1>음식점을 등록해주세요</h1>
          </v-flex>
          <v-flex sm12 sm12>
  <v-btn color="orange" class="font-weight-bold" @click="goToInfoEdit">음식점 등록하기</v-btn></v-flex></v-layout>

  </v-container>
</template>

<script>
export default {
  name: 'ownerDefault',
  image: 'https://randomuser.me/api/portraits/men/85.jpg',
  data () {
    return {
      drawer: null,
      ownerInfoPath: '/ownerInfo',
      mainPath: '/ownerHome',
      info:{
        role: 'owner',
        ownerName: '차민형',
        ID: 'mpsmhck95@naver.com',
        phone: '01087215502',
        sex: 'man',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        restaurantName: '도스마스 동대점',
        restaurantNumber: '01012345678',
        restaurantImage: 'http://ldb.phinf.naver.net/20170710_37/1499665631160zFj1G_JPEG/8.jpg'
      },
      menuItems: [
        {
          title: '주문관리',
          path: '/ownerHome',
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
  methods: {
    logout(){
      alert("로그아웃 되었습니다."),
      this.$router.push('/')
    },
    goToInfoEdit(){
      this.$router.push('/ownerInfoEdit')
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
