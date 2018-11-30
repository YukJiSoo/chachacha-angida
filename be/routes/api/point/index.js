var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET point  . */
router.get('/:id', function(req, res, next) {
  console.log('유저 포인트 받아오기 - 100으로 가정 - 디비 연결 추가해야함')
  const id = req.params.id
  var point = 100

  res.send({point})
});

/* GET point detail . */
router.get('/list/:id', function(req, res, next) {
  console.log('유저 포인트 상세내역 받아오기 -  - 디비 연결 추가해야함')
  const id = req.params.id
  console.log(id)

  res.json([{ store: '토끼정', date: '2018.11.23', point: 100 }])
});

/* POST home page. */
router.post('/', (req, res, next) => {
  const { name, age } = req.body
  const u = new User({ name, age })
  u.save()
    .then(r => {
      res.send({ success: true, msg: r })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

/* POST signIn */
router.post('/signIn', (req, res, next) => {
  const { id, password } = req.body
  console.log(id)
  console.log(password)

  var success = true;
  if(success) res.json({ success: true})
  else res.json({ success: false})

  //const u = new User{ name, age })
  // u.save()
  //   .then(r => {
  //     res.send({ success: true, msg: r })
  //   })
  //   .catch(e => {
  //     res.send({ success: false, msg: e.message })
  //   })
})

/* PUT home page. */
router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const { name, age } = req.body
  User.updateOne({ _id: id }, { $set: { name, age }})
    .then(r => {
      res.send({ success: true, msg: r })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
  // res.send({ success: true, msg: 'put ok' })
})

/* DELETE home page. */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  User.deleteOne({ _id: id })
    .then(r => {
      res.send({ success: true, msg: r })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
  res.send({ success: true, msg: 'del ok' })
})

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
