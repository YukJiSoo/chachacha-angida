var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET reservation history - client side */
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  const orderItems = [
    {
      code: 2, // 주문코드
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
      code: 1,
      title: '주문자2',
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
