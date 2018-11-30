var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../models/users');

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
router.post('/signin', (req, res, next) => {
  const { id, password } = req.body
  console.log(id)
  console.log(password)
  
  var success = true; // 성공인지 아닌지
  var mode = 'user'; // user인지owner인지 모드 구별 

  /*
  디비쪽 구현 필요 - 
  */

  if(success) res.json({ success: true, code: 66, mode: mode})
  else res.json({ success: false }) 
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
