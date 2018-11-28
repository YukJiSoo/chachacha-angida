<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout row wrap class="mb-0">
      <v-flex xs12 sm12>
        <!-- toolbar -->
        <v-toolbar
          app
          dark
          class="angida-gradiation">
          <v-icon
          @click="goBack"
          >keyboard_backspace</v-icon>
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
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm12>
      <h2 class="mb-3">내 정보 수정</h2>
      </v-flex>
      <!--사용자사진-->
      <v-flex xs12 sm12>
        <h4 class="mb-3">사용자 사진</h4>
        <img :src='image' class="mb-3">
        <div v-if="!image">
    <input type="file" @change="onFileChange" class="mb-3">
  </div>
        <div
        v-else>
        <v-btn @click="removeImage">이미지 삭제</v-btn>
        </div>
        <v-divider></v-divider>
        </v-flex>
      <v-flex xs12 sm12>
        <!--사용자 이름 입력-->
    <h4 class="mb-3">사용자 이름</h4>
    <v-text-field
    solo
    v-model = "ownerName">
    </v-text-field>
    <v-divider></v-divider>
    <!--등록 음식점 이름 입력-->
    <h4 class="mt-3 mb-3">등록 음식점</h4>
    <v-text-field
    solo
    v-model = "restaurantName">
    </v-text-field>
    <v-divider></v-divider>
    <!--등록 음식점 전화번호 입력-->
    <h4 class="mt-3 mb-3">등록 음식점 전화번호</h4>
    <v-text-field
    solo
    v-model = "restaurantNumber">
    </v-text-field>
    <v-divider></v-divider>
    <div>
      <!--완료 버튼-->
    <v-btn @click="goToOwnerInfo" color="orange" class="font-weight-bold">정보 수정하기</v-btn>
  </div>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'ownerDefault',
  data () {
    return {
      restaurantName: '도스마스 동대점',
      ownerName: '차민형',
      restaurantNumber: '02-0000-0000',
      drawer: null,
      image: 'https://randomuser.me/api/portraits/men/85.jpg',
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
      ]
    }
  },
  methods: {
    logout(){
      alert("로그아웃 되었습니다."),
      this.$router.push('/')
    },
    goToOwnerInfo(){
      alert("수정 완료되었습니다."),
      this.$router.push('/ownerInfo')
    },
    goBack(){
      window.history.back();
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage(){
      this.image=''
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
