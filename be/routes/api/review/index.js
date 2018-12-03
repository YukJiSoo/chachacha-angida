var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const review = require('../../../db_apis/review.js');
// 사용자가 작성한 리뷰 get
router.get('/', async function(req, res, next) {
  console.log("review list test");
  console.log(req.query);
  try {
    const context = {};
    if (req.query.store_code) {
      console.log("review params.store_code");
      context.store_code = req.query.store_code;
    }

    const rows = await review.find(context);
    console.log(rows);

    if (req.query.review_code) {
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
})

// 식당에 등록된 리뷰 get
router.get('/owner/:id', async function(req, res, next) {
  const id = req.params.id

  const context = {};
  context.store_code = id;

  const rows = await review.findOwner(context);

  console.log('==========>router result');
  console.log(rows);

  res.send(rows)
})

// 사용자가 리뷰 작성 post
router.post('/:id', function(req, res, next) {

})

// 사용자가 리뷰 정보 변경 put
router.put('/:id', function(req, res, next) {

})

// 사용자가 리뷰 삭제 delete
router.delete('/:id', function(req, res, next) {

})

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
