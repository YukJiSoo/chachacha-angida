var express = require('express');
var createError = require('http-errors');
var router = express.Router();

const point = require('../../../db_apis/point.js');
const database = require('../../../services/database.js');

/* GET point  . */
router.get('/', async function(req, res, next) {
  const context = {};

  console.log("point test");
  console.log(req.query);

  try {
    const context = {};
    if (req.query.customer_code) {
      console.log("point query.customer_code");
      context.customer_code = parseInt(req.query.customer_code, 10);
    }
    console.log(context);
    const rows = await point.find(context);
    console.log(rows);

    if (req.query.customer_code) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
});

/* GET point detail . */
router.get('/list/:id', function(req, res, next) {
  const id = req.params.id
  // 디비 만들어지면 테스트
  // const context = {};

  // context.id = parseInt(id, 10);

  // const rows = await employees.findList(context);

  // console.log('==========>router result');
  // console.log(result.rows);

  // if (id) {
  //   if (rows.length === 1) {
  //     res.status(200).json(rows);
  //   } else {
  //     res.status(404).end();
  //   }
  // } else {
  //   res.status(200).json(rows);
  // }

  var POINT_LIST = [{ OCCUR_COUNT: 1, STORE_NAME: '토끼정', OCCUR_DATE: '2018.11.23', OCCUR_POINT: 100 }]

  res.json(POINT_LIST)
});

/* PUT home page. */
router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const point = req.body.point
  console.log(point)
  // 디비 만들어지면 테스트
  // const context = {};

  // context.customer_point = parseInt(id, 10);
  // context.total_point = point;

  // const rows = await point.update(context);

  // console.log('==========>router result');
  // console.log(rows);

  // if (rows !== null) {
  //   res.status(200).json(rows);
  // } else {
  //   res.status(404).end();
  // }

  var POINT_LIST = [{ OCCUR_COUNT: 1, STORE_NAME: '토끼정', OCCUR_DATE: '2018.11.23', OCCUR_POINT: 100 }]

  res.json(POINT_LIST)
})

module.exports = router;
