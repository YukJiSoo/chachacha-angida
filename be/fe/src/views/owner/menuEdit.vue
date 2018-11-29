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
          {{info.restaurantName}}</h1>
          <v-card>
            <!--메뉴사진 칸-->
            <v-flex xs12 sm12>
              <h4 class="mb-3" align="left">메뉴 사진</h4>
              <img :src='image' class="mb-3">
              <div id="fileApp">
                <div class="filebox" v-if="!image">
                  <label for="userImg">사진등록</label>
                  <input type="file" id="userImg" @change="onFileChange" class="mb-3">
                </div>
                <div v-else>
                  <v-btn @click="removeImage">이미지 삭제</v-btn>
                </div>
              </div>
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
      drawer: null,ownerInfoPath: '/ownerInfo',
      image: 'https://randomuser.me/api/portraits/men/85.jpg',
      mainPath: '/ownerHome',
      info:{
        role: 'owner',
        ownerName: '차민형',
        ID: 'mpsmhck95@naver.com',
        phone: '01087215502',
        sex: 'man',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        restaurantName: '도스마스 동대점',
        restaurantNumber: '01012345678',
        restaurantImage: 'http://ldb.phinf.naver.net/20170710_37/1499665631160zFj1G_JPEG/8.jpg',
        restaurantLocation: '동대입구 앞'
      }
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
img {
  width: 40%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
.filebox label { display: inline-block; padding: .5em .75em; color: #999; font-size: inherit; line-height: normal; vertical-align: middle; background-color: #fdfdfd; cursor: pointer; border: 1px solid #ebebeb; border-bottom-color: #e2e2e2; border-radius: .25em; } .filebox input[type="file"] { /* 파일 필드 숨기기 */ position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip:rect(0,0,0,0); border: 0; }
#fileApp {
  text-align: center;
}
</style>
