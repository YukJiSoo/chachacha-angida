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
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ownerName}}</v-list-tile-title>
            <v-list-tile-title>{{restaurantName}}</v-list-tile-title>
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
        <v-flex xs12 sm12 class="mb-3">
          <!-- 음식점 이름-->
          <h1>
          {{restaurantName}}</h1>
          <h3>메뉴관리</h3>
        </v-flex>
        <!--menu list-->
        <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line>
          <!--메뉴등록 버튼-->
          <v-btn color="orange" class="font-weight-bold title" @click="editMenu">메뉴 등록</v-btn>
          <template v-for="item in items">
            <v-divider></v-divider>
              <img :src="item.avatar"
              class="mt-3 ">
            <v-list-tile
              @click=""
            >
            <!--메뉴 이미지-->


              <v-list-tile-content>
                <!--메뉴이름-->
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <!--메뉴설명-->
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                <!--메뉴가격-->
                <h4>{{item.cost}}원</h4>
              </v-list-tile-content>
            </v-list-tile>
            <!--메뉴 수정 버튼-->
            <v-btn color="blue" class="font-weight-bold" @click="editMenu">수정</v-btn>
            <!--메뉴 삭제 버튼-->
            <v-btn color="red" class="font-weight-bold" @click="deleteMenu">삭제</v-btn>

          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'ownerMenuManage',
  data () {
    return {
      restaurantName: '도스마스 동대점',
      ownerName: '차민형',
      drawer: null,
      ownerInfoPath: '/ownerInfo',
      mainPath: '/ownerHome',
      items: [
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Brunch this weekend?',
            subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
            cost: '10000'
          },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'Summer BBQ <span class="grey--text text--lighten-1"></span>',
            subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
            cost: '11000'
          },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Oui oui',
            subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
            cost: '12000'
          }
        ],
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
    deleteMenu(){
      alert("삭제되었습니다.")
    },
    editMenu(){
      this.$router.push('/menuEdit')
    },
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
