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
          <v-list-tile avatar @click="goPage(ownerInfoPath)">
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
            <v-list-tile @click="goPage(menuItem.path)">
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
              <v-flex xs12 sm12 class="pb-0" @click="goPage(mainPath)">
                <span class="small white--text">음식이 나에게</span>
              </v-flex>
              <v-flex xs8 sm12 class="pt-0 pl-5" @click="goPage(mainPath)">
                <span class="xlarge white--text">안기다</span>
                <span class="small white--text">린다</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
        <!-- toolbar end-->
      </v-flex>
    </v-layout>

    <div v-if="onOff == 'ON'">
      <v-flex xs12 sm12 class="mb-3">
        <!-- 음식점 이름-->
        <h1 class="large">{{ownerInfo.store_name}}</h1>
        <h3 class="xlarge">현재 주문상태</h3>
      </v-flex>
      
      
      <div v-if="progress" class="mt-4 pt-5">
        <v-progress-circular
          :size="150"
          :width="20"
          color="orange"
          indeterminate
        ></v-progress-circular>
        <div class="xlarge mt-5">예약정보를 불러오는 중입니다...</div>
      </div>

      <div v-if="!progress" class="mb-3">
        <div class="medium pr-2">{{date}}</div>
        <span class="medium pr-2">예약정보가 계속해서 업데이트중 입니다 </span>
        <v-progress-circular
          :size="20"
          :width="3"
          color="blue"
          indeterminate
        ></v-progress-circular>
      </div>
      <!--주문정보-->
      <v-card v-if="!progress">
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
                    <span class="medium mr-2 purple--text">{{item.RESERV_TIME.substring(11,16)}}</span>
                    <span class="medium mr-2">{{item.TOTAL_PRICE}}원</span>
                    <span class="medium yellow--text text--darken-3">{{item.ORDER_STATUS}}</span>
                  </div>
                  <div v-else>
                    <span class="medium mr-2 purple--text">{{item.RESERV_TIME.substring(11,16)}}</span>
                    <span class="medium mr-2">{{item.TOTAL_PRICE}}원</span>
                    <span class="medium blue--text">{{item.ORDER_STATUS}}</span>
                  </div>
                </div>
              </v-list-tile-content>
            </v-list-tile>
            <div v-for="menu in item.menu_name" class="medium py-1">
              <v-icon>restaurant_menu</v-icon>
              {{ menu }}
            </div>
            <div class="medium">주문자 : {{ item.CUSTOMER_ID }}</div>
            <!--주문 수락 거절 버튼-->
            <div>
              <v-btn v-if="item.ORDER_STATUS=='수락대기'" @click="agree(item)" color="blue lighten-2" class="medium font-weight-bold white--text">수락</v-btn>
              <v-btn @click="refuse(item, index)" color="red lighten-2" class="medium font-weight-bold white--text">거절</v-btn>
            </div>
            
          </v-list-group>
        </v-list>
      </v-card>
    </div>
    <div v-else>
      <div class="large">알림 기능이 꺼져있습니다</div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'default',
  data () {
    return {
      ownerInfo: JSON.parse(localStorage.getItem('ownerInfo')),
      date: new Date().toISOString().substr(0, 10),

      progress: true,
      onOff: localStorage.getItem('onOff'),
      drawer: null,

      ownerInfoPath: '/ownerInfo',
      mainPath: '/ownerHome',
      
      orderItems:[],

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
      ],
      updateOrder: '',
    }
  },
  mounted() {
    if(this.onOff == 'ON'){
      this.getOrders()
      this.updateOrder = setInterval(this.getOrders, 3000)
    }
    
  },
  methods: {
    getOrders(){
      this.$axios.get(`http://localhost:3000/api/reservation/owner/${this.ownerInfo.store_code}`)
      .then((r) => {
        
        this.orderItems = r.data
        this.progress = false
        console.log(this.orderItems)
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    putOrderStatus(code, status){
      this.$axios.put(`http://localhost:3000/api/reservation/owner/${code}`,{ status: status })
      .then((r) => {
        console.log(r.data)
        this.progress = true
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    agree(item){
      
      item.active = false
      item.ORDER_STATUS = "예약완료"
      alert(item.ORDER_STATUS)
      this.putOrderStatus(item.ORDER_CODE, 'agree')
    },
    refuse(item, index){
      this.$delete(this.orderItems, index),
      alert("거절했습니다")

      this.putOrderStatus(item.ORDER_CODE, 'refuse')
    },
    logout(){
      clearInterval(this.getOrders);
      alert("로그아웃 되었습니다."),
      this.$router.push('/')
    },
    switchOnOff(){
      if(this.onOff) this.onOff = false
      else this.onOff = true
      
      this.putOnOff()
    },
    goPage(goPath){

      clearInterval(this.updateOrder);
      this.$router.push({
        path:goPath
      })
    }
  }
}
</script>

<style scoped>

</style>
