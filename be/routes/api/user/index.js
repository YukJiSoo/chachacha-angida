var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../models/users');
const customer = require('../../../db_apis/customer.js');
router.use('/owner', require('./owner'));

/* GET home page. */
router.get('/:id', function(req, res, next) {
  User.find()
    .then(r => {
      res.send({ success: true, users: r })
    })
    .catch(e => {
      res.send({ success: false })
    })
});

/* POST 회원가입 */
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
  var success = true; // 성공인지 아닌지

  /*
  디비쪽 구현 필요 - insert
  */

  if(success) res.json({ success: true})
  else res.json({ success: false })
})

/* POST 로그인 */
router.post('/signin', async (req, res, next) => {
  console.log("body:", req.body)
  const { id, password } = req.body
  console.log(typeof id, typeof password)

  var success = true; // 성공인지 아닌지
  var mode = 'user'; // user인지owner인지 모드 구별

  /* 디비쪽 구현 필요 */
  try {
    const context = {};
    const customer_id = id;
    const customer_password = password;
    if (customer_id && customer_password) {
      console.log("custotmer body.customer_id");
      context.customer_id = customer_id;
      context.customer_password = customer_password;
    }

    const rows = await customer.find(context);
    console.log("result", rows);

    if (req.body.id) {
      if (rows.length === 1) { // 로그인 성공
        rows[0].success = true;
        rows[0].mode = mode;
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


/* PUT 내정보변경 */
router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const { name, age } = req.body

  res.send({ success: true, msg: 'put ok' })
})

/* DELETE 회원탈퇴 */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id

})

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
