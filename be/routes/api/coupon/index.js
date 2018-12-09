var express = require('express');
var createError = require('http-errors');
var router = express.Router();

const coupon = require('../../../db_apis/coupon.js');
const database = require('../../../services/database.js');

/* GET coupon list. */
router.get('/list/:id', async function(req, res, next) {
  const id = req.params.id
  // 디비 만들어지면 테스트
  const context = {};
  context.id = parseInt(id, 10);
  console.log("coupon index.js:", context.id);
  try{
    const result = await coupon.findCoupon(context);

    console.log('==========>router result');
    console.log(result);
    res.status(201).json(result.rows);
  } catch (err) {
    console.log(err);
    next(err);
  }

  // var COUPON_LIST =
  // [{
  //   coupon_code: 1,
  //   coupon_name:'생일 기념 할인 쿠폰',
  //   issued_date: '2018.11.27',
  //   end_date: '2018.12.27',
  //   discount_amount: 2000,
  //   coupon_status: '사용',
  //   min_order_amount: 100,
  //  },
  //  {
  //   coupon_code: 2,
  //   coupon_name:' 할인 쿠폰',
  //   issued_date: '2018.11.27',
  //   end_date: '2018.12.27',
  //   discount_amount: 2000,
  //   coupon_status: '사용',
  //   min_order_amount: 100,
  //  }
  // ]
  //
  // res.json(COUPON_LIST)
});

// 점주가 리뷰를 쓴 사용자에게 쿠폰을 발급해줌.
router.post('/', async function(req, res, next) {
  const couponInfo = req.body;
  console.log("couponInfo:", couponInfo);
  try{
    var result = await coupon.create(couponInfo);
    console.log("coupon/index.js post result >> ", result);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})


/* PUT coupon - 상태변경 */
router.put('/:userId/:couponId', async function(req, res, next) {
  const userId = req.params.userId
  const couponId = req.params.couponId
  const status = req.body.status
  // 디비 만들어지면 테스트
  // const context = {};

  // context.userId = parseInt(userId, 10);
  // context.couponId = parseInt(couponId, 10);
  // context.status = status;

  // const rows = await employees.update(context);

  // console.log('==========>router result');
  // console.log(rows);

  // if (id) {
  //   if (rows.length === 1) {
  //     res.status(200).json(rows);
  //   } else {
  //     res.status(404).end();
  //   }
  // } else {
  //   res.status(200).json(rows);
  // }

  var COUPON_LIST =
  [{
    coupon_code: 1,
    coupon_name:'생일 기념 할인 쿠폰',
    issued_date: '2018.11.27',
    end_date: '2018.12.27',
    discount_amount: 2000,
    coupon_status: '사용',
    min_order_amount: 100,
   },
   {
    coupon_code: 2,
    coupon_name:' 할인 쿠폰',
    issued_date: '2018.11.27',
    end_date: '2018.12.27',
    discount_amount: 2000,
    coupon_status: '사용',
    min_order_amount: 100,
   }
  ]

  res.json(COUPON_LIST)
});

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
