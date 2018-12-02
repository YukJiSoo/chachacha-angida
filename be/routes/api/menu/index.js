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
    console.log(context);
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

function getMenuFromRec(menu, storeId) {
  const menuItem = {
    store_code : storeId,
    menu_name : menu.menu_name,
    menu_img_url : menu.menu_img_url,
    menu_desc : menu.menu_desc,
    menu_price : parseInt(menu.menu_price,10),
  };

  return menuItem;

}

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
      context.menu_name = menu.menu_name;
      context.menu_img_url = menu.menu_img_url
      context.menu_desc = menu.desc
      context.menu_price = menu.menu_price
    }

    console.log(context);
    const rows = await menu.create(context);
    console.log(rows);

    res.status(201).json(rows);

  } catch (err) {
    console.log(err)
    next(err);
  }
})

/* PUT home page. */
router.put('/:storeId/:menuId', async function(req, res, next){
  const {storeId, menuId} = req.params
  const menu = req.body

  console.log(menu)
  // 디비에 메뉴 추가하는 로직 작성 필요
  console.log("menu list test");
  
  try {
    let putContext = getMenuFromRec(menu, storeId);
    //putContext.menu_code = menuId
    // const putContext = {};
    // if (storeId) {
    //   putContext.store_code = storeId;
    //   putContext.menu_name = menu.menu_name;
    //   putContext.menu_img_url = menu.menu_img_url
    //   putContext.menu_desc = menu.menu_desc
    //   putContext.menu_price = parseInt(menu.menu_price,10)
    //   putContext.menu_code = menuId
    // }

    //console.log(putContext)
    putContext = await menu.updateMenu(putContext);
    console.log(rows);

    if(rows !== null) res.status(201).json(rows);
    else res.status(404).end()

  } catch (err) {
    console.log(err)
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
