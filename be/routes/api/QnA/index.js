var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("QnA test");

});

/* POST home page. */
router.post('/', (req, res, next) => {

})

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
