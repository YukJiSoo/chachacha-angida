var express = require('express');
var createError = require('http-errors');
var router = express.Router();

// 사용자가 작성한 리뷰 get
router.get('/:id', function(req, res, next) {

})

// 식당에 등록된 리뷰 get
router.get('/owner/:id', function(req, res, next) {
  const id = req.params.id
  var reviewList = [
    {
      ID: '차민형',
      title: '맛있다',
      subtitle: "맛있다"
    },
    {
      ID: '박준서',
      title: '맛없다',
      subtitle: "맛없다"
    },
    {
      ID: '육지수',
      title: '걍그럼',
      subtitle: "걍그럼"
    }
  ]
  res.send(reviewList)
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
