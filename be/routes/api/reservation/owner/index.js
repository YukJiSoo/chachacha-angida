var express = require('express');
var createError = require('http-errors');
var router = express.Router();

const reservation = require('../../../../db_apis/reservation.js');

/* GET home page. 수락대기, 예약완료만*/
router.get('/:id', async function(req, res, next) {
  const id = req.params.id // 점주 id 
  
  const context = {};
  context.id = id;

  const rows = await reservation.findOwner(context);

  let orders = rows[0]
  let menu_names = rows[1]

  orders.forEach((v,i) => {
    orders[i].actice = false
    orders[i].menu_name = menu_names[i]
  });

  console.log('==========>router result');
  console.log(orders);

  res.send(orders);

});

/* GET home page. 수락대기, 예약완료만*/
router.get('/all/:id', async function(req, res, next) {
  const id = req.params.id // 점주 id 

  const context = {};
  context.id = id;

  const rows = await reservation.findOwnerAll(context);

  let orders = rows[0]
  let menu_names = rows[1]

  orders.forEach((v,i) => {
    orders[i].actice = false
    orders[i].menu_name = menu_names[i]
  });

  console.log('==========>router result');
  console.log(orders);

  res.send(orders);

});

/* PUT 예약상태 수정 */
router.put('/:id', async function(req, res, next) {
  const id = req.params.id
  var order_status = req.body.status

  let context = {};
  context.order_code = id

  if(order_status === 'agree'){
    // 수락대기 -> 수락완료
    console.log(order_status)
    context.order_status = '예약완료'
  }
  else if(order_status === 'refuse'){
    // 거절
    console.log(order_status)
    context.order_status = '예약취소'
  }
  
  const rows = await reservation.update(context);

  if(rows) res.send(rows);
  else res.status(404).end();
  
})

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;