var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.use('/user', require('./user'));
router.use('/dbtest', require('./dbtest'));
router.use('/store', require('./store'));
router.use('/point', require('./point'));
router.use('/review', require('./review'));
router.use('/coupon', require('./coupon'));
router.use('/notice', require('./notice'));
router.use('/Q&A', require('./Q&A'));
router.use('/reservation', require('./reservation'));

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
