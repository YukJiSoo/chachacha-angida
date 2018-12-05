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

    <v-flex xs12 sm12 class="mb-3">
      <!-- 음식점 이름-->
      <h1 class="large">{{ownerInfo.store_name}}</h1>
      <h3 class="xlarge">주문관리</h3>
    </v-flex>

    <div v-if="progress" class="mt-4 pt-5">
      <v-progress-circular
        :size="150"
        :width="20"
        color="orange"
        indeterminate
      ></v-progress-circular>
    </div>

    <!-- 주문정보-->
    <v-card v-if="!progress">
      <v-list>
        <v-list-group
          v-for="(item,index) in orderItems"
          v-model="item.active"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content v-if="index === (orderItems.length-1)">
              <div class="medium align-center">더보기</div>
            </v-list-tile-content>
            <v-list-tile-content v-else>
              <!--주문자와 가격-->
              <div id="status">
                <div>
                  <span class = "medium mr-2 purple--text">{{item.RESERV_TIME.substring(0,10)}}</span>
                  <span class="medium mr-2">{{item.TOTAL_PRICE}}</span>
                  <span v-if="item.ORDER_STATUS==='수락대기'" class="medium yellow--text text--darken-3">{{item.ORDER_STATUS}}</span>
                  <span v-if="item.ORDER_STATUS==='예약완료'" class="medium blue--text">{{item.ORDER_STATUS}}</span>
                  <span v-if="item.ORDER_STATUS==='예약취소'" class="medium red--text">{{item.ORDER_STATUS}}</span>
                  <span v-if="item.ORDER_STATUS==='방문완료'" class="medium green--text">{{item.ORDER_STATUS}}</span>
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
          <span v-if="index !== (orderItems.length-1)" class="medium">예약시간 : {{item.RESERV_TIME.substring(11,16)}} / 주문자 : {{ item.CUSTOMER_ID }}</span>
          
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

      progress: true,
      onOff: false,
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
    this.getOrders()
  },
  methods: {
    getOrders(){
      this.$axios.get(`http://localhost:3000/api/reservation/owner/all/${this.ownerInfo.store_code}`)
      .then((r) => {
        
        this.orderItems = r.data
        this.progress = false
        console.log(this.orderItems)
        this.orderItems.push({})
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    logout(){
      alert("로그아웃 되었습니다."),
      this.$router.push('/')
    },
  }
}
</script>

<style scoped>

</style>
