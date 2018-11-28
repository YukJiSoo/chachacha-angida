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
        <v-flex xs12 sm12>
          <!-- 음식점 이름-->
          <h1>
          {{restaurantName}}</h1>
          <v-card>
            <!--메뉴사진 칸-->
            <v-card-text>
            <h3 align="left">메뉴사진</h3></v-card-text>
            <v-flex xs12 sm12>
              <img :src='image'>
              <div v-if="!image">
          <input type="file" @change="onFileChange" class="mb-3">
        </div>
              <div
              v-else>
              <v-btn @click="removeImage" class="mb-3">이미지 삭제</v-btn>
              </div>
              <v-divider></v-divider>
              </v-flex>
            <!--메뉴이름 칸-->
  <v-card-text>
    <h3 align="left">메뉴이름</h3>
    <v-text-field
    label="메뉴 이름을 적어주세요"
    solo>
  </v-text-field>
  </v-card-text>
  <!--메뉴가격 칸-->
  <v-card-text>
    <h3 align="left">메뉴가격</h3>
    <v-text-field
    label="메뉴 가격을 적어주세요"
    solo>
  </v-text-field>
</v-card-text>
<!--메뉴설명 칸-->
<v-card-text>
  <h3 align="left">메뉴설명</h3>
  <v-textarea
  label="메뉴 설명을 적어주세요"
  solo>
</v-textarea>
</v-card-text>
<!--작성완료 버튼-->
<v-btn color="orange" class="font-weight-bold" @click="goToOwnerMenuManage">작성 완료</v-btn>
</v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'menuEdit',
  data () {
    return {
      restaurantName: '도스마스 동대점',
      ownerName: '차민형',
      drawer: null,ownerInfoPath: '/ownerInfo',
      image: 'https://randomuser.me/api/portraits/men/85.jpg',
      mainPath: '/ownerHome',
      avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
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
  methods: {
    logout(){
      alert("로그아웃 되었습니다."),
      this.$router.push('/')
    },
    goToOwnerMenuManage(){
      alert("완료되었습니다."),
      this.$router.push('/ownerMenuManage')
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
