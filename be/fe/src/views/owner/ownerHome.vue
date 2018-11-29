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
              <v-img :src="info.img"></v-img>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title class="font-use">{{info.ownerName}}</v-list-tile-title>
              <v-list-tile-title class="xlarge">{{info.restaurantName}}</v-list-tile-title>
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

    <v-flex xs12 sm12>
      <!-- 음식점 이름-->
      <h1 class="large">{{info.restaurantName}}</h1>
      <h3 class="xlarge">주문관리</h3>
    </v-flex>
    <!-- system on/off-->
    <v-layout align-center justify-end fill-height>
      <span class="medium">system 사용</span>
      <v-flex xs2 sm2>
        <v-switch></v-switch>
      </v-flex>
    </v-layout>

    <!--주문정보-->
    <v-card>
      <v-list>
        <v-list-group
          v-for="(item,index) in orderItems"
          v-model="item.active"
          :key="item.title"
          no-action
        >
          <v-list-tile slot="activator" v-model="item.tile">
            <v-list-tile-content>
              <!--주문자와 가격-->
              <div id="status">
                <div v-if="item.status===false">
                  <v-list-tile-title class="medium">{{ item.title }}&nbsp&nbsp&nbsp&nbsp{{item.cost}}&nbsp&nbsp&nbsp&nbsp
                    수락 대기중</v-list-tile-title>
                </div>
                <div v-else>
                  <v-list-tile-title class="medium">{{ item.title }}&nbsp&nbsp&nbsp&nbsp{{item.cost}}&nbsp&nbsp&nbsp&nbsp
                    수락 완료</v-list-tile-title>
                </div>
              </div>

            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="subItem in item.items"
          >
            <v-list-tile-content>
              <!--주문메뉴-->
              <v-list-tile-title class="medium">{{ subItem.menu }}</v-list-tile-title>
              <!--주문시간-->
              <v-list-tile-title class="medium">{{subItem.time}}</v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
          <!--주문 수락 거절 버튼-->
          <div>
            <v-btn v-if="item.status===false" @click="agree(item)" color="blue lighten-2" class="medium font-weight-bold white--text">수락</v-btn>
            <v-btn @click="refuse(index)" color="red lighten-2" class="medium font-weight-bold white--text">거절</v-btn>
          </div>
          
        </v-list-group>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'default',
  data () {
    return {
      ownerCode: localStorage.getItem('code'),
      info:{
        // 필요한 정보
        // ownerName: '차민형',
        // img: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        // restaurantName: '도스마스 동대점',
      },

      switch1: true,
      drawer: null,

      ownerInfoPath: '/ownerInfo',
      mainPath: '/ownerHome',

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
      ],
      orderItems:[
          // {
          //   title: '주문자1',
          //   cost: '10000원',
          //   active: true,
          //   status: false,
          //   items: [
          //     { menu: '음식1, 음식2, 음식3' },
          //     { time: '오전 1시 10분' }
          //   ]
          // },
          // {
          //   title: '주문자2',
          //   cost: '10000원',
          //   active: true,
          //   status: false,
          //   items: [

          //     { menu: '음식1, 음식2, 음식3' },
          //     { time: '오전 1시 10분' }
          //   ]
          // },{
          //   title: '주문자3',
          //   cost: '10000원',
          //   active: true,
          //   status: false,
          //   items: [

          //     { menu: '음식1, 음식2, 음식3' },
          //     { time: '오전 1시 10분' }
          //   ]
          // },{
          //   title: '주문자4',
          //   cost: '10000원',
          //   active: true,
          //   status: false,
          //   items: [

          //     { menu: '음식1, 음식2, 음식3' },
          //     { time: '오전 1시 10분' }
          //   ]
          // }
      ]
    }
  },
  mounted() {
    this.getUserInfo()
    this.getOrders()
  },
  methods: {
    getUserInfo(){
      this.$axios.get('http://localhost:3000/api/user/owner',{
        code: this.ownerCode
      })
      .then((r) => {
        console.log(r.data)
        this.info = r.data
        console.log(this.info)
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    getOrders(){
      this.$axios.get('http://localhost:3000/api/reservation/owner/wait',{
        code: this.ownerCode
      })
      .then((r) => {
        console.log(r.data)
        
        // for(var i=0; i<r.data.length; i++)
        // this.orderItems.push(r.data[i])
        this.orderItems = r.data.orderItems
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    agree(item){
      item.active=false,
      item.status= true,
      alert("확인했습니다")

    },
    refuse(index){
      this.$delete(this.orderItems, index),
      alert("거절했습니다")
    },
    logout(){
      alert("로그아웃 되었습니다."),
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
