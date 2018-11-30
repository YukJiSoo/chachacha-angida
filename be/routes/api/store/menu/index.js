var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET menu page. 모든 메뉴 출력*/
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  const menu_lists = [
    {
      code: 1,
      image: 'https://randomuser.me/api/portraits/men/85.jpg',
      name: '토끼고기',
      explain: '토끼고기 입니다',
      price: 1000
    },
    {
      code: 2,
      image: 'https://randomuser.me/api/portraits/men/85.jpg',
      name: '토끼정',
      explain: '토끼',
      price: 1000
    },
    {
      code: 3,
      image: 'https://randomuser.me/api/portraits/men/85.jpg',
      name: '토끼정',
      explain: '토끼',
      price: 1000
    }
  ]

  // 디비에서 모든메뉴 받아오는 로직 작성 필요

  res.send(menu_lists);

});

/* GET menu page. 선택된 메뉴 출력*/
router.get('/:storeId/:menuId', function(req, res, next) {
  const {storeId, menuId} = req.params
  const menu =  {
    image: 'https://randomuser.me/api/portraits/men/85.jpg',
    name: '토끼정',
    explain: '토끼',
    price: 1000
  }
  // 디비에서 선택된(menuId)메뉴 받아오는 로직 작성 필요

  res.send(menu)
});

/* POST home page. */
router.post('/:storeId', (req, res, next) => {
  const storeId = req.params.storeId  
  const menu = req.body

  // 디비에 메뉴 추가하는 로직 작성 필요
  
  res.send(menu)
})

/* PUT home page. */
router.put('/:storeId/:menuId', (req, res, next) => {
  const {storeId, menuId} = req.params
  const menu = req.body
  
  // 디비에 메뉴 업데이트하는 로직 작성 필요
  
  res.send(menu)
})

/* DELETE home page. */
router.delete('/:storeId/:menuId', (req, res, next) => {
  const {storeId, menuId} = req.params
  var success = true
  // 디비에 메뉴 삭제하는 로직 작성 필요
  
  res.send(success)
})

router.all('*', function(req, res, next) {
  console.log("존재하지않음")
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
