var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const menu = require('../../../db_apis/menu.js');

/* GET menu page. 모든 메뉴 출력*/
router.get('/', async function(req, res, next) {
  console.log("menu list test");
  console.log(req.query);
  try {
    const context = {};
    if (req.query.store_code) {
      console.log("menu params.store_code");
      context.store_code = req.query.store_code;
    }

    const rows = await menu.find(context);
    console.log(rows);

    if (req.query.menu_code) {
      if (rows.length === 1) {
        console.log(req.query.menu_code)
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
});

/* POST home page. */
router.post('/:storeId', async function(req, res, next) {
  const storeId = req.params.storeId
  const menu = req.body
  console.log(menu)
  // 디비에 메뉴 추가하는 로직 작성 필요
  console.log("menu list test");
  
  try {
    const context = {};
    if (storeId) {
      context.store_code = storeId;
      context.menu = menu;
    }

    const rows = await menu.create(context);
    console.log(rows);

    res.status(201).json(rows);

  } catch (err) {
    next(err);
  }
})

/* PUT home page. */
router.put('/:storeId/:menuId', async (req, res, next) => {
  const {storeId, menuId} = req.params
  const menu = req.body

  console.log(menu)
  // 디비에 메뉴 추가하는 로직 작성 필요
  console.log("menu list test");
  
  try {
    const context = {};
    if (storeId) {
      context.store_code = storeId;
      context.menu_code = menuId;
      context.menu = menu;
    }

    const rows = await menu.update(context);
    console.log(rows);

    if(rows !== null) res.status(201).json(rows);
    else res.status(404).end()

  } catch (err) {
    next(err);
  }
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
