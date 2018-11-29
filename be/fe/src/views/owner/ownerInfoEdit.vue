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
    </v-layout>

  <v-card
    class="mx-auto"
    style="max-width: 500px;"
  >
    <v-form
      ref="form"
      v-model="form"
      class="pa-3 pt-4 medium"
    >
    <!--이름-->
    <v-text-field
      v-model="info.ownerName"
      :rules="[rules.length(2)]"
      box
      color="deep-purple"
      label="이름"
      type="name"
    ></v-text-field>
    <!--이메일아이디-->
    <v-text-field
      v-model="info.ID"
      :value="info.ID"
      :rules="[rules.email]"
      box
      color="deep-purple"
      label="이메일(아이디)"
      type="email"
    ></v-text-field>
    <!--비밀번호-->
      <v-text-field
        v-model="password"
        :rules="[rules.password, rules.length(6)]"
        box
        color="deep-purple"
        counter="18"
        label="비밀번호"
        style="min-height: 96px"
        type="password"
      ></v-text-field>
      <!--전화번호-->
      <v-text-field
        v-model="info.phone"
        box
        color="deep-purple"
        label="전화번호"
        :mask="phoneMask"
        :rules="[rules.required]"
      ></v-text-field>
      <!--성별-->
      <h4 align="left" color="">성별</h4>
      <v-radio-group v-model="info.sex" row>
      <v-radio label="남자" value="man" default></v-radio>
      <v-radio label="여자" value="woman"></v-radio>
    </v-radio-group>
      <!--사진등록-->
    <v-flex xs12 sm12>
      <h4 class="mb-3" align="left">회원 사진</h4>
      <img :src='info.img' class="mb-3">
      <div id="fileApp">
        <div class="filebox" v-if="!info.img">
          <label for="userImg">사진등록</label>
          <input type="file" id="userImg" @change="onFileChange" class="mb-3">
        </div>
        <div v-else>
          <v-btn @click="removeImage">이미지 삭제</v-btn>
        </div>
      </div>
    </v-flex>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!--수정 완료-->
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
        @click="goToOwnerInfo"
      >수정완료</v-btn>
    </v-card-actions>
  </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'ownerDefault',
  data () {
    return {
      ownerCode: localStorage.getItem('code'),
      info:{},
      
      mainPath: '/',
      agreement: false,
      dialog: false,
      form: false,
      isLoading: false,
      password: undefined,
      phoneMask: '(###)-####-####',
      rules: {
        email: v => (v || '').match(/@/) || '이메일형식으로 작성해 적어주세요',
        length: len => v => (v || '').length >= len || `${len}자 이상 적어주세요`,
        password: v => (v || '').match(/^(?=.*[a-z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          '숫자와 특수문자가 포함된 비밀번호를 작성해주세요',
        required: v => !!v || '필수입니다'
      }
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo(){
      this.$axios.get(`http://localhost:3000/api/user/owner/${this.ownerCode}`)
      .then((r) => {
        console.log(r.data)
        this.info = r.data
        console.log(this.info)
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    putUserInfo(info){
      this.$axios.put(`http://localhost:3000/api/user/owner/${this.ownerCode}`,info)
      .then((r) => {
        console.log(r.data)
        this.info = r.data
        console.log(this.info)
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    logout(){
      alert("로그아웃 되었습니다."),
      this.$router.push('/')
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
        vm.info.img = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage(){
      this.info.img=''
    },
    goToOwnerInfo(){
      this.putUserInfo(this.info)
      alert("수정되었습니다"),
      this.$router.push('/ownerInfo')
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
