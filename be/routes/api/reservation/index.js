var express = require('express');
var createError = require('http-errors');
var router = express.Router();

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

/* GET reservation history - client side */
router.get('/owner/wait', function(req, res, next) {
  const orderItems = [
    {
      title: '주문자1',
      cost: '10000원',
      active: true,
      status: false,
      items: [
        { menu: '음식1, 음식2, 음식3' },
        { time: '오전 1시 10분' }
      ]
    },
    {
      title: '주문자2',
      cost: '10000원',
      active: true,
      status: false,
      items: [

        { menu: '음식1, 음식2, 음식3' },
        { time: '오전 1시 10분' }
      ]
    },{
      title: '주문자3',
      cost: '10000원',
      active: true,
      status: false,
      items: [

        { menu: '음식1, 음식2, 음식3' },
        { time: '오전 1시 10분' }
      ]
    },{
      title: '주문자4',
      cost: '10000원',
      active: true,
      status: false,
      items: [

        { menu: '음식1, 음식2, 음식3' },
        { time: '오전 1시 10분' }
      ]
    }
  ]

  res.send({orderItems: orderItems});
});

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
