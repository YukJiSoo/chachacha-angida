<template>
  <v-container text-xs-center align-center>
    <v-layout align-space-around column>
      <!-- 상단 -->
      <v-flex xs12 sm12>
        <v-toolbar
          app
          dark
          height="40"
          class="angida-gradiation">
          <v-btn dark icon @click="$goBack()">
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <span class="font-weight-bold subheading">리뷰작성</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>

      <v-layout align-center row>
        <v-flex xs4 sm12>
          <div class=" pt-1 xlarge">
            <span>별점</span>
          </div>
        </v-flex>
        <v-flex xs8 sm12>
          <v-rating
            v-model="rating"
            color="yellow darken-3"
            background-color="black"
            empty-icon="$vuetify.icons.ratingFull"
            half-increments
            hover
          ></v-rating>
        </v-flex>
      </v-layout>

      <v-flex xs12 sm12 class="mt-3">
        <v-form v-model="valid">
          <!-- 리뷰내용-->
          <v-textarea
            v-model="reviewContent"
            outline
            name="review"
            label="리뷰를 작성해주세요"
            color="orange"
            value=""
            height="300"
            class="medium"
          >
          {{ reviewContent }}
          </v-textarea>
        </v-form>
        <div>
          <div id="fileApp">
            <div class="filebox" v-if="!image">
              <!--<v-btn v-if="!image" color="primary" @click="complete">사진등록</v-btn>-->
                <label for="ex_file" class="medium">사진업로드</label>
                <input type="file" id="ex_file" @change="onFileChange">
            </div>
            <div class="filebox" v-else>
              <img :src="image" />
              <label for="ex_file" class="medium">Remove image</label>
              <input type="button" id="ex_file" @click="removeImage">
              <!-- <button @click="removeImage">Remove image</button> -->
            </div>
          </div>
        </div>
        <!-- 완료, 취소 버튼-->
        <div>
          <v-btn color="primary" @click="reviewRegister" class="medium">완료</v-btn>
          <v-btn color="error" @click="$goBack()" class="medium">취소</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//const fbUtil = require("../../plugins/fbUtil")
import firebase from "firebase";
import fb_config from "../../../config/fb.json"
// const fbUtil = require("../../plugins/fbUtil.js")
// import fbUtil from "../../../src/plugins/fbUtil.js"
var config = {
  apiKey: fb_config.apiKey,
  authDomain: fb_config.authDomain,
  databaseURL: fb_config.databaseURL,
  projectId: fb_config.projectId,
  storageBucket: fb_config.storageBucket,
  messagingSenderId: fb_config.messagingSenderId
};
firebase.initializeApp(fb_config);

export default {
  name: 'default',
  data () {
    return {
      customerInfo: {},
      store_code: '',
      rating: 0,
      reviewPath:'/review',
      reviewContent: '',
      image: '',
      uploadfile: '',
      filename: '',
      contentLimit: 1,
      fileUrl: ''
    }
  },
  mounted () {
    this.customerInfo = JSON.parse(localStorage.getItem('customerInfo'))
    this.store_code = this.$route.query.store_code;
  },
  methods: {
    complete (downloadURL) { //완료 method
      var data = {};
      data.store_code = this.store_code;
      data.customer_code = this.customerInfo.customer_code;
      data.review_rate = this.rating;
      data.contents = this.reviewContent;
      data.review_img_url = downloadURL;

      console.log("Review Data:",data);
      this.$axios.post('http://localhost:3000/api/review/', data)
      .then((r) => {
        console.log(r);
        this.$router.push({path: '/reservationHistory', query: {}});
      })
      .catch((e) => {
        this.pop(e.message)
        alert("리뷰 등록에 실패했습니다. 잠시 후 다시 시도해주세요.")
      });
    },
    reviewRegister () {
      if(this.reviewContent.length < this.contentLimit){
        alert(this.contentLimit+"글자 이상 내용을 입력해주세요.");
        return;
      }
      if(this.uploadfile) { // 이미지가 있으면
        this.upload('reviewImages/', this.uploadfile, this.complete);
        // fbUtil.uploadTest('images/', this.uploadfile, this.complete);
      } else {
        console.log("이미지 없이 리뷰 등록");
        this.complete();
      }
    },
    upload (imgDir, file, callbackFun) {
      var storage = firebase.storage();
      var storageRef = storage.ref();
      //var file = this.uploadfile;
      // Create the file metadata
      var metadata = {
        contentType: 'image/jpeg'
      };
      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child(imgDir + this.filename).put(file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          // 파일 업로드 완료 됐으니까 리뷰 작성 api호출해서 DB에 저장합시다.
          callbackFun(downloadURL);
        });
      });

    },
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
      this.uploadfile = '';
    }
  }
}
</script>

<style scoped>
#fileApp {
  text-align: center;
}
img {
  width: 100px;
  height: 90px;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
button {

}

.filebox label { display: inline-block; padding: .5em .75em; color: #999; font-size: inherit; line-height: normal; vertical-align: middle; background-color: #fdfdfd; cursor: pointer; border: 1px solid #ebebeb; border-bottom-color: #e2e2e2; border-radius: .25em; } .filebox input[type="file"] { /* 파일 필드 숨기기 */ position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip:rect(0,0,0,0); border: 0; }
</style>
