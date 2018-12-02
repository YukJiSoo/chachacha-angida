<template>
  <v-container grid-list-md text-xs-center align-center>
    <basicSet></basicSet>
    <!--menu list-->
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-list two-line>
            <!--메뉴등록 버튼-->
            <v-btn color="orange" dark class="xlarge mb-3" @click="editMenu('enroll')">메뉴 등록</v-btn>
            <template v-for="(item, index) in items">
              <v-divider></v-divider>
                <v-img :src="item.menu_img_url" class="mt-3" aspect-ratio="1.7" contain></v-img>
              <v-list-tile>
              <!--메뉴 이미지-->


                <v-list-tile-content text-xs-center class="medium">
                  <!--메뉴이름-->
                  <v-list-tile-title v-html="item.menu_name"></v-list-tile-title>
                  <!--메뉴설명-->
                  <v-list-tile-sub-title v-html="item.menun_desc"></v-list-tile-sub-title>
                  <!--메뉴가격-->
                  <h4>{{item.menu_price}}원</h4>
                </v-list-tile-content>
              </v-list-tile>
              <!--메뉴 수정 버튼-->
              <v-btn dark color="blue" class="medium" @click="editMenu(item)">수정</v-btn>
              <!--메뉴 삭제 버튼-->
              <v-btn dark color="red" class="medium" @click="deleteMenu(item.menu_code, index)">삭제</v-btn>

            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import basicSet from '@/components/ownerBasic'

export default {
  components: { basicSet },
  name: 'ownerMenuManage',
  data () {
    return {
      ownerInfo: JSON.parse(localStorage.getItem('ownerInfo')),
      items: []
    }
  },
  methods: {
    deleteMenu(menuId, index){
      this.$delete(this.items, index)
      alert("삭제되었습니다.")
      this.deleteMenuItem(menuId)
    },
    editMenu(type){
      if(type === 'enroll') this.$router.push({path:'/menuEdit', query: {type: type}})
      else this.$router.push({path:'/menuEdit', query: {type: type }})

    },
    logout(){
      alert("로그아웃 되었습니다."),
      this.$router.push('/')
    },
    getMenuList(){
      var data = {};
      data.store_code = this.ownerInfo.store_code;
      axios.get(`http://localhost:3000/api/menu`,{
        params: data
      })
      .then((r) => {
        this.items = r.data
        console.log(this.items)
      })
      .catch((e) => {
        console.error(e.message)
      })
    },
    deleteMenuItem(menuId){
      this.$axios.delete(`http://localhost:3000/api/menu/${this.ownerInfo.store_code}/${menuId}`)
      .then((r) => {
        // var success = r.data
        // if(success) alert("삭제되었습니다.")
        console.log(r.data)

        this.getMenuList()
      })
      .catch((e) => {
      this.pop(e.message)
      })

    },
  },
  mounted() {
    this.getMenuList()
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
