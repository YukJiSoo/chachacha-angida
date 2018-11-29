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
  <v-card
    class="mx-auto"
    style="max-width: 500px;"
  >
    <v-form
      ref="form"
      v-model="form"
      class="pa-3 pt-4"
    >
    <!--이름-->
    <v-text-field
      v-model="name"
      :rules="[rules.length(2)]"
      box
      color="deep-purple"
      label="이름"
      type="name"
    ></v-text-field>
    <!--이메일아이디-->
    <v-text-field
      v-model="email"
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
        counter="6"
        label="비밀번호"
        style="min-height: 96px"
        type="password"
      ></v-text-field>
      <!--전화번호-->
      <v-text-field
        v-model="phone"
        box
        color="deep-purple"
        label="전화번호"
        :mask="phoneMask"
        :rules="[rules.required]"
      ></v-text-field>
      <!--성별-->
      <h4 align="left" color="">성별</h4>
      <v-radio-group v-model="sex" row>
      <v-radio label="남자" value="man"></v-radio>
      <v-radio label="여자" value="woman"></v-radio>
    </v-radio-group>
      <!--사진등록-->
    <v-flex xs12 sm12>
      <h4 class="mb-3" align="left">회원 사진</h4>
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
    <!--규정-->
      <v-checkbox
        v-model="agreement"
        :rules="[rules.required]"
        color="deep-purple"
      >
        <template slot="label">
          저는&nbsp;
          <a href="#" @click.stop.prevent="dialog = true">관련규정</a>
          &nbsp;에 대해 동의합니다.
        </template>
      </v-checkbox>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!--회원가입 버튼-->
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
        @click="submit"
      >회원가입</v-btn>
    </v-card-actions>
    <v-dialog
      v-model="dialog"
      absolute
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title class="headline grey lighten-3">규정</v-card-title>
        <v-card-text>
        양도하지마세요</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            flat
            @click="agreement = false, dialog = false"
          >
            No
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            color="deep-purple accent-4"
            @click="agreement = true, dialog = false"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'ownerDefault',
  data () {
    return {
      mainPath: '/',
      agreement: false,
      dialog: false,
      name: undefined,
      email: undefined,
      form: false,
      isLoading: false,
      password: undefined,
      phone: undefined,
      sex: 'man',
      phoneMask: '(###)-####-####',
      image: '',
      info:{
        role:'user'
      },
      rules: {
        email: v => (v || '').match(/@/) || '이메일형식으로 작성해 적어주세요',
        length: len => v => (v || '').length >= len || `${len}자 이상 적어주세요`,
        password: v => (v || '').match(/^(?=.*[a-z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          '숫자와 특수문자가 포함된 비밀번호를 작성해주세요',
        required: v => !!v || '필수입니다'
      }
    }
  },
  methods: {
    goBack(){
      window.history.back();
    },
      submit(){
        alert('회원가입되었습니다')
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
