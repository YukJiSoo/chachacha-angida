var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET coupon list. */
router.get('/list/:id', function(req, res, next) {
  console.log('유저 쿠폰 리스트 받아오기  - 디비 연결 추가해야함')
  const id = req.params.id
  console.log(id)

  res.json([
    { 
    name:'생일 기념 할인 쿠폰',
    firstDay: '2018.11.27',
    lastDay: '2018.12.27',
    discount: 1000
    },
    { 
      name:'생일 기념 할인 쿠폰',
      firstDay: '2018.11.27',
      lastDay: '2018.12.27',
      discount: 1000 
    }
  ])
});

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
