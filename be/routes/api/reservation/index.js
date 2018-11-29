var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.use('/owner', require('./owner'));

/* GET home page. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  const reserv_lists = [
    {
      store_name: '강서 동국대점',
      menu_list: '간짜장 볶음밥 외 2개',
      total_price: '20000원',
      reservation_time: '9/5 18:30',
      arrival_time: '9/5 19:00',
      status: '수락대기'
    },
    {
      store_name: '강서 동국대점',
      menu_list: '간짜장 볶음밥 외 2개',
      total_price: '20000원',
      reservation_time: '9/4 18:30',
      arrival_time: '9/4 19:00',
      status: '예약완료'
    },
    {
      store_name: '강서 동국대점',
      menu_list: '간짜장 볶음밥 외 2개',
      total_price: '20000원',
      reservation_time: '9/3 18:30',
      arrival_time: '9/3 19:00',
      status: '취소완료'
    },
    {
      store_name: '강서 동국대점',
      menu_list: '간짜장 볶음밥 외 2개',
      total_price: '20000원',
      reservation_time: '9/2 18:30',
      arrival_time: '9/2 19:00',
      status: '방문완료'
    },
    {
      store_name: '강서 동국대점',
      menu_list: '간짜장 볶음밥 외 2개',
      total_price: '20000원',
      reservation_time: '9/2 18:30',
      arrival_time: '9/2 19:00',
      status: '수락대기'
    },
  ]
  res.send({reserv_list: reserv_lists});
});


/* PUT 예약상태 수정 */
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

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
