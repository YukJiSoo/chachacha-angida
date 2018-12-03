var express = require('express');
var createError = require('http-errors');
var router = express.Router();

const reservation = require('../../../db_apis/reservation.js');
const database = require('../../../services/database.js');

router.use('/owner', require('./owner'));

/* GET home page. */
router.get('/', async function(req, res, next) {

  const context = {};
  context.id = id;

  const rows = await reservation.find(context);

  rows.forEach((v,i) => {
    rows[i].endTime = new Date()
    rows[i].times = []
    rows[i].times.push({ id: 0, time: 1 })
    rows[i].times.push({ id: 1, time: 1 })
    rows[i].timeinterval = undefined
    rows[i].progress = 100
    rows[i].endTime.setTime(rows[i].endTime.getTime() + 100 * 60 * 1000)
  });

  console.log('==========>router result');
  console.log(rows);

  res.send(rows);
});

/* post 예약 추가 */
router.post('/', async function(req, res, next){
  const id = req.params.id
  const reservationInfo = req.body
  console.log("reservationInfo", reservationInfo)

  let context = reservationInfo;
  context.payment_amount = context.total_price - context.point_discount - context.coupon_discount
  context.order_status = '수락대기'
  context.review_status = 'N'
  context.customer_code = parseInt(context.customer_code, 10)
  context.store_code = parseInt(context.store_code, 10)
  for(var i = 0; i < context.menuItems.length; i++){
    context.menuItems[i].menucode = parseInt(context.menuItems[i].menucode, 10)
  }

  console.log(context)

  var success = await reservation.create(context);

  //console.log(success)

  res.send(success);
})


/* PUT 예약상태 수정 */
router.put('/:id', (req, res, next) => {

})

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
