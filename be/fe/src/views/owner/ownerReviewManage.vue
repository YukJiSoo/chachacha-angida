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
          <h3>리뷰관리</h3>
        </v-flex>
        <!--menu list-->
        <v-layout row>


          <div>
   <v-expansion-panel
     expand
   >
     <v-expansion-panel-content
       v-for="item in items"
       :key="item"
     >
       <div slot="header"><h2>{{item.title}}</h2></div>
       <v-card>
         <h3>&nbsp;&nbsp;&nbsp;&nbsp;ID: {{item.ID}} &nbsp;&nbsp;&nbsp;&nbsp;
           <v-icon
            color="red"
            @click="report">block</v-icon></h3>
         <v-card-text class="grey lighten-3">{{item.subtitle}}</v-card-text>
       </v-card>
     </v-expansion-panel-content>
   </v-expansion-panel>
 </div>
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
            ID: '차민형',
            title: '맛있다',
            subtitle: "맛있다"
          },
          {
            ID: '박준서',
            title: '맛없다',
            subtitle: "맛없다"
          },
          {
            ID: '육지수',
            title: '걍그럼',
            subtitle: "걍그럼"
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
    logout(){
      alert("로그아웃 되었습니다."),
      this.$router.push('/')
    },
    report(){
      alert("신고되었습니다.")
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
