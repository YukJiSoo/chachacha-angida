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
  return new Promise(async (resolve, reject) => {
    let conn;
    
    
    if (isEmpty(opts)) {
      console.log("simpleExecute >> opts is empty. so autoCommit is true");
      opts.autoCommit = true;
    }

    opts.outFormat = oracledb.OBJECT;
    try {

      conn = await oracledb.getConnection();
      // console.log("simpleExecute binds>> ", binds)
      const result = await conn.execute(statement, binds, opts);
      // console.log(result)
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

// var transactionStatements = []
// const create_RERSERV_ORDER_Query =
//  `insert into reserv_order (
//     order_code, order_time, total_price, no_of_people,
//     reserv_time, point_discount, coupon_discount, order_status,
//     customer_code, store_code, review_status
//   ) values (
//     reserv_order_seq.NEXTVAL, :order_time, :total_price, :no_of_people,
//     :reserv_time, :point_discount, :coupon_discount, :order_status,
//     :customer_code, :store_code, :review_status
//   ) returning order_code into :order_code`;
// const create_MENU_ORDER_ITEM_Query =
// `insert into menu_order_item (
//   order_code, store_code, menu_code, menu_num
// ) values
// ( :order_code, :store_code, :menu_code :menu_num ) `;
// const update_CUSTOMER_COUPON_Query =
// `update customer_coupone
//  set coupon_status = :coupon_status
//  where coupon_code = :coupon_code and customer_code = :customer_code`;
// const update_CUSTOMER_POINT_Query =
// `update customer_point
// set total_point = total_point - :point_discount
// where customer_code = :customer_code`;
// const insert_PAYMENT_Query =
// `insert into payment (
//     order_code, payment_date, store_name,
//     payment_amount, payment_status
//   ) values (
//     :order_code, sysdate, :store_name,
//     :payment_amount, :payment_status
//   ) `;
// function simpleTrasactionForOrder(statement, binds = [], opts = {}) {
//   return new Promise(async (resolve, reject) => {
//     let conn;
//
//     opts.outFormat = oracledb.OBJECT;
//     opts.autoCommit = false;
//
//     try {
//
//       conn = await oracledb.getConnection();
//
//       // var order_binds = {};
//       // order_binds.order_time = binds.order_time;
//       // order_binds.reserv_time = binds.reserv_time;
//       // order_binds.total_price = binds.total_price;
//       // order_binds.no_of_people = binds.no_of_people;
//       // order_binds.point_discount = binds.point_discount;
//       // order_binds.coupon_discount = binds.coupon_discount;
//       // order_binds.order_status = binds.order_status;
//       // order_binds.customer_code = binds.customer_code;
//       // order_binds.store_code = binds.store_code;
//       // order_binds.review_status = binds.review_status;
//       // order_binds.order_code = { dir: oracledb.BIND_OUT, type: oracledb.NUMBER };
//
//       var order_options = {
//         bindDefs: {
//           order_time: { type: oracledb.DATE},
//           reserv_time: { type: oracledb.DATE},
//           total_price: { type: oracledb.NUMBER},
//           no_of_people: { type: oracledb.NUMBER},
//           point_discount: { type: oracledb.NUMBER},
//           coupon_discount: { type: oracledb.NUMBER},
//           order_status: { type: oracledb.STRING, maxSize: 5},
//           customer_code: { type: oracledb.NUMBER},
//           store_code: { type: oracledb.NUMBER},
//           review_status: { type: oracledb.STRING, maxSize: 5}
//         } };
//       const result = {};
//       /* RESERV_ORDER Insert */
//       // const result = await conn.execute(create_RERSERV_ORDER_Query, order_binds, order_options)
//       //const result = await conn.execute(statement.create_RERSERV_ORDER_Query, binds[0], order_options)
//       //const created_order_code = result.outBinds.order_code[0]
//       //order_code = parseInt(created_order_code,10)
//       //console.log("가져온 order_code:", created_order_code)
//       //for(var i=0; i<binds.menuItems.length; i++){
//       //  binds.menuItems[i].order_code = created_order_code
//       //}
//
//       // /* START: MENU_ORDER_ITEM Insert (주문한 메뉴의 개수만큼 삽입해야한다.)  */
//       // // :order_code, :store_code, :menu_code :menu_num 필요함
//       // // var menu_order_item_binds = binds.menuItems;
//       // var menu_order_item_binds = [];
//       // for(var i=0; i<binds.menuItems.length; i++){
//       //   let temp_obj = {};
//       //   temp_obj.order_code = created_order_code;
//       //   temp_obj.store_code = binds.store_code;
//       //   temp_obj.menu_code = binds.menuItems[i].menu_code;
//       //   temp_obj.menu_num = binds.menuItems[i].menu_num;
//       //   menu_order_item_binds.push(temp_obj);
//       // }
//       // var menu_options = {
//       //   bindDefs: {
//       //     order_code: { type: oracledb.NUMBER},
//       //     store_code: { type: oracledb.NUMBER},
//       //     menu_code: { type: oracledb.NUMBER},
//       //     menu_num: { type: oracledb.NUMBER},
//       //   } };
//       // // result = await conn.executeMany(create_MENU_ORDER_ITEM_Query, menu_order_item_binds, menu_options);
//       // result = await conn.executeMany(statement.create_MENU_ORDER_ITEM_Query, menu_order_item_binds, menu_options);
//       // /* END: MENU_ORDER_ITEM Insert (주문한 메뉴의 개수만큼 삽입해야한다.)  */
//       //
//       /* [Optionnal] CUSTOMER_COUPON Update Copon_status =  Y */
//       // if (binds.coupon_discount !== 0){
//       //   var coupon_binds = {};
//       //   coupon_binds.coupon_status = binds.coupon_status;
//       //   coupon_binds.coupon_code = binds.coupon_code;
//       //   coupon_binds.customer_code = binds.customer_code;
//       //   // result = await conn.execute(update_CUSTOMER_COUPON_Query, coupon_binds, opts);
//       //   result = await conn.execute(statement.update_CUSTOMER_COUPON_Query, coupon_binds, opts);
//       // }
//       /* [Optionnal] CUSTOMER_POINT Update TOTAL_POINT = TOTAL_POINT - coupon_discount*/
//       // if (binds.point_discount !== 0){
//       //   var point_binds = {};
//       //   point_binds.point_discount = binds.point_discount;
//       //   point_binds.customer_code = binds.customer_code;
//       //   // result = await conn.execute(update_CUSTOMER_POINT_Query, point_binds, opts);
//       //   result = await conn.execute(statement.update_CUSTOMER_POINT_Query, point_binds, opts);
//       // }
//       // /* PAYMENT Insert -> 성공하면 commit */
//       // opts.autoCommit = true;
//       // var payment_binds = {};
//       // payment_binds.order_code = created_order_code;
//       // payment_binds.store_name = binds.store_name;
//       // payment_binds.payment_amount = binds.payment_amount;
//       // payment_binds.payment_status = binds.payment_status;
//       // // result = await conn.execute(insert_PAYMENT_Query, payment_binds, opts);
//       // result = await conn.execute(statement.insert_PAYMENT_Query, payment_binds, opts);
//
//       resolve(result);
//     } catch (err) {
//       console.log(err)
//       reject(err);
//     } finally {
//       if (conn) { // conn assignment worked, need to close
//         try {
//           await conn.close();
//         } catch (err) {
//           console.log(err);
//         }
//       }
//     }
//   });
// }
//
// module.exports.simpleExecute = simpleTrasactionForOrder;

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
