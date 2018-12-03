var express = require('express');
var createError = require('http-errors');
var router = express.Router();

const reservation = require('../../../db_apis/reservation.js');
const database = require('../../../services/database.js');

router.use('/owner', require('./owner'));

/* GET home page. */
router.get('/', async function(req, res, next) {

  const context = {};
  context.customer_code = req.query.customer_code;

  const rows = await reservation.find(context);

  rows.forEach((v,i) => {
    rows[i].order_time = new Date(rows[i].order_time.getTime() + 9 * 60 * 60 * 1000)
    rows[i].endTime = rows[i].reserv_time
    rows[i].reserv_time = new Date(rows[i].reserv_time.getTime() + 9 * 60 * 60 * 1000)
    rows[i].times = []
    rows[i].times.push({ id: 0, time: 1 })
    rows[i].times.push({ id: 1, time: 1 })
    rows[i].timeinterval = undefined
    rows[i].progress = 100;
  });

  console.log('==========>router result');
  console.log(rows);

  res.send(rows);
});

/* post 예약 추가 */
router.post('/', async function(req, res, next){
  const id = req.params.id
  const reservationInfo = req.body

  let context = reservationInfo;
  context.payment_amount = context.total_price - context.point_discount - context.coupon_discount
  context.order_status = '수락대기'
  context.review_status = 'N'
  context.customer_code = parseInt(context.customer_code, 10)
  context.store_code = parseInt(context.store_code, 10)
  context.no_of_people = parseInt(context.no_of_people, 10)
  context.coupon_discount = parseInt(context.coupon_discount, 10)
  context.point_discount = parseInt(context.point_discount, 10)

  console.log("reservationInfo context: ", context)
  //var result = await reservation.createTransaction(context);

  var success = await reservation.create(context);
  console.log("reservationInfo result: ", success)

  res.send(success);
})


/* PUT 예약상태 수정 */
router.put('/:id', (req, res, next) => {

})

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
