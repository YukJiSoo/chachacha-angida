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

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;

    try {

      conn = await oracledb.getConnection();

      const result = await conn.execute(statement, binds, opts);

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

const firstQuery = `insert into RESERV_ORDER ( store_code, customer_code, order_time, reserv_time, no_of_people, total_price, point_discount, coupon_discount, order_status, review_status ) values ( :store_code, :customer_code, :order_time, :reserv_time, :no_of_people, :total_price, :point_discount, :coupon_discount, :order_status, :review_status )`
function simpleTrasaction (binds) {
  return new Promise(async (resolve, reject) => {
    let conn;
    try {

      conn = await oracledb.getConnection();

      //run all actions in sequence
      conn.transaction([
        // first : RESERV_ORDER 테이블에 예약 정보 INSERT
        function firstAction(binds, callback) {
          conn.insert(firstQuery, binds,
            function onResults(error, output) {
              //continue flow...
            });
        },
        // second : 예약된 메뉴 개수 만큼, MENU_ORDER_ITEM 테이블에 예약된 메뉴 정보 INSERT
        function secondAction(binds, callback) {
          conn.insert(
            `insert into MENU_ORDER_ITEM ( order_code, store_code, menu_code ) values ( :order_code, :store_code, :menu_code )`,
            binds,
            function onResults(error, output) {
              //continue flow...
            });
        },
        // third : 쿠폰을 사용한 경우, CUSTOMER_COUPON 테이블에 쿠폰 상태를 '사용했다'고 UPDATE
        function thirdAction(binds, callback) {
          conn.insert(
            `update CUSTOMER_COUPON set where`,
            binds,
            function onResults(error, output) {
              //continue flow...
            });
        },
        // forth : 포인트 사용한 경우, CUSTOMER_POINT 테이블에 사용한 포인트(point_discount)만큼 차감 UPDATE
        function forthAction(binds, callback) {
          conn.insert(
            `update CUSTOMER_POINT set where`,
            binds,
            function onResults(error, output) {
              //continue flow...
            });
        },
        // fifth : PAYMENT 테이블에 예약된 결제 정보 INSERT
        function fifthAction(binds, callback) {
          conn.insert(
            `insert into PAYMENT ( order_code, payment_date, store_name, payment_amount, payment_status ) values ( :order_code, SYSDATE, :store_name, :payment_amount, :payment_status )`,
            binds,
            function onResults(error, output) {
              //continue flow...
            });
        }
      ], {
        sequence: true
      }, function onTransactionResults(error, output) {
        //continue flow...
      });

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
module.exports.simpleExecute = simpleTrasaction;
