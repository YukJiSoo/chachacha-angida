var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  
  var status = true
  res.send(status)
});

/* POST home page. */
router.post('/', (req, res, next) => {

})

/* PUT home page. */
router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const status = req.body.status

  console.log(status)
  
  res.send(status)
})

/* DELETE home page. */
router.delete('/:id', (req, res, next) => {

})

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
