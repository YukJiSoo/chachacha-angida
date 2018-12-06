var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const notice = require('../../../db_apis/qna.js');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const context = {};
    if (req.query.qna_code) {
      // console.log("review params.store_code");
      context.qna_code = req.query.qna_code;
    }

    const rows = await notice.find(context);
    console.log(rows);

    if (req.query.qna_code) {
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

router.post('/:customerId', async function(req, res, next) {
  console.log(req.body);
  try {
    const context = {};
    if (true) {
      console.log("qna params.customer_code");
      context.qna_category = req.params.qna_category
      context.question = req.body.question
      context.answer = req.body.answer
      context.customer_code = req.body.customer_code
      context.manager_code = req.body.manager_code
    }
    console.log(context);
    const rows = await qna.create(context);
    console.log(rows);

    if(rows !== null) res.status(201).json(rows);
    else res.status(404).end()

  } catch (err) {
    console.log(err)
    next(err);
  }
})


router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
