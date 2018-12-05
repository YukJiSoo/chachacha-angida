var express = require('express');
var createError = require('http-errors');
var router = express.Router();

const cal = require('../../../models/distance');
// const database = require('../../../services/database.js');

const store = require('../../../db_apis/store.js');

// router.get('/:id', (req, res, next) => {
//   // 디비에서 id에 해당하는 가게정보 불러오기
//   res.send(storeInfo)
// })

router.get('/', async function(req, res, next) {
  console.log("list test");
  console.log(req.query);
  try {
    const context = {};
    if (req.query.store_code) {
      console.log("params.store_code");
      context.store_code = req.query.store_code;
    }

    if (req.query.store_category_code) {
      console.log("params.store_category_code");
      context.store_category_code = req.query.store_category_code;
    }

    if (req.query.search_keyword) {
      console.log("params.keyword");
      context.search_keyword = req.query.search_keyword;
    }

    const rows = await store.find(context);
    console.log(rows);


    // 사용자의 현재 위치 기반의 위도, 경도 정보가 있다면 식당과의 거리를 계산한다.
    if (req.query.lat && req.query.lng) {
      let lat = parseFloat(req.query.lat);
      let lng = parseFloat(req.query.lng);
      rows.forEach((v,i) => {
        rows[i].distance_to_store = cal.getDistance(lat, lng, rows[i].latitude, rows[i].longitude);
        console.log("computed distance_to_store:", rows[i].distance_to_store);
      });
    }

    rows.sort(function (a, b) {
      if (a.distance_to_store > b.distance_to_store) return 1;
      if (a.distance_to_store < b.distance_to_store) return -1;
      return 0;
    });

    if (req.query.store_code) {
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
