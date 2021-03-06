import firebase from "firebase";
import fb_config from "../../config/fb.json"
// let firebase = require("firebase");
// let fb_config = require("../../config/fb.json");
function uploadTest (imgDir, file, callbackFun) {
  // let firebase = require("firebase");
  // let fb_config = require("../../config/fb.json");
  console.log("fbUtil.js uploadTest() >> ");
  var config = {
    apiKey: fb_config.apiKey,
    authDomain: fb_config.authDomain,
    databaseURL: fb_config.databaseURL,
    projectId: fb_config.projectId,
    storageBucket: fb_config.storageBucket,
    messagingSenderId: fb_config.messagingSenderId
  };
  firebase.initializeApp(fb_config);

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

}

module.exports.uploadTest = uploadTest;
