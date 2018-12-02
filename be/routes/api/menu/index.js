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


/* POST home page. */
router.post('/:storeId', async function(req, res, next) {
  console.log("menu list test");
  console.log(req.body);
  try {
    const context = {};
    if (true) {
      console.log("menu params.store_code");
      context.store_code = req.params.storeId
      context.menu_name = req.body.menu_name
      context.menu_img_url = req.body.menu_img_url
      context.menu_desc = req.body.menu_desc
      context.menu_price = req.body.menu_price
    }
    console.log(context);
    const rows = await menu.create(context);
    console.log(rows);

    if(rows !== null) res.status(201).json(rows);
    else res.status(404).end()

  } catch (err) {
    console.log(err)
    next(err);
  }
})

/* PUT home page. */
router.put('/:storeId/:menuId', async function(req, res, next){
  console.log("menu list test");
  console.log(req.body);
  try {
    const context = {};
    if (true) {
      console.log("menu params.store_code");
      context.store_code = req.params.storeId
      context.menu_name = req.body.menu_name
      context.menu_img_url = req.body.menu_img_url
      context.menu_desc = req.body.menu_desc
      context.menu_price = req.body.menu_price
      context.menu_code = req.params.menuId
    }
    console.log(context);
    const rows = await menu.updateMenu(context);
    console.log(rows);

    if(rows !== null) res.status(201).json(rows);
    else res.status(404).end()

  } catch (err) {
    console.log(err)
    next(err);
  }
})

/* DELETE home page. */
router.delete('/:storeId/:menuId', async (req, res, next) => {
  console.log("menu list test");
  console.log(req.body);
  try {
    const context = {};
    if (true) {
      console.log("menu params.store_code");
      context.store_code = req.params.storeId
      context.menu_code = req.params.menuId
    }
    console.log(context);
    const rows = await menu.delete(context);
    console.log(rows);

    if(rows !== null) res.status(201).json(rows);
    else res.status(404).end()

  } catch (err) {
    console.log(err)
    next(err);
  }
})

router.all('*', function(req, res, next) {
  console.log("존재하지않음")
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
