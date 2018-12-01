var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET 점주정보가져오기 */
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  console.log(id)
  
  const userInfo = {
    role: 'owner',
    ownerName: '차민형',
    ID: 'mpsmhck95@naver.com',
    phone: '01087215502',
    sex: 'man',
    img: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    restaurantName: '도스마스 동대점',
    restaurantNumber: '01012345678',
    restaurantImage: 'http://ldb.phinf.naver.net/20170710_37/1499665631160zFj1G_JPEG/8.jpg',
    restaurantLocation: '동대입구 앞'
  }

  res.json(userInfo);
});

/* POST 점주 회원가입*/
router.post('/', (req, res, next) => {
  const info = req.body
  console.log(info)
  // 넘어오는 회원정보 형식
  // info = {
  //   name: '',
  //   email: '',
  //   password: '',
  //   phone: '',
  //   image: '',
  //   address: '',
  //   birth: ''
  // }
  var success = false; // 성공인지 아닌지
  
  /*
  디비쪽 구현 필요 - insert
  */

  if(success) res.json({ success: true})
  else res.json({ success: false }) 
})

/* PUT 점주 회원정보 변경 */
router.put('/:id', (req, res, next) => {

})

/* DELETE 점주 회원탈퇴 */
router.delete('/:id', (req, res, next) => {

})

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
