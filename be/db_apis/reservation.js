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


const ownerQuery =
 `select OCCUR_COUNT "OCCUR_COUNT",
    OCCUR_DATE "OCCUR_DATE",
    OCCUR_POINT "OCCUR_POINT",
    STORE_NAME "STORE_NAME",
  from POINT_DETAIL`;

async function findOwner(context) {
  let query = ownerQuery;
  const binds = {};

  if (context.id) {
    binds.CUSTOMER_CODE = context.id;
    query += `\nwhere CUSTOMER_CODE = :CUSTOMER_CODE order by OCCUR_COUNT DESC`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.findOwner = findOwner;


const createOrderSql =
 `insert into reserv_order (
    order_code,
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
    AUTO.NEXTVAL,
    sysdate,
    :total_price,
    :no_of_people,
    sysdate,
    :point_discount,
    :coupon_discount,
    :order_status,
    :customer_code,
    :store_code,
    :review_status
  ) returning order_code
  into :order_code`;

const createPaymentSql =
`insert into payment (
    order_code,
    payment_date,
    store_name,
    payment_amount,
    payment_status
  ) values (
    :order_code,
    sysdate,
    :store_name,
    :payment_amount,
    :payment_status
  ) `;

const createMenuSql =
`insert into menu_order_item (
  order_code,
  store_code,
  menu_code
) values (
  :order_code,
  :store_code,
  :menu_code
) `;

async function create(context) {
  // reserv_order에 insert
  let orderContext = {}
  // orderContext.order_time = context.order_time
  orderContext.total_price = context.total_price
  orderContext.no_of_people = context.no_of_people
  // orderContext.reserv_time = context.reserv_time
  orderContext.point_discount  = context.point_discount
  orderContext.coupon_discount  = context.coupon_discount
  orderContext.order_status = context.order_status
  orderContext.customer_code = context.customer_code
  orderContext.store_code  = context.store_code
  orderContext.review_status = context.review_status

  orderContext.order_code = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }  
  console.log(orderContext)
  const orderResult = await database.simpleExecute(createOrderSql, orderContext);

  const order_code = orderResult.outBinds.order_code[0];
  console.log(order_code)
  // payment에 생성
  let paymentContext = {}
  paymentContext.order_code = parseInt(order_code,10)
  // paymentContext.payment_date = context.order_time
  paymentContext.store_name = context.store_name
  paymentContext.payment_amount = context.total_price
  paymentContext.payment_status = context.payMethod.payment_status
  console.log(paymentContext)
  const paymentResult = await database.simpleExecute(createPaymentSql, paymentContext);

  // menu_order_item에 생성
  let menuContext = {}
  menuContext.order_code = order_code
  menuContext.store_code = context.store_code

  for(var i=0; i<context.menuItems.length; i++){
    menuContext.menu_code = context.menuItems[i].menu_code
    console.log(menuContext)
    const menuResult = await database.simpleExecute(createMenuSql, menuContext);
    if(menuResult.rowsAffected != 1) return false
  }
  
  return true;
}

module.exports.create = create;


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
