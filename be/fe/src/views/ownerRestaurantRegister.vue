<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout row wrap class="mb-0">
      <v-flex xs12 sm12>
        <!-- toolbar -->
        <v-toolbar
          app
          dark
          class="angida-gradiation">
          <v-icon @click="$goBack()">keyboard_arrow_left</v-icon>
          <v-container class="pa-0 py-0">
            <v-layout align-center column>
              <v-flex xs12 sm12 class="py-0">
                <span class="small">음식이 나에게</span>
              </v-flex>
              <v-flex xs8 sm12 class="pl-5 py-0">
                <span class="xlarge">안기다</span>
                <span class="small">린다</span>
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
      v-model="restaurantName"
      :rules="[rules.length(1)]"
      box
      color="deep-purple"
      label="음식점 이름"
      type="name"
    ></v-text-field>
      <!--전화번호-->
      <v-text-field
        v-model="restaurantNumber"
        box
        color="deep-purple"
        label="매장 전화번호"
        :mask="phoneMask"
        :rules="[rules.required]"
      ></v-text-field>
      <!--매장주소-->
      <v-text-field
        v-model="restaurantLocation"
        box
        color="deep-purple"
        label="매장 주소"
        :rules="[rules.required]"
      ></v-text-field>
      <!--사진등록-->
    <v-flex xs12 sm12>
      <h4 class="mb-3" align="left">매장 사진</h4>
      <img :src='image' class="mb-3">
      <div id="fileApp">
        <div class="filebox" v-if="!image">
          <label for="restaurnatImg">사진등록</label>
          <input type="file" id="restaurnatImg" @change="onFileChange" class="mb-3">
        </div>
        <div v-else>
          <v-btn @click="removeImage">이미지 삭제</v-btn>
        </div>
      </div>
    </v-flex>
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
      >매장등록</v-btn>
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
      mainPath: '/',
      restaurantName: undefined,
      restaurantNumber: undefined,
      form: false,
      isLoading: false,
      phoneMask: '(###)-####-####',
      image: '',
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
    submit(){
      alert('회원가입이 완료되었고 매장이 등록되었습니다. ')
      this.$router.push('/')
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
