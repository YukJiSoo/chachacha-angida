<template>
  <v-container class="pa-1">
    <v-layout row wrap>
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

      <v-flex xs12 sm6 md3 class="px-3">
        <v-text-field
          label="주소"
          color="orange"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md3 class="px-3">
        <v-text-field
          label="핸드폰번호"
          color="orange"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-divider class="mx-2 mt-4"></v-divider>
    <v-subheader>카드정보</v-subheader>
    <v-layout row wrap>
      <v-flex v-for="input in cardInputs" xs12 sm6 md3 class="px-3">
        <v-text-field
          :label="`${input.name}`"
          color="orange"
        ></v-text-field>
      </v-flex>

      <!-- <div id="fileApp"> -->
      <v-flex xs12 sm6 md3 class="px-3" id="fileApp">
        <div class="filebox" v-if="!image">
          <!--<v-btn v-if="!image" color="primary" @click="complete">사진등록</v-btn>-->
            <label for="ex_file">사진변경</label>
            <input type="file" id="ex_file" @change="onFileChange">
        </div>
        <div class="filebox" v-else>
          <img :src="image" />
          <label for="ex_file">Remove image</label>
          <input type="button" id="ex_file" @click="removeImage">
          <!-- <button @click="removeImage">Remove image</button> -->
        </div>
      <!-- </div> -->
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'default',
  data () {
    return {
      image: '',
      cardInputs: [
        {
          name: '카드회사'
        },
        {
          name: '카드번호'
        },
        {
          name: '유효기간'
        },
        {
          name: 'CVC'
        },
        {
          name: '결제비밀번호'
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
