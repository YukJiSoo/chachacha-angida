<template>
  <v-container grid-list-md text-xs-center align-center>
    <basicSet></basicSet>
    <v-flex xs12 sm12 class="mb-3">
      <!-- 음식점 이름-->
      <h3 class="xlarge">리뷰관리</h3>
    </v-flex>
    <!--menu list-->
    <v-layout row>
      <div>
        <v-expansion-panel
          expand
        >
          <v-expansion-panel-content v-for="item in reviewItems">
            <div slot="header"><h2 class="xlarge">{{item.customer_name}} {{item.review_date.substring(0,10)}}</h2></div>
            <v-card>
              <h3 class="medium">&nbsp;&nbsp;&nbsp;&nbsp;ID: {{item.customer_name}} &nbsp;&nbsp;&nbsp;&nbsp;
                <v-icon
                  color="red"
                  @click="report">block</v-icon>
              </h3>
              <v-card-text class="medium">{{item.contents}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import basicSet from '@/components/ownerBasic'

export default {
  components: { basicSet },
  name: 'ownerReviewManage',
  data () {
    return {
      ownerInfo: JSON.parse(localStorage.getItem('ownerInfo')),
      reviewItems: []
    }
  },
  methods: {
    logout(){
      alert("로그아웃 되었습니다."),
      this.$router.push('/')
    },
    report(){
      alert("신고되었습니다.")
    },
    getReviewList(){
      this.$axios.get(`http://localhost:3000/api/review/owner/${this.ownerInfo.store_code}`)
      .then((r) => {
        this.reviewItems = r.data
        console.log(this.reviewItems)
      })
      .catch((e) => {
        console.error(e.message)
      })
    }
  },
  mounted() {
    this.getReviewList()
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
