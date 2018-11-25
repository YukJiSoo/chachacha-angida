var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../models/users');
const cal = require('../../../models/distance')
/* GET home page. */
router.get('/list', function(req, res, next) {
  console.log("list test");
  console.log(cal.getDistance(37.558196, 127.000131, 37.561870, 126.998200))


});

/* POST home page. */
router.post('/', (req, res, next) => {

})

/* PUT home page. */
router.put('/:id', (req, res, next) => {

})

/* DELETE home page. */
router.delete('/:id', (req, res, next) => {

})

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
