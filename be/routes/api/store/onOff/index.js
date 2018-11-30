var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  
  // 디비에 onOff정보 가져오는 로직 작성 필요

  var status = true
  res.send(status)
});

/* PUT home page. */
router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const status = req.body.status

  // 디비에 onOff정보 변경하는 로직 작성 필요
  
  res.send(status)
})

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
