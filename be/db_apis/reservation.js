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
 from reserv_order r, restaurant s
 where r.store_code = s.store_code`;

async function find(context) {
  let query = baseQuery;
  var binds = {};

  if (context.customer_code) {
    binds.customer_code = context.customer_code;
    query +=
    `\nand r.customer_code = :customer_code order by order_code DESC`;
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
  // console.log(context)
  if (context.id) {
    binds.store_code = parseInt(context.id, 10);
    query +=
    `\nwhere r.store_code = :store_code
    and r.customer_code = c.customer_code
    and (r.ORDER_STATUS = '수락대기' or r.order_status = '예약완료')
    order by order_code DESC`;
  }

  // console.log(binds)
  const result = await database.simpleExecute(query, binds);

  // console.log(result.rows)

  let menu_names = []

  for(var i=0; i< result.rows.length; i++){
    const menu_item = result.rows[i]
    let menuContext = {}

    menuContext.order_code = menu_item.ORDER_CODE
    menuContext.store_code = context.id

    let tempQuery = menuQuery
    // console.log('od : ',menuContext.order_code, ' st : ', menuContext.store_code)

    tempQuery += `\nwhere
    i.order_code = :order_code and i.store_code = :store_code and i.store_code = m.store_code and i.menu_code = m.menu_code`;
    const menuResult = await database.simpleExecute(tempQuery, menuContext);
    let menu_list = []

    menuResult.rows.forEach((v,i) => {
      menu_list.push(v.menu_name)
    });

    // console.log(menu_list)

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
    and ROWNUM <= 10
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

async function findIncomeAll(context) {
  let query = ownerQuery;

  const binds = {};
  console.log(context)
  if (context.id) {
    binds.store_code = parseInt(context.id, 10);
    query +=
    `\nwhere r.store_code = :store_code
    and r.customer_code = c.customer_code
    and r.order_status = '방문완료'
    order by order_code DESC`;
  }

  console.log(query)
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

module.exports.findIncomeAll = findIncomeAll;

const createOrderSql =
 `insert into reserv_order (
    order_code, order_time, total_price, no_of_people,
    reserv_time, point_discount, coupon_discount, order_status,
    customer_code, store_code, review_status
  ) values (
    reserv_order_seq.NEXTVAL, sysdate, :total_price, :no_of_people,
    sysdate, :point_discount, :coupon_discount, :order_status,
    :customer_code, :store_code, :review_status
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
( :order_code, :store_code, :menu_code, :menu_num ) `;
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
const insert_POINT_DETAIL_Query =
`insert into POINT_DETAIL (
    customer_code, point_code, occur_count,
    occur_date, occur_point, store_name
  ) values (
    :customer_code, :point_detail_seq.NEXTVAL, :occur_count,
    sysdate, :occur_point, :store_name
  ) returning point_code into :point_code`;
/* TEST END */
// async function createTransaction(context){
//   let query = baseQuery;
//   var binds = {};
//
//   // var transactionStatements = [];
//   // transactionStatements.push(create_RERSERV_ORDER_Query);
//   // transactionStatements.push(create_MENU_ORDER_ITEM_Query);
//   // transactionStatements.push(update_CUSTOMER_COUPON_Query);
//   // transactionStatements.push(update_CUSTOMER_POINT_Query);
//   // transactionStatements.push(insert_PAYMENT_Query);
//   var transactionStatements = {};
//   transactionStatements.create_RERSERV_ORDER_Query = create_RERSERV_ORDER_Query;
//   transactionStatements.create_MENU_ORDER_ITEM_Query = create_MENU_ORDER_ITEM_Query;
//   transactionStatements.update_CUSTOMER_COUPON_Query = update_CUSTOMER_COUPON_Query;
//   transactionStatements.update_CUSTOMER_POINT_Query = update_CUSTOMER_POINT_Query;
//   transactionStatements.insert_PAYMENT_Query = insert_PAYMENT_Query;
//   //:store_code, :customer_code, :order_time, :reserv_time, :no_of_people, :total_price, :point_discount, :coupon_discount, :order_status, :review_status
//   if (context) {
//     console.log("createTransaction:");
//     binds = context;
//     binds.order_time = new Date();
//     binds.reserv_time = new Date();
//     binds.reserv_time.setHours(binds.selected_hour, binds.selected_min)
//   }
//   var testbinds = [];
//   var order_binds = {};
//   order_binds.order_time = binds.order_time;
//   order_binds.reserv_time = binds.reserv_time;
//   order_binds.total_price = binds.total_price;
//   order_binds.no_of_people = binds.no_of_people;
//   order_binds.point_discount = binds.point_discount;
//   order_binds.coupon_discount = binds.coupon_discount;
//   order_binds.order_status = binds.order_status;
//   order_binds.customer_code = binds.customer_code;
//   order_binds.store_code = binds.store_code;
//   order_binds.review_status = binds.review_status;
//   order_binds.order_code = { dir: oracledb.BIND_OUT, type: oracledb.NUMBER };
//   testbinds.push(order_binds)
//   const result = await database.simpleTrasaction(transactionStatements, testbinds);
//
//   return result;
// }
// module.exports.createTransaction = createTransaction;

async function create(context) {
  // 1. insert reserv_order
  // 2. insert menu_order_item
  // 3. CUSTOMER_COUPON
  // 4. CUSTOMER_POINT
  // 5. PAYMENT
  // 6. CUSTOMER_POINT
  // reserv_order에 insert
  console.log("selected_hour min:", context.selected_hour, context.selected_min);
  let orderContext = {}
  orderContext.order_time = new Date();
  orderContext.reserv_time = new Date(new Date().setHours(context.selected_hour, context.selected_min));

  orderContext.total_price = context.total_price
  orderContext.no_of_people = context.no_of_people
  orderContext.point_discount  = context.point_discount
  orderContext.coupon_discount  = context.coupon_discount
  orderContext.order_status = context.order_status
  orderContext.customer_code = context.customer_code
  orderContext.store_code  = context.store_code
  orderContext.review_status = context.review_status
  orderContext.order_code = { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
  console.log("reservation.js create() orderContext>> ", orderContext);
  var order_options = {
    autoCommit: true, // 명시적 false
    bindDefs: {
      order_time: { type: oracledb.DATE},
      reserv_time: { type: oracledb.DATE},
      total_price: { type: oracledb.NUMBER},
      no_of_people: { type: oracledb.NUMBER},
      point_discount: { type: oracledb.NUMBER},
      coupon_discount: { type: oracledb.NUMBER},
      order_status: { type: oracledb.STRING, maxSize: 18},
      customer_code: { type: oracledb.NUMBER},
      store_code: { type: oracledb.NUMBER},
      review_status: { type: oracledb.STRING, maxSize: 18}
    } };
  /* TRANSATION START */
  var orderResult = await database.simpleExecute(create_RERSERV_ORDER_Query, orderContext, { autoCommit: true });
  //var orderResult = await database.simpleExecute(createOrderSql, orderContext, order_options);
  const order_code = orderResult.outBinds.order_code[0];
  console.log("reservation.js create() created_order_code>> ", order_code)

  /* START: MENU_ORDER_ITEM Insert (주문한 메뉴의 개수만큼 삽입해야한다.)  */
  var menu_order_item_binds = [];
  for(var i=0; i<context.menuItems.length; i++){
    menu_order_item_binds.push({
      order_code: order_code,
      store_code: context.store_code,
      menu_code: context.menuItems[i].menu_code,
      menu_num: context.menuItems[i].menu_num
    });
  }
  var menu_options = {
    autoCommit: true, // 명시적 false
    bindDefs: {
      order_code: { type: oracledb.NUMBER},
      store_code: { type: oracledb.NUMBER},
      menu_code: { type: oracledb.NUMBER},
      menu_num: { type: oracledb.NUMBER},
    } };
  try {
    conn = await oracledb.getConnection();

    /* END: MENU_ORDER_ITEM Insert (주문한 메뉴의 개수만큼 삽입해야한다.)  */
    orderResult = await conn.executeMany(create_MENU_ORDER_ITEM_Query, menu_order_item_binds, menu_options);
    console.log("menu executeMany result:", orderResult);
    /* [Optionnal] CUSTOMER_COUPON Update Copon_status =  Y */
    if (context.coupon_discount !== 0){
      var coupon_binds = {};
      coupon_binds.coupon_status = 'Y';
      coupon_binds.coupon_code = context.couponChoice.coupon_code;
      coupon_binds.customer_code = context.customer_code;
      // result = await conn.execute(update_CUSTOMER_COUPON_Query, coupon_binds, opts);
      orderResult = await conn.execute(update_CUSTOMER_COUPON_Query, coupon_binds, { outFormat: oracledb.OBJECT, autoCommit: true});
      console.log("update_CUSTOMER_COUPON_Query execute result:", orderResult);
    } else {
      console.log("쿠폰을 사용하지 않았습니다.");
    }
    /* [Optionnal] CUSTOMER_POINT Update TOTAL_POINT = TOTAL_POINT - coupon_discount*/
    if (context.point_discount !== 0){
      var point_binds = {};
      point_binds.point_discount = context.point_discount;
      point_binds.customer_code = context.customer_code;
      orderResult = await conn.execute(update_CUSTOMER_POINT_Query, point_binds, { outFormat: oracledb.OBJECT, autoCommit: true});
      console.log("update_CUSTOMER_POINT_Query execute result:", orderResult);
    } else {
      console.log("포인트를 사용하지 않았습니다.");
    }

    // payment에 생성
    let paymentContext = {}
    paymentContext.order_code = parseInt(order_code,10)
    // paymentContext.payment_date = context.order_time
    paymentContext.store_name = context.store_name
    paymentContext.payment_amount = context.total_price - context.coupon_discount - context.point_discount;
    paymentContext.payment_status = context.payMethod.payment_status
    console.log("reservation.js create() paymentContext>> ", paymentContext)
    orderResult = await database.simpleExecute(insert_PAYMENT_Query, paymentContext, { autoCommit: true });
    console.log("insert_PAYMENT_Query execute result:", orderResult);

    // CUSTOMER_POINT에 생성
    let pointContext = {}
    pointContext.customer_code = parseInt(customer_code,10)
    orderContext.point_code = { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
    // pointContext.payment_date = context.order_time
    pointContext.occur_count = 0
    pointContext.occur_point = context.total_price * conext.point_rate; //결제금액 * 적립률;
    pointContext.store_name = context.store_name
    console.log("reservation.js create() pointContext>> ", pointContext)
    orderResult = await database.simpleExecute(insert_POINT_DETAIL_Query, pointContext, { autoCommit: true });
    console.log("insert_POINT_DETAIL_Query execute result:", orderResult);


    /* TRANSATION END */
  } catch (err) {
    console.log("menu err:", err)
    //reject(err);
  } finally {
    if (conn) { // conn assignment worked, need to close
      try {
        await conn.close();
      } catch (err) {
        console.log(err);
      }
    }
  }

  return orderResult;
}

module.exports.create = create;


const updateSql =
`update reserv_order
set order_status = :order_status
where order_code = :order_code`;

const test =
`select * from reserv_order
where order_code = :order_code`;

async function update(context) {
  let bind = {}
  bind.order_status = context.order_status
  bind.order_code = parseInt(context.order_code,10)

  let opts = {}
  opts.autoCommit = true
  console.log("reservation.js update() bind", bind)
  const result = await database.simpleExecute(updateSql, bind, opts);

  let tb = {}
  tb.order_code = parseInt(context.order_code,10)
  const testresult = await database.simpleExecute(test, tb, opts);

  console.log(testresult)
  if (result.rowsAffected && result.rowsAffected === 1) {
    return bind;
  } else {
    return null;
  }


}

module.exports.update = update;
