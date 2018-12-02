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
              <v-img :src="ownerInfo.profile_img_url"></v-img>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title class="font-use">{{ownerInfo.owner_name}}</v-list-tile-title>
              <v-list-tile-title class="xlarge">{{ownerInfo.store_name}}</v-list-tile-title>
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

    <v-flex xs12 sm12 class="mb-4">
      <!-- 음식점 이름-->
      <h1 class="large">{{ownerInfo.store_name}}</h1>
      <h3 class="xlarge">주문관리</h3>
    </v-flex>

    <!--주문정보-->
    <v-card>
      <v-list>
        <v-list-group
          v-for="(item,index) in orderItems"
          v-model="item.active"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <!--주문자와 가격-->
              <div id="status">
                <div v-if="item.ORDER_STATUS==='수락대기'">
                  <span class="medium mr-2 green--text">{{ item.CUSTOMER_ID }}</span>
                  <span class="medium mr-2">{{item.TOTAL_PRICE}}</span>
                  <span class="medium yellow--text text--darken-3">수락 대기중</span>
                </div>
                <div v-else>
                  <span class="medium mr-2 green--text">{{ item.CUSTOMER_ID }}</span>
                  <span class="medium mr-2">{{item.TOTAL_PRICE}}</span>
                  <span class="medium blue--text">수락 완료</span>
                </div>
              </div>

            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="subItem in item.menu_name">
            <v-list-tile-content>
              <!--주문메뉴-->
              <v-list-tile-title class="medium">{{subItem}}</v-list-tile-title>
              <!--주문시간-->
            </v-list-tile-content>
          </v-list-tile>
          <div class="medium">{{item.reserv_time}}</div>
          <!--주문 수락 거절 버튼-->
          <div>
            <v-btn v-if="item.ORDER_STATUS=='수락대기'" @click="agree(item)" color="blue lighten-2" class="medium font-weight-bold white--text">수락</v-btn>
            <v-btn @click="refuse(item, index)" color="red lighten-2" class="medium font-weight-bold white--text">거절</v-btn>
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
      ownerInfo: JSON.parse(localStorage.getItem('ownerInfo')),

      onOff: false,
      drawer: null,

      ownerInfoPath: '/ownerInfo',
      mainPath: '/ownerHome',
      
      orderItems:[],

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
    }
  },
  mounted() {
    this.getOrders()
  },
  methods: {
    getOrders(){
      this.$axios.get(`http://localhost:3000/api/reservation/owner/${this.ownerInfo.store_code}`)
      .then((r) => {
        
        this.orderItems = r.data
        console.log(this.orderItems)
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    getOnOff(){
      this.$axios.get(`http://localhost:3000/api/store/onOff/${this.ownerInfo.store_code}`)
      .then((r) => {
        console.log(r.data)
        
        this.onOff = r.data
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    putOrderStatus(status, code){
      this.$axios.put(`http://localhost:3000/api/reservation/owner/${this.ownerInfo.store_code}`,{ status: status, code: code })
      .then((r) => {
        console.log(r.data)
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    putOnOff(){
      this.$axios.put(`http://localhost:3000/api/store/onOff/${this.ownerInfo.store_code}`,{ status: this.onOff })
      .then((r) => {
        console.log(r.data)
        //this.orderItems = r.data
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    agree(item){
      item.active= false
      item.ORDER_STATUS= "예약완료"
      alert("확인했습니다")

      this.putOrderStatus(item.ORDER_CODE, 'argee')
    },
    refuse(item, index){
      this.$delete(this.orderItems, index),
      alert("거절했습니다")

      this.putOrderStatus(item.ORDER_CODE, 'refuse')
    },
    logout(){
      alert("로그아웃 되었습니다."),
      this.$router.push('/')
    },
    switchOnOff(){
      if(this.onOff) this.onOff = false
      else this.onOff = true
      
      this.putOnOff()
    }
  }
}
</script>

<style scoped>

</style>
