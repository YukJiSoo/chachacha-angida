var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const cal = require('../../../models/distance')
/* GET home page. */

router.use('/menu', require('./menu'));
router.use('/onOff', require('./onOff'));

router.get('/list', function(req, res, next) {
  console.log("list test");
  console.log(cal.getDistance(37.558196, 127.000131, 37.561870, 126.998200))

  //
  // 파라미터
  // - 사용자의 현재 위치 좌표-위도
  // - 사용자의 현재 위치 좌표-경도
  // - 메뉴카테고리(옵션)
  // - 키워드(옵션)
  // 메뉴카테고리, 키워드검색 조건으로 select 쿼리날려서 데이터가져오기
  // 가져온 식당 데이터의 위치 좌표와 사용자의 현재 위치 좌표를 계산하여 두 위치 사이의 거리를 구한다.
  // 계산한 거리를 오름차순으로 정렬한다.
  // 정렬 후 응답메시지로 정렬된 데이터를 보낸다.

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
