const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
  `select
    review_code "review_code",
    customer_name "customer_name",
    c.profile_img_url "profile_img_url",
    review_img_url "review_img_url",
    contents "contents",
    review_rate "review_rate",
    review_date "review_date",
    review_img_url "review_img_url",
    delete_status "delete_status",
    store_name "store_name"
  from review r, customer c, restaurant s
  where r.customer_code = c.customer_code
  and r.store_code = s.store_code
  and r.delete_status = 'N'`

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.store_code) {
    console.log("add store_code condition to query");
    binds.store_code = context.store_code;
    query += `\nand store_code = :store_code`;
  }

  if (context.customer_code) {
    console.log("add customer_code condition to query");
    binds.customer_code = context.customer_code;
    query += `\nand r.customer_code = :customer_code`;
  }

  console.log("executing query:", query);
  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

const ownerReviewQuery =
  `select
  r.review_code "review_code",
  customer_name "customer_name",
  r.contents "contents",
  review_date "review_date",
  review_img_url "review_img_url"
from review r, restaurant s, customer c
where r.store_code = s.store_code`

async function findOwner(context) {
  let query = ownerReviewQuery;
  const binds = {};

  if (context.store_code) {
    console.log("add store_code condition to query");
    binds.store_code = context.store_code;
    query += `\nand r.store_code = :store_code`;
  }

  console.log("executing query:", query);
  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.findOwner = findOwner;

const createSql =
`insert into review (
   review_code, store_code, customer_code,
   review_rate, contents, review_date,
   review_img_url, delete_status
 ) values (
   review_seq.NEXTVAL, :store_code, :customer_code,
   :review_rate, :contents, sysdate,
   :review_img_url, 'N'
 ) returning review_code into :review_code`;

async function create(review) {
  const binds = Object.assign({}, review);

  binds.review_code = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }
  console.log("/db_apis/review.js >> ", binds);
  var review_options = {
    autoCommit: true, // 명시적 false
    bindDefs: {
      store_code: { type: oracledb.NUMBER},
      customer_code: { type: oracledb.NUMBER},
      review_rate: { type: oracledb.NUMBER},
      contents: { type: oracledb.STRING, maxSize: 100},
      review_img_url: { type: oracledb.STRING, maxSize: 512}
    } };
  const result = await database.simpleExecute(createSql, binds);

  binds.review_code = result.outBinds.review_code[0];

  return binds;
}

module.exports.create = create;

const updateSql =
 `update `;

async function update(emp) {
  const employee = Object.assign({}, emp);
  const result = await database.simpleExecute(updateSql, employee);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return employee;
  } else {
    return null;
  }
}

module.exports.update = update;

const deleteSql =
 `begin
    delete ;
  end;`

async function del(id) {
  const binds = {
    employee_id: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del;
