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

const ownerQuery =`select
customer_id,
r.order_code,
total_price,
reserv_time,
order_status
from reserv_order r, customer c`;

const menuQuery =
`select menu_name "menu_name"
from menu m, menu_order_item i`;

async function findOwner(context) {
  let query = ownerQuery;

  const binds = {};
  console.log(context)
  if (context.id) {
    binds.store_code = parseInt(context.id, 10);
    query +=
    `\nwhere r.store_code = :store_code
    and r.customer_code = c.customer_code
    and (r.ORDER_STATUS = '수락대기' or r.order_status = '예약완료')
    order by order_code DESC`;
  }

  console.log(binds)
  const result = await database.simpleExecute(query, binds);

  console.log(result.rows)

  let menu_names = []

  for(var i=0; i< result.rows.length; i++){
    const menu_item = result.rows[i]
    let menuContext = {}

    menuContext.order_code = menu_item.ORDER_CODE
    menuContext.store_code = context.id

    let tempQuery = menuQuery
    console.log('od : ',menuContext.order_code, ' st : ', menuContext.store_code)

    tempQuery += `\nwhere
    i.order_code = :order_code and i.store_code = :store_code and i.store_code = m.store_code and i.menu_code = m.menu_code`;
    const menuResult = await database.simpleExecute(tempQuery, menuContext);
    let menu_list = []

    menuResult.rows.forEach((v,i) => {
      menu_list.push(v.menu_name)
    });

    console.log(menu_list)

    menu_names.push(menu_list)
  }

  return [result.rows, menu_names];

}
module.exports.findOwner = findOwner;

async function findOwnerAll(context) {
  let query = ownerQuery;

  const binds = {};
  console.log(context)
  if (context.id) {
    binds.store_code = parseInt(context.id, 10);
    query +=
    `\nwhere r.store_code = :store_code
    and r.customer_code = c.customer_code
    order by order_code DESC`;
  }

  console.log(binds)
  const result = await database.simpleExecute(query, binds);

  console.log(result.rows)

  let menu_names = []
  for(var i=0; i< result.rows.length; i++){
    const menu_item = result.rows[i]

    let menuContext = {}
    menuContext.order_code = menu_item.ORDER_CODE
    menuContext.store_code = context.id

    let tempQuery = menuQuery
    console.log('od : ',menuContext.order_code, ' st : ', menuContext.store_code)
    tempQuery += `\nwhere
    i.order_code = :order_code and i.store_code = :store_code and i.store_code = m.store_code and i.menu_code = m.menu_code`;

    const menuResult = await database.simpleExecute(tempQuery, menuContext);

    let menu_list = []
    menuResult.rows.forEach((v,i) => {
      menu_list.push(v.menu_name)
    });

    console.log(menu_list)

    menu_names.push(menu_list)
  }

  return [result.rows, menu_names];
}

module.exports.findOwnerAll = findOwnerAll;

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


/* TEST START */
const create_RERSERV_ORDER_Query =
 `insert into reserv_order (
    order_code, order_time, total_price, no_of_people,
    reserv_time, point_discount, coupon_discount, order_status,
    customer_code, store_code, review_status
  ) values (
    reserv_order_seq.NEXTVAL, :order_time, :total_price, :no_of_people,
    :reserv_time, :point_discount, :coupon_discount, :order_status,
    :customer_code, :store_code, :review_status
  ) returning order_code into :order_code`;
const create_MENU_ORDER_ITEM_Query =
`insert into menu_order_item (
  order_code, store_code, menu_code, menu_num
) values
( :order_code, :store_code, :menu_code :menu_num ) `;
const update_CUSTOMER_COUPON_Query =
`update customer_coupone
 set coupon_status = :coupon_status
 where coupon_code = :coupon_code and customer_code = :customer_code`;
const update_CUSTOMER_POINT_Query =
`update customer_point
set total_point = total_point - :point_discount
where customer_code = :customer_code`;
const insert_PAYMENT_Query =
`insert into payment (
    order_code, payment_date, store_name,
    payment_amount, payment_status
  ) values (
    :order_code, sysdate, :store_name,
    :payment_amount, :payment_status
  ) `;

/* TEST END */
async function createTransaction(context){
  let query = baseQuery;
  var binds = {};

  // var transactionStatements = [];
  // transactionStatements.push(create_RERSERV_ORDER_Query);
  // transactionStatements.push(create_MENU_ORDER_ITEM_Query);
  // transactionStatements.push(update_CUSTOMER_COUPON_Query);
  // transactionStatements.push(update_CUSTOMER_POINT_Query);
  // transactionStatements.push(insert_PAYMENT_Query);
  var transactionStatements = {};
  transactionStatements.create_RERSERV_ORDER_Query = create_RERSERV_ORDER_Query;
  transactionStatements.create_MENU_ORDER_ITEM_Query = create_MENU_ORDER_ITEM_Query;
  transactionStatements.update_CUSTOMER_COUPON_Query = update_CUSTOMER_COUPON_Query;
  transactionStatements.update_CUSTOMER_POINT_Query = update_CUSTOMER_POINT_Query;
  transactionStatements.insert_PAYMENT_Query = insert_PAYMENT_Query;
  //:store_code, :customer_code, :order_time, :reserv_time, :no_of_people, :total_price, :point_discount, :coupon_discount, :order_status, :review_status
  if (context) {
    console.log("createTransaction:");
    binds = context;
    binds.order_time = new Date();
    binds.reserv_time = new Date();
    binds.reserv_time.setHours(binds.selected_hour, binds.selected_min)
  }
  var testbinds = [];
  var order_binds = {};
  order_binds.order_time = binds.order_time;
  order_binds.reserv_time = binds.reserv_time;
  order_binds.total_price = binds.total_price;
  order_binds.no_of_people = binds.no_of_people;
  order_binds.point_discount = binds.point_discount;
  order_binds.coupon_discount = binds.coupon_discount;
  order_binds.order_status = binds.order_status;
  order_binds.customer_code = binds.customer_code;
  order_binds.store_code = binds.store_code;
  order_binds.review_status = binds.review_status;
  order_binds.order_code = { dir: oracledb.BIND_OUT, type: oracledb.NUMBER };
  testbinds.push(order_binds)
  const result = await database.simpleTrasaction(transactionStatements, testbinds);

  return result;
}
module.exports.createTransaction = createTransaction;

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

  /* TRANSATION START */
  const orderResult = await database.simpleExecute(create_RERSERV_ORDER_Query, orderContext, { autoCommit: true });
  const order_code = orderResult.outBinds.order_code[0];
  console.log(order_code)

  // menu_order_item에 생성
  // let menuContext = {}
  // menuContext.order_code = order_code
  // menuContext.store_code = context.store_code
  //
  // for(var i=0; i<context.menuItems.length; i++){
  //   menuContext.menu_code = context.menuItems[i].menu_code
  //   console.log(menuContext)
  //   const menuResult = await database.simpleExecute(createMenuSql, menuContext);
  //   if(menuResult.rowsAffected != 1) return false
  // }

  /* START: MENU_ORDER_ITEM Insert (주문한 메뉴의 개수만큼 삽입해야한다.)  */
  // :order_code, :store_code, :menu_code :menu_num 필요함
  var menu_order_item_binds = [];
  for(var i=0; i<context.menuItems.length; i++){
    let temp_obj = {};
    temp_obj.order_code = order_code;
    temp_obj.store_code = context.store_code;
    temp_obj.menu_code = context.menuItems[i].menu_code;
    temp_obj.menu_num = context.menuItems[i].menu_num;
    menu_order_item_binds.push(temp_obj);
  }
  var menu_options = {
    autoCommit: false, // 명시적 false
    bindDefs: {
      order_code: { type: oracledb.NUMBER},
      store_code: { type: oracledb.NUMBER},
      menu_code: { type: oracledb.NUMBER},
      menu_num: { type: oracledb.NUMBER},
    } };
  result = await conn.executeMany(create_MENU_ORDER_ITEM_Query, menu_order_item_binds, menu_options);
  /* END: MENU_ORDER_ITEM Insert (주문한 메뉴의 개수만큼 삽입해야한다.)  */

  /* [Optionnal] CUSTOMER_COUPON Update Copon_status =  Y */
  if (binds.coupon_discount !== 0){
    var coupon_binds = {};
    coupon_binds.coupon_status = binds.coupon_status;
    coupon_binds.coupon_code = binds.coupon_code;
    coupon_binds.customer_code = binds.customer_code;
    // result = await conn.execute(update_CUSTOMER_COUPON_Query, coupon_binds, opts);
    result = await conn.execute(update_CUSTOMER_COUPON_Query, coupon_binds, { outFormat: oracledb.OBJECT, autoCommit: true});
  }
  // /* [Optionnal] CUSTOMER_POINT Update TOTAL_POINT = TOTAL_POINT - coupon_discount*/
  if (binds.point_discount !== 0){
    var point_binds = {};
    point_binds.point_discount = binds.point_discount;
    point_binds.customer_code = binds.customer_code;
    result = await conn.execute(update_CUSTOMER_POINT_Query, point_binds, { outFormat: oracledb.OBJECT, autoCommit: true});
  }

  // payment에 생성
  let paymentContext = {}
  paymentContext.order_code = parseInt(order_code,10)
  // paymentContext.payment_date = context.order_time
  paymentContext.store_name = context.store_name
  paymentContext.payment_amount = context.total_price
  paymentContext.payment_status = context.payMethod.payment_status
  console.log(paymentContext)
  const paymentResult = await database.simpleExecute(createPaymentSql, paymentContext, { autoCommit: true });

  /* TRANSATION END */
  // var paymentResult = {};
  return paymentResult;
}

module.exports.create = create;


const updateSql =
`update reserv_order
set order_status = :order_status
where order_code = :order_code`;

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
