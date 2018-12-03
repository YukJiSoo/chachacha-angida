<template>
  <v-container grid-list-md text-xs-center align-center>
    <basicSet></basicSet>
    <v-flex xs12 sm12>
      <!-- 음식점 이름-->
      <h3 class="xlarge mb-2">매출관리</h3>
    </v-flex>
    
    <!--주문정보-->
    <v-card>
      <v-list>
        <v-layout justify-center>
        <v-subheader class="xlarge">당일 총 매출 : {{totalcost}}원
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
            <v-btn flat color="primary" @click="ho(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
          <!--달력 끝-->

        <div v-if="progress" class="mt-4 pt-5 pb-5">
          <v-progress-circular
            :size="150"
            :width="20"
            color="orange"
            indeterminate
          ></v-progress-circular>
        </div>
      <v-list-group
        v-if="!progress"
        v-for="item in saleItems"
        v-model="item.active"
        :key="item.title"
        no-action
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <!--주문자와 가격-->
            <div>
              <span class="medium green--text pr-2">{{item.RESERV_TIME.substring(0,10)}}</span>
              <span class="medium yellow--text text--darken-3 pr-2">{{item.RESERV_TIME.substring(11,16)}}</span>
              <span class="medium blue--text">{{item.TOTAL_PRICE}}원</span>
            </div>
          </v-list-tile-content>
        </v-list-tile>
        <div class="medium py-2">주문자 : {{item.CUSTOMER_ID}} </div>
        <div v-for="menu in item.menu_name" class="medium py-1">
          <v-icon>restaurant_menu</v-icon>
          {{ menu }}
        </div>
      </v-list-group>
    </v-list>
    </v-card>

  </v-container>
</template>

<script>
import basicSet from '@/components/ownerBasic'

export default {
  components: { basicSet },
  name: 'ownerSaleManage',
  data () {
    return {
      totalcost: 0,
      sheet: false,
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      progress: true,
      
      ownerInfo: JSON.parse(localStorage.getItem('ownerInfo')),
      saleItems: []
    }
  },
  methods: { 
    // 날짜를 넘겨주고 그에 해당되는 날짜를 받아오기로, 날짜형식:2018-11-08
    getSaleList(date){
      this.$axios.get(`http://localhost:3000/api/reservation/owner/all/${this.ownerInfo.store_code}`)
      .then((r) => {
        this.saleItems = r.data
        console.log(r.data)
        
        this.totalcost = 0
        this.saleItems.forEach( (v,i) => {
          this.totalcost = this.totalcost + parseInt(v.total_price,10)
        });
        this.progress = false
      
      })
      .catch((e) => {
        console.error(e.message)
      })
    },
    ho(date){
      this.$refs.dialog.save(date)
      this.getSaleList(this.date)
    }
  },
  mounted() {
    this.getSaleList(this.date) 
  },
  
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
