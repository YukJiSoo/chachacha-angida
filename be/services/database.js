const oracledb = require('oracledb');
const dbConfig = require('../db/database.js');

async function initialize() {
  const pool = await oracledb.createPool(dbConfig.hrPool);
}

module.exports.initialize = initialize;

async function close() {
  await oracledb.getPool().close();
}

module.exports.close = close;

function simpleExecute(statement, binds = [], opts = {}) {
  console.log("simpleExecute return")
  return new Promise(async (resolve, reject) => {
    let conn;
    console.log("simpleExecute start")
    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;
    console.log("simpleExecute 0")
    try {
      console.log("simpleExecute 1")
      conn = await oracledb.getConnection();
      console.log("simpleExecute 2")
      const result = await conn.execute(statement, binds, opts);
      console.log("simpleExecute 3")
      resolve(result);
    } catch (err) {
      console.log(err)
      reject(err);
    } finally {
      if (conn) { // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}

module.exports.simpleExecute = simpleExecute;

const create_RERSERV_ORDER_Query =
 `insert into reserv_order (
    order_code, order_time, total_price, no_of_people,
    reserv_time, point_discount, coupon_discount, order_status,
    customer_code, store_code, review_status
  ) values (
    AUTO.NEXTVAL, :order_time, :total_price, :no_of_people,
    :reserv_time, :point_discount, :coupon_discount, :order_status,
    :customer_code, :store_code, :review_status
  ) returning order_code
  into :order_code`
const create_MENU_ORDER_ITEM_Query =
`insert into menu_order_item (
  order_code, store_code, menu_code, menu_num
) values
( :order_code, :store_code, :menu_code :menu_num ) `
const update_CUSTOMER_COUPON_Query =
`update customer_coupone
 set coupon_status = :coupon_status
 where coupon_code = :coupon_code and customer_code = :customer_code`
const update_CUSTOMER_POINT_Query =
`update customer_point
set total_point = total_point - :coupon_discount
where customer_code = :customer_code`
const insert_PAYMENTQuery =
`insert into payment (
    order_code, payment_date, store_name,
    payment_amount, payment_status
  ) values (
    :order_code, sysdate, :store_name,
    :payment_amount, :payment_status
  ) `
function simpleTrasactionForOrder(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;

    if(isEmpty(opts)) {

    }
    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = false;

    try {

      conn = await oracledb.getConnection();

      binds.order_code = {
        dir: oracledb.BIND_OUT,
        type: oracledb.NUMBER
      }

      var order_options = {
        bindDefs: {
          order_time: { type: oracledb.DATE},
          reserv_time: { type: oracledb.DATE},
          total_price: { type: oracledb.NUMBER},
          no_of_people: { type: oracledb.NUMBER},
          point_discount: { type: oracledb.NUMBER},
          coupon_discount: { type: oracledb.NUMBER},
          order_status: { type: oracledb.STRING, maxSize: 5},
          customer_code: { type: oracledb.NUMBER},
          store_code: { type: oracledb.NUMBER},
          review_status: { type: oracledb.STRING, maxSize: 5}
        } };

      /* RESERV_ORDER Insert */
      const result = await conn.execute(create_RERSERV_ORDER_Query, binds, order_options)
      const created_order_code = result.outBinds.order_code[0]
      order_code = parseInt(created_order_code,10)
      console.log("가져온 order_code:", created_order_code)
      for(var i=0; i<binds.menuItems.length; i++){
        binds.menuItems[i].order_code = created_order_code
      }

      /* START: MENU_ORDER_ITEM Insert (주문한 메뉴의 개수만큼 삽입해야한다.)  */
      // :order_code, :store_code, :menu_code :menu_num 필요함
      var menu_order_item_binds = binds.menuItems;
      var menu_options = {
        bindDefs: {
          order_code: { type: oracledb.NUMBER},
          store_code: { type: oracledb.NUMBER},
          menu_code: { type: oracledb.NUMBER},
          menu_num: { type: oracledb.NUMBER},
        } };
      const result = await conn.executeMany(create_MENU_ORDER_ITEM_Query, menu_order_item_binds, menu_options);
      /* END: MENU_ORDER_ITEM Insert (주문한 메뉴의 개수만큼 삽입해야한다.)  */

      /* [Optionnal] CUSTOMER_COUPON Update Copon_status =  Y */
      if (binds.coupon_discount !== 0){
        const result = await conn.execute(create_CUSTOMER_COUPON_Query, binds, opts);
      }
      /* [Optionnal] CUSTOMER_POINT Update TOTAL_POINT = TOTAL_POINT - coupon_discount*/
      if (binds.point_discount !== 0){
        const result = await conn.execute(create_RERSERV_ORDER_Query, binds, opts);
      }
      /* PAYMENT Insert -> 성공하면 commit */
      opts.autoCommit = true;
      const result = await conn.execute(create_RERSERV_ORDER_Query, binds, opts);

      resolve(result);
    } catch (err) {
      console.log(err)
      reject(err);
    } finally {
      if (conn) { // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}

module.exports.simpleExecute = simpleTrasactionForOrder;
// 
// function isEmpty(obj) {
//     for(var key in obj) {
//         if(obj.hasOwnProperty(key))
//             return false;
//     }
//     return true;
// }
