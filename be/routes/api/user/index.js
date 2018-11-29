var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../models/users');

router.use('/owner', require('./owner'));

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find()
    .then(r => {
      res.send({ success: true, users: r })
    })
    .catch(e => {
      res.send({ success: false })
    })
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
  if(success) res.json({ success: true, code: 66 })
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
