var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const notice = require('../../../db_apis/notice.js');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const context = {};
    if (req.query.notice_code) {
      // console.log("review params.store_code");
      context.notice_code = req.query.notice_code;
    }

    const rows = await notice.find(context);
    console.log(rows);

    if (req.query.notice_code) {
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

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
