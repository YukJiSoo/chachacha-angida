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

        <v-flex xs12 sm12>
          <!-- 음식점 이름-->
          <h1 class="large"></h1>
          <v-card class="medium">
            <!--메뉴사진 칸-->
            <v-flex xs12 sm12 class="medium">
              <h4 class="mt-3 mb-1" align="center">메뉴 사진</h4>
              <img :src='menu.menu_img_url' class="my-3">
              <div id="fileApp">
                <div class="filebox" v-if="!menu.menu_img_url">
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
                solo
                v-model='menu.menu_name'
              >
              </v-text-field>
            </v-card-text>
            <!--메뉴가격 칸-->
            <v-card-text>
              <h3 align="left">메뉴가격</h3>
              <v-text-field
                label="메뉴 가격을 적어주세요"
                solo
                v-model='menu.menu_price'
              >
              </v-text-field>
          </v-card-text>
          <!--메뉴설명 칸-->
          <v-card-text>
            <h3 align="left">메뉴설명</h3>
            <v-textarea
              label="메뉴 설명을 적어주세요"
              solo
              v-model='menu.menu_desc'
            >
            </v-textarea>
          </v-card-text>
          <!--작성완료 버튼-->
          <v-btn color="orange" dark class="font-weight-bold" @click="enrollOrUpdate(menu.menu_code)">작성 완료</v-btn>
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
      ownerInfo: JSON.parse(localStorage.getItem('ownerInfo')),

      drawer: null,
      mainPath: '/ownerHome',

      menu: {},
      menuId: 'enroll',
    }
  },
  mounted() {
    if(this.$route.query.type == "enroll"){
      this.menu =  {
        menu_code : 0,
        menu_img_url: '',
        menu_name: '',
        menu_desc: '',
        menu_price: ''
      }

    } else {
      this.menu = this.$route.query.type
    }
    console.log(this.menu)
  },
  methods: {
    postMenuItem(){
      this.$axios.post(`http://localhost:3000/api/menu/${this.ownerInfo.store_code}`,this.menu)
      .then((r) => {
        console.log(r.data,'번째 메뉴가 삽입됨')
      })
      .catch((e) => {
      this.pop(e.message)
      })

    },
    putMenuItem(menu_code){
      console.log('put')
      this.$axios.put(`http://localhost:3000/api/menu/${this.ownerInfo.store_code}/${menu_code}`, this.menu)
      .then((r) => {
        console.log(r.data)
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    enrollOrUpdate(menuId){
      console.log(menuId)
      if(menuId == 0) {
        this.postMenuItem()
      }
      else {
        this.putMenuItem(menuId)
      }

      alert("완료되었습니다.")

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
        vm.menu.menu_img_url = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage(){
      this.menu.menu_img_url=''
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
