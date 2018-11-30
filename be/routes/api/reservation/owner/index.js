var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id // 점주 id 
  const date = req.body.date // 디비에서 가져올 주문내역의 날짜

  const reservItems = [
    {
      code: 2, // 주문코드
      customerId: '주문자1',
      active: false,
      store_name: '강서 동국대점',
      menu_list: ['간짜장 볶음밥', '짬뽕', '짜장면'],
      price: 20000,
      reservation_time: '9/5 18:30',
      arrival_time: '9/5 19:00',
      status: '수락대기'
    },
    {
      code: 2, // 주문코드
      customerId: '주문자1',
      active: false,
      store_name: '강서 동국대점',
      menu_list: ['간짜장 볶음밥', '짬뽕', '짜장면'],
      price: 20000,
      reservation_time: '9/5 18:30',
      arrival_time: '9/5 19:00',
      status: '수락대기'
    },
  ]
  res.send(reservItems);
});


/* PUT 예약상태 수정 */
router.put('/:id', (req, res, next) => {
  const id = req.params.id
  var {status, code} = req.body

  if(status === 'agree'){
    // 수락대기 -> 수락완료
    console.log(status)
    status = 'agreeOk'
  }
  else if(status === 'refuse'){
    // 거절
    console.log(status)
    status = 'refuseOk'
  }
  console.log(code)
  res.send(status);
})

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
