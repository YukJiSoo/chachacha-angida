var express = require('express');
var createError = require('http-errors');
var router = express.Router();

const cal = require('../../../models/distance')
const database = require('../../../services/database.js');

/* GET home page. */
router.get('/:id', (req, res, next) => {
  const storeId = req.params

  var storeInfo = {
    img: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/menucategory%2Fall.PNG?alt=media&token=53c537f8-caa2-499b-bab3-569cc54e4bbe',
    name: '토끼정',
    explain: '토끼토끼',
    rating: 4,
    reviewNum: 10,
    address: '어디어디',
    phone: '전화번호',
  }
  
  // 디비에서 id에 해당하는 가게정보 불러오기

  res.send(storeInfo)
})

router.get('/list/', async function(req, res, next) {
  console.log("list test");
  console.log(cal.getDistance(37.558196, 127.000131, 37.561870, 126.998200))
  
  const { category, lat, lng, keyword, locationLimit} = req.query
  console.log(category, lat, lng, keyword, locationLimit)
  // 필요한 데이터
  var storeList = [
    {
      onOff: true,
      STORE_NAME: '토끼정 강남점',
      TOTAL_RATE: 5,
      nowSeat: 10,
      limitSeat: 30,
      STORE_TAG: ['tag1','tag2','tag3'], // 스트링 #~#~#~
      PROFILE_IMG_URL: 'https://firebasestorage.googleapis.com/v0/b/angida-fe7f6.appspot.com/o/menucategory%2Fall.PNG?alt=media&token=53c537f8-caa2-499b-bab3-569cc54e4bbe',
      STORE_ID: 123
    }
  ]

  if(keyword) { }// 키워드 기반 검색
  else if(category) { }// 카테고리 기반 검색
  else {}// 위치기반 검색

  const query = 'select * from restaurant';
  try {
    const context = {};

    const result = await database.simpleExecute(query);
    console.log(result.rows);
    storeList = result.rows;

    res.json(storeList)

  } catch (err) {
    next(err);
  }

  // console.log(cal.getDistance(37.558196, 127.000131, 37.561870, 126.998200))

  
  //
  // 파라미터
  // - 사용자의 현재 위치 좌표-위도
  // - 사용자의 현재 위치 좌표-경도
  // - 메뉴카테고리(옵션)
  // - 키워드(옵션)
  // - 검색반경
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
