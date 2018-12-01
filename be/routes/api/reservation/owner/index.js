var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET home page. 수락대기, 예약완료만*/
router.get('/:id', async function(req, res, next) {
  const id = req.params.id // 점주 id 

  const context = {};
  context.id = id;

  const rows = await reservation.findOwner(context);

  rows.forEach((v,i) => {
    rows[i].endTime = new Date()
    rows[i].times = []
    rows[i].times.push({ id: 0, time: 1 })
    rows[i].times.push({ id: 1, time: 1 })
    rows[i].timeinterval = undefined
    rows[i].progress = 100
    rows[i].endTime.setTime(rows[i].endTime.getTime() + 100 * 60 * 1000)
  });

  console.log('==========>router result');
  console.log(rows);

  res.send(rows);

  const reservItems = 
  res.send(reservItems);
});


/* PUT 예약상태 수정 */
router.put('/:id', (req, res, next) => {
  const id = req.params.id
  var {status, code} = req.body

  if(status === 'agree'){
    // 수락대기 -> 수락완료
    console.log(status)
    status = 'agreeOk'
  }
  else if(status === 'refuse'){
    // 거절
    console.log(status)
    status = 'refuseOk'
  }
  console.log(code)
  res.send(status);
})

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
