const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
 `select store_name "store_name",
 customer_code "customer_code",
 order_code "order_code",
 order_time "order_time",
 total_price "total_price",
 no_of_people "no_of_people",
 reserv_time "reserv_time",
 point_discount "point_discount",
 coupon_discount "coupon_discount",
 order_status "order_status",
 r.store_code "store_code",
 review_status "review_status"
 from reserv_order r, restaurant s`;

async function find(context) {
  let query = baseQuery;
  var binds = {};

  if (context.id) {
    binds.customer_code = context.id;
    query += 
    `\nwhere r.customer_code = :customer_code and r.store_code = s.store_code 
    order by order_code DESC`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

const createSql =
 `insert into reserv_order (
    order_time,
    total_price,
    no_of_people,
    reserv_time,
    point_discount,
    coupon_discount,
    order_status,
    customer_code,
    store_code,
    review_status
  ) values (
    :order_time,
    :total_price,
    :no_of_people,
    :reserv_time,
    :point_discount,
    :coupon_discount,
    :order_status,
    :customer_code,
    :store_code,
    :review_status
  ) returning order_code
  into :order_code`;

async function create(context) {
  const bind = Object.assign({}, context);

  bind.order_code = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql, bind);
  bind.order_code = result.outBinds.order_code[0];

  return bind;
}

module.exports.create = create;

const listQuery =
 `select OCCUR_COUNT "OCCUR_COUNT",
    OCCUR_DATE "OCCUR_DATE",
    OCCUR_POINT "OCCUR_POINT",
    STORE_NAME "STORE_NAME",
  from POINT_DETAIL`;

async function findList(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.CUSTOMER_CODE = context.id;
    query += `\nwhere CUSTOMER_CODE = :CUSTOMER_CODE order by OCCUR_COUNT DESC`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.findList = findList;

const updateSql =
`update customer_point
set total_point = :total_point
where customer_code = :customer_code`;

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
