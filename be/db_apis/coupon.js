const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
 `select coupon_code "coupon_code",
    coupon_name "coupon_name",
    issued_date "issued_date",
    end_date "end_date",
    discount_amount "discount_amount",
    coupon_status "coupon_status",
    min_order_amount "min_order_amount",
  from coupon`;
  
async function findCoupon(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.customer_code = context.id;
    query += `\nwhere coupon_code in (select coupon_code from customer_coupon where customer_code = :customer_code`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.findCoupon = findCoupon;

const updateSql =
 `update customer_coupone
  set coupon_status = :coupon_status
  where coupon_code = :coupon_code and customer_code = :customer_code`;

async function update(context) {
  const bind = Object.assign({}, context);
  const result = await database.simpleExecute(updateSql, bind);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return bind;
  } else {
    return null;
  }

}

module.exports.update = update;
