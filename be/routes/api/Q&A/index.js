var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const QnAs = [
    {
      title: '내 정보는 어떻게 확인하나요?', //제목
      content: '홈에 왼쪽 위 버튼을 클릭하면 확인할 수 있습니다.',
    },
    {
      title: '예약취소는 어떻게 하나요?',
      content: '식당에서 예약을 받기전에 예약 취소를 누르시거나 시간이 만료되면 따로 매장에 연락하셔야 합니다',
    },
    {
      title: '포인트는 어떻게 적립하나요?',
      content: '저희 앱을 통해 결제하시면 포인트가 쌓이게 됩니다.',
    }
  ]
  res.send({QnA: QnAs});
});

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
