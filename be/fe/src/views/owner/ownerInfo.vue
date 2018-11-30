<template>
  <v-container grid-list-md text-xs-center align-center>
    <basicSet></basicSet>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm12>
      <h2 class="mb-3 xlarge">내 정보</h2>
      </v-flex>
        <!--사용자사진-->
      <v-flex xs12 sm12>
        <h4 class="mb-3 medium">사용자 사진</h4>
        <img :src='info.img' class="mb-3">
        </v-flex>
      <!--사용자 이름-->
      <v-flex xs12 sm12>
        <h4 class="mb-3 medium">사용자 이름</h4>
        <v-text-field
          :value="info.ownerName"
          solo
          readonly
          class="xlarge"
        >
        </v-text-field>
        <!--사용자 전화번호-->
        <h4 class="mt-3 mb-3 medium">사용자 전화번호</h4>
        <v-text-field
          :value="info.phone"
          solo
          readonly
          :mask="phoneMask"
          class="xlarge"
        ></v-text-field>
        <!--등록 음식점 이름-->
        <h4 class="mt-3 mb-3 medium">등록 음식점</h4>
        <v-text-field
          :value="info.restaurantName"
          solo
          readonly
          class="xlarge"
        >
        </v-text-field>
        <!--등록 음식점 전화번호-->
        <h4 class="mt-3 mb-3 medium">등록 음식점 전화번호</h4>
        <v-text-field
          :value="info.restaurantNumber"
          solo
          readonly
          :mask="phoneMask"
          class="xlarge"
        ></v-text-field>
    <div>
      <!--정보 수정 버튼-->
      <v-btn @click="goToOwnerInfoEdit" color="orange" dark class="medium">내 정보 수정하기</v-btn>
      <!--정보 수정 버튼-->
      <v-btn @click="goToRestaurantEdit" color="orange" dark class="medium">매장 정보 수정하기</v-btn>
      <!--회원 탈퇴 버튼-->
      <v-btn @click="quitAngida" color="red" dark class="medium">회원 탈퇴하기</v-btn>
    </div>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import basicSet from '@/components/ownerBasic'

export default {
  components: { basicSet },
  name: 'ownerInfo',  
  data () {
    return {
      info:{},
      phoneMask: '(###)-####-####',

    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo(){
      this.$axios.get(`http://localhost:3000/api/user/owner/${this.ownerCode}`)
      .then((r) => {
        this.info = r.data
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },

    quitAngida(){
      alert("회원 탈퇴되었습니다."),
      this.$router.push('/')
    },
    goToOwnerInfoEdit(){
      this.$router.push('/ownerInfoEdit')
    },
    goToRestaurantEdit(){
      this.$router.push('/restaurantEdit')
    },
    logout(){
      alert("로그아웃 되었습니다."),
      this.$router.push('/')
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
