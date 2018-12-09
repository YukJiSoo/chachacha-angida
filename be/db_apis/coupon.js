const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
 `select coupon_code "coupon_code",
    coupon_name "coupon_name",
    issued_date "issued_date",
    end_date "end_date",
    discount_amount "discount_amount",
    coupon_status "coupon_status",
    min_order_amount "min_order_amount"
  from coupon`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.customer_code = context.id;
    query += `\nwhere coupon_code in (select coupon_code from customer_coupon where customer_code <> :customer_code)`;
  }
  console.log("select query:", query);
  const result = await database.simpleExecute(query, binds);

  return result.rows;
}
module.exports.find = find;

async function findCoupon(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.customer_code = parseInt(context.id, 10);
    query += `\nwhere coupon_code in (select coupon_code from customer_coupon where customer_code = :customer_code)`;
  }

  console.log("findCoupon binds:", binds);

  const result = await database.simpleExecute(query, binds);

  return result;
}

module.exports.findCoupon = findCoupon;

const createSql =
`insert into coupon (
  coupon_code, store_code, coupon_name,
  issued_date, end_date, discount_amount,
  min_order_amount, coupon_status
) values (
  coupon_seq.NEXTVAL, :store_code, :coupon_name,
  sysdate, :end_date, :discount_amount,
  :min_order_amount, :coupon_status
) returning coupon_code into :coupon_code`;

const create_Customer_Coupon_SQL =
`insert into customer_coupon (
  coupon_code, customer_code, coupon_status
) values (
  :coupon_code, :customer_code, :coupon_status
)`;
async function create(context){
  // const coupon_context = Object.assign({}, context);
  const coupon_context = {};

  coupon_context.store_code = context.store_code;
  coupon_context.coupon_name = context.coupon_name;
  coupon_context.discount_amount = parseInt(context.discount_amount, 10);
  coupon_context.min_order_amount = parseInt(context.min_order_amount, 10);
  coupon_context.end_date = new Date();
  coupon_context.coupon_status = "Y";
  coupon_context.coupon_code = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  var result = await database.simpleExecute(createSql, coupon_context);
  coupon_context.coupon_code = result.outBinds.coupon_code[0];

  const customer_coupon_context = {};
  customer_coupon_context.coupon_code = coupon_context.coupon_code;
  customer_coupon_context.customer_code = context.customer_code;
  customer_coupon_context.coupon_status = 'N';
  console.log("customer_coupon_context:", customer_coupon_context);

  result = await database.simpleExecute(create_Customer_Coupon_SQL, customer_coupon_context);

  return result;
}

module.exports.create = create;


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

const deleteSql =
 `begin
    delete from customer_coupon
    where coupon_code = :coupon_code;

    delete from coupon
    where coupon_code = :coupon_code;
    :rowcount := sql%rowcount;
  end;`

async function del(id) {
  const binds = {
    coupon_code: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del;
