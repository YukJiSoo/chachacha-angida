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
      <v-list>
        <v-list-tile avatar :to="ownerInfoPath">
          <v-list-tile-avatar>
            <v-img :src='info.avatar'></v-img>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title class="font-use">{{info.ownerName}}</v-list-tile-title>
            <v-list-tile-title class="xlarge">{{info.restaurantName}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-btn color="orange" class="font-weight-bold white--text" @click="logout">로그아웃</v-btn>
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

        <v-flex xs12 sm12>
          <!-- 음식점 이름-->
          <h1 class="large">{{info.restaurantName}}</h1>
          <h3 class="xlarge">매출관리</h3>
        </v-flex>
    </v-layout>
  <!--주문정보-->
  <v-card>
    <v-list>
      <v-layout justify-center>
      <v-subheader class="xlarge">당일 총 매출:{{totalcost}}원
      </v-subheader>
      </v-layout>
      <v-divider></v-divider>
        <!--달력-->
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        lazy
        width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="date"
          label="날짜를 선택하세요"
          readonly
          prepend-icon="event"
          class ="medium"
        ></v-text-field>
        <v-date-picker v-model="date" scrollable color="orange">
          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
        <!--달력 끝-->
     <v-list-group
       v-for="item in items"
       v-model="item.active"
       :key="item.title"
       no-action
     >
       <v-list-tile slot="activator">
         <v-list-tile-content>
           <!--주문자와 가격-->
           <v-list-tile-title class="xlarge">{{ item.title }}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{item.cost}}원</v-list-tile-title>
         </v-list-tile-content>
       </v-list-tile>
       <v-list-tile
         v-for="subItem in item.items"
         :key="subItem.title"
       >
         <v-list-tile-content>
           <!--주문메뉴-->
           <v-list-tile-title class="medium">{{ subItem.menu }}</v-list-tile-title>
           <!--주문시간-->
           <v-list-tile-subtitle class="medium">{{subItem.time}}</v-list-tile-subtitle>
         </v-list-tile-content>

       </v-list-tile>
     </v-list-group>
   </v-list>
      </v-card>

  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ownerSaleManage',
  data () {
    return {
      drawer: null,
      totalcost: 0,
      sheet: false,
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      ownerInfoPath: '/ownerInfo',
      mainPath: '/ownerHome',
      userCode: localStorage.getItem('code'),
      info:{
        role: 'owner',
        ownerName: '차민형',
        ID: 'mpsmhck95@naver.com',
        phone: '01087215502',
        sex: 'man',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        restaurantName: '도스마스 동대점',
        restaurantNumber: '01012345678',
        restaurantImage: 'http://ldb.phinf.naver.net/20170710_37/1499665631160zFj1G_JPEG/8.jpg',
        restaurantLocation: '동대입구 앞'
      },
      items:[

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
    sum(){
      for(item in this.items) {
        this.totalcost += item.cost;
      }
    },
    getSaleList(){
      axios.get('http://localhost:3000/api/owner/salemanage/${this.userCode}`')
      .then((r) => {
        this.items = r.data.sale_list
        console.log(r)
      })
      .catch((e) => {
        console.error(e.message)
      })
    }
  },
  mounted() {
    this.getSaleList()
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
