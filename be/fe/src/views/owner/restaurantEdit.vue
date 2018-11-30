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
      v-model="info.restaurantName"
      :rules="[rules.length(1)]"
      box
      color="deep-purple"
      label="음식점 이름"
      type="name"
    ></v-text-field>
      <!--전화번호-->
      <v-text-field
        v-model="info.restaurantNumber"
        box
        color="deep-purple"
        label="매장 전화번호"
        :mask="phoneMask"
        :rules="[rules.required]"
      ></v-text-field>
      <!--매장주소-->
      <v-text-field
        v-model="info.restaurantLocation"
        box
        color="deep-purple"
        label="매장 주소"
        :rules="[rules.required]"
      ></v-text-field>
    </v-form>
      <!--tag 등록-->
      <div
      class="pa-3">

      <h4 align="left" class="mb-2">태그등록</h4>
      <div id="tagsInput">
        <div
        v-if="info.tags.length < 3">
          <v-text-field
            v-model="tagText"
            box
            color="deep-purple"
            label="최대 3개까지 가능합니다(6글자 이내)"
            :rules="[rules.limit(6)]"
            maxlength="6"
            @keydown.enter="enterTag()"
          ></v-text-field>
        </div>
      </div>
    </div>
      <v-form
        ref="form"
        v-model="form"
        class="pa-3"
      >
      <div class="mb-5">
        <v-chip
        v-for="(item,index) in info.tags"
        v-model="item.tag"
        color="orange lighten-2"
        class="white--text"
        >#{{item.tag}}&nbsp
          <v-icon
          small
          @click="deleteTag(index)">clear
          </v-icon>
      </v-chip>
      </div>
      <!--사진등록-->
    <v-flex xs12 sm12>
      <h4 class="mb-3" align="left">매장 사진</h4>
      <img :src='info.restaurantImage' class="mb-3">
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
    </v-form>

    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!--수정하기 버튼-->
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
        @click="submit"
      >수정하기</v-btn>
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
      tagText: null,
      rules: {
        email: v => (v || '').match(/@/) || '이메일형식으로 작성해 적어주세요',
        length: len => v => (v || '').length >= len || `${len}자 이상 적어주세요`,
        limit: lim => v => (v || '').length <= lim || `${lim}자 이내로 적어주세요`,
        password: v => (v || '').match(/^(?=.*[a-z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          '숫자와 특수문자가 포함된 비밀번호를 작성해주세요',
        required: v => !!v || '필수입니다'
      },
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
        restaurantLocation: '동대입구 앞',
        tags:
        [
          {
            tag: "태그1",
            status: true
          },
          {
            tag: "태그2",
            status: true
          },
          {
            tag: "태그3",
            status: true
          }
        ]
      }
    }
  },
  methods: {
    goBack(){
      window.history.back();
    },
      submit(){
        this.$router.push('/ownerInfo'),
        alert('수정되었습니다')
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
    },
    enterTag(){
      this.info.tags.push({
        tag: this.tagText,
        status: true
      })
      this.tagText = null
    },
    deleteTag(index){
      this.$delete(this.info.tags, index)
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
