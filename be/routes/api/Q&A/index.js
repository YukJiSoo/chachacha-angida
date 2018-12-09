var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const qna = require('../../../db_apis/qna.js');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const context = {};
    if (req.query.qna_code) {
      context.qna_code = req.query.qna_code;
    }

    const rows = await qna.find(context);
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

router.post('/', async function(req, res, next) {
  const qnaInfo = req.body;
  console.log("qnaInfo:", qnaInfo);
  try{
    var result = await qna.create(qnaInfo);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})


router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
