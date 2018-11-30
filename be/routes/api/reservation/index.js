var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.use('/owner', require('./owner'));

/* GET home page. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  const reserv_lists = [
    {
      store_name: '오제존맛집',
      menu_list: '간짜장 볶음밥 외 2개',
      total_price: '20000원',
      reservation_time: '9/5 19:00',
      arrival_time: '9/5 19:00',
      status: '수락대기',
      //item.endTime.setTime(oldDateObj.getTime() + 100 * 60 * 1000)
      progress: 100,
      times: [
        { id: 0, time: 1 },
        { id: 1, time: 1 },
      ],
      timeinterval: undefined,
      endTime: '2018-11-30T07:30:48.000Z'
    },
    {
      store_name: '알촌',
      menu_list: '간짜장 볶음밥 외 2개',
      total_price: '20000원',
      reservation_time: '9/5 19:00',
      arrival_time: '9/4 19:00',
      status: '예약완료',
      progress: 100,
      times: [
        { id: 0, time: 1 },
        { id: 1, time: 1 },
      ],
      timeinterval: undefined,
      endTime: new Date('Dec 1, 2018 20:55:30')
    },
    {
      store_name: '강서 동국대점3',
      menu_list: '555간짜장 볶음밥 외 2개',
      total_price: '20000원',
      reservation_time: '9/5 19:00',
      arrival_time: '9/3 19:00',
      status: '취소완료',
      progress: 0,
      times: [
        { id: 0, time: 1 },
        { id: 1, time: 1 },
      ],
      timeinterval: undefined,
      endTime: new Date('Dec 1, 2018 06:20:30')
    }
  ]
  var timettt = new Date('2018-11-30T02:43:46.000Z');
  timettt.setTime(timettt.getTime() + 2*540 * 60 * 1000)
  console.log(timettt);

  let t = Date.parse(new Date("2018-11-30T07:30:48.000Z")) - Date.parse(new Date());
  console.log("t:"+t)
  console.log(Date.parse(new Date()))
  console.log(new Date("2018-11-30T07:30:48.000Z"))
  console.log(new Date())
  res.send({reserv_list: reserv_lists});
});


/* PUT 예약상태 수정 */
router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const { name, age } = req.body
  User.updateOne({ _id: id }, { $set: { name, age }})
    .then(r => {
      res.send({ success: true, msg: r })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
  // res.send({ success: true, msg: 'put ok' })
})

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
