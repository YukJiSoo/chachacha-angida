var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET home page. */
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

/* POST home page. */
router.post('/', (req, res, next) => {
  
})

/* PUT home page. */
router.put('/:id', (req, res, next) => {
  const id = req.params.id
  console.log(id)
  
  const userInfo = req.body

  res.json(userInfo);
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
