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
        <v-list-tile avatar @click="goToOwnerMain">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ownerName}}</v-list-tile-title>
            <v-list-tile-subtitle>{{restaurantName}}</v-list-tile-subtitle>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <!--한칸-->
        <v-list-tile @click="goToOwnerMain">
          <v-list-tile-content>
            <v-list-tile-title>주문관리</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <!--끝-->
        <!--한칸-->
        <v-list-tile @click="goToOwnerSaleManage">
          <v-list-tile-content>
            <v-list-tile-title>매출관리</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <!--끝-->
        <!--한칸-->
        <v-list-tile @click="goToOwnerMain">
          <v-list-tile-content>
            <v-list-tile-title>메뉴관리</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      <!--끝-->
      <!--한칸-->
      <v-list-tile @click="goToOwnerMain">
        <v-list-tile-content>
          <v-list-tile-title>환경설정</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
    <!--끝-->
  </v-list>
    </v-navigation-drawer>
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
                <span @click="goToOwnerMain" class="font-weight-bold caption">음식이 나에게</span>
              </v-flex>
              <v-flex xs8 sm12 class="pl-5">
                <span @click="goToOwnerMain" class="font-weight-bold title">안기다</span>
                <span @click="goToOwnerMain" class="font-weight-bold caption">린다</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
        <!-- toolbar end-->
        </v-flex>

        <v-flex xs12 sm12>
          <!-- 음식점 이름-->
          <h1>
          {{restaurantName}}</h1>
        </v-flex>
    </v-layout>
  <!--주문정보-->
  <v-card>

    <v-list>

      <v-flex xs12 sm12>
      <v-subheader>당일 총 매출:{{totalcost}}<v-layout justify-end row wrap><v-icon justify-end>event</v-icon></v-layout></v-subheader>
        </v-flex>


     <v-list-group
       v-for="item in items"
       v-model="item.active"
       :key="item.title"
       no-action
     >
       <v-list-tile slot="activator">
         <v-list-tile-content>
           <v-list-tile-title>{{ item.title }}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{item.cost}}</v-list-tile-title>

         </v-list-tile-content>
       </v-list-tile>

       <v-list-tile
         v-for="subItem in item.items"
         :key="subItem.title"
       >
         <v-list-tile-content>
           <v-list-tile-title>{{ subItem.menu }}</v-list-tile-title>
           <v-list-tile-subtitle>{{subItem.time}}</v-list-tile-subtitle>
         </v-list-tile-content>

       </v-list-tile>
     </v-list-group>
   </v-list>
      </v-card>
      <v-bottom-sheet v-model="sheet">
  <v-btn
    slot="activator"
    color="purple"
    dark
  >
    Click me
  </v-btn>

  <v-list>
    <v-subheader>Open in</v-subheader>
    <v-list-tile
      v-for="tile in tiles"
      :key="tile.title"
      @click="sheet = false"
    >
      <v-list-tile-avatar>
        <v-avatar size="32px" tile>
          <img
            :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`"
            :alt="tile.title"
          >
        </v-avatar>
      </v-list-tile-avatar>
      <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
    </v-list-tile>
  </v-list>
</v-bottom-sheet>
  </v-container>
</template>

<script>
export default {
  name: 'default',
  data () {
    return {
      restaurantName: '도스마스 동대점',
      ownerName: '차민형',
      drawer: null,
      totalcost: '몰라',
      items:[
          {
            title: '주문자1',
            cost: '10000원',
            items: [

              { menu: '음식1, 음식2, 음식3' },
              { time: '오전 1시 10분' }
            ]
          },
          {
            title: '주문자2',
            cost: '10000원',
            items: [

              { menu: '음식1, 음식2, 음식3' },
              { time: '오전 1시 10분' }
            ]
          },{
            title: '주문자3',
            cost: '10000원',
            items: [

              { menu: '음식1, 음식2, 음식3' },
              { time: '오전 1시 10분' }
            ]
          },{
            title: '주문자4',
            cost: '10000원',
            items: [

              { menu: '음식1, 음식2, 음식3' },
              { time: '오전 1시 10분' }
            ]
          }
        ]
    }
  },
  methods: {
    goToOwnerMain(){
      window.location.href = 'http://localhost:8080/ownerHome'
    },
    goToOwnerSaleManage(){
      window.location.href = 'http://localhost:8080/ownerSalemanage'
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
