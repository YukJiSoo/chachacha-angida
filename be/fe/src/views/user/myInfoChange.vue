<template>
  <v-container class="pa-1">
    <v-layout row wrap justify-center>
      <!-- 상단 -->
      <v-flex xs12 sm12>
        <v-toolbar
          app
          dark
          height="40"
          class="angida-gradiation">
          <v-btn icon @click="$goBack()">
            <v-icon >keyboard_arrow_left</v-icon>
          </v-btn>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <span class="font-weight-bold subheading">내정보 변경</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>
      <v-flex xs12 sm6 md3 class="px-3 mt-3" id="fileApp">
        <div class="filebox" v-if="!image">
          <!--<v-btn v-if="!image" color="primary" @click="complete">사진등록</v-btn>-->
            <label for="ex_file" class="medium">사진변경</label>
            <input type="file" id="ex_file" @change="onFileChange">
        </div>
        <div class="filebox" v-else>
          <img :src="image" />
          <label for="ex_file" class="medium">Remove image</label>
          <input type="button" id="ex_file" @click="removeImage">
          <!-- <button @click="removeImage">Remove image</button> -->
        </div>
      <!-- </div> -->

      </v-flex>
      <v-flex xs12 sm6 md3 class="px-3">
        <v-text-field
          label="주소"
          color="orange"
          class="medium"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md3 class="px-3">
        <v-text-field
          label="핸드폰번호"
          color="orange"
          class="medium"
          :mask="phoneMask"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-divider class="mx-2 mt-4"></v-divider>
    <v-subheader class="small">카드정보</v-subheader>
    <v-layout row wrap justify-center>
      <v-flex v-for="input in cardInputs" xs12 sm6 md3 class="px-3">
        <v-text-field
          :label="`${input.name}`"
          color="orange"
          class="medium"
          :mask="input.mask"
        ></v-text-field>
      </v-flex>
      <!-- <div id="fileApp"> -->
      <div class="text-xs-center">
        <v-btn color="error" class="medium mt-3" :to="myPagePath">수정완료</v-btn>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'default',
  data () {
    return {
      image: '',
      myPagePath: '/mypage',
      phoneMask: '(###)-####-####',
      cardInputs: [
        {
          name: '카드회사',
          mask: null
        },
        {
          name: '카드번호',
          mask: 'credit-card'
        },
        {
          name: '유효기간',
          mask: '##/##'
        },
        {
          name: 'CVC',
          mask: '###'
        },
        {
          name: '결제비밀번호',
          mask: '####'
        },
      ]

    }
  },
  computed: {

  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.filename = files[0].name;
      this.uploadfile = files[0];
      this.createImage(files[0]);

    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
        // console.log(typeof vm.image);
        // console.log(vm.image);
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
    }
  }
}
</script>

<style>
#fileApp {
  text-align: center;
}
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
button {

}

.filebox label { display: inline-block; padding: .5em .75em; color: #999; font-size: inherit; line-height: normal; vertical-align: middle; background-color: #fdfdfd; cursor: pointer; border: 1px solid #ebebeb; border-bottom-color: #e2e2e2; border-radius: .25em; } .filebox input[type="file"] { /* 파일 필드 숨기기 */ position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip:rect(0,0,0,0); border: 0; }
</style>
