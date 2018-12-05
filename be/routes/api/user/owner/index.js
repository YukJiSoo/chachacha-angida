var express = require('express');
var createError = require('http-errors');
var router = express.Router();

const owner = require('../../../../db_apis/owner.js');
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

/* POST 점주 로그인*/
router.post('/signin', async (req, res, next) => {
  console.log("body:", req.body)
  const { id, password } = req.body
  console.log(typeof id, typeof password)

  var success = true; // 성공인지 아닌지
  var mode = 'owner'; // user인지owner인지 모드 구별

  /* 디비쪽 구현 필요 */
  try {
    const context = {};
    const store_id = id;
    const store_password = password;
    if (store_id && store_password) {
      console.log("store body.owner_id");
      context.store_id = store_id;
      context.store_password = store_password;
    }

    const rows = await owner.find(context);
    console.log("result", rows);

    if (req.body.id) {
      if (rows.length === 1) { // 로그인 성공
        rows[0].success = true;
        res.status(200).json(rows[0]);
      } else { // 로그인 실패
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }

  //if(success) res.json({ success: true, code: 66, mode: mode})
  //else res.json({ success: false })
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
