const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
  `select
    review_code "review_code",
    customer_name "customer_name",
    profile_img_url "profile_img_url",
    contents "contents",
    review_rate "review_rate",
    review_date "review_date",
    review_img_url "review_img_url",
    delete_status "delete_status"
  from review r, customer c
  where r.customer_code = c.customer_code and r.delete_status = 'N'`

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.store_code) {
    console.log("add store_code condition to query");
    binds.store_code = context.store_code;
    query += `\nand store_code = :store_code`;
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
 `insert into `;

async function create(emp) {
  const employee = Object.assign({}, emp);

  employee.employee_id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql, employee);

  employee.employee_id = result.outBinds.employee_id[0];

  return employee;
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
