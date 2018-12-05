const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
  `select
    r.store_code "store_code",
    store_name "store_name",
    PROFILE_IMG_URL "profile_img_url",
    TOTAL_RATE "total_rate",
    latitude "latitude",
    longitude "longitude",
    STORE_TAG "store_tag",
    address "address",
    phone_no "phone_no",
    seat_status "seat_status",
    total_seat "total_seat"
  from restaurant r, seat_cur_status s
  where r.store_code = s.store_code`

  // const baseQuery =
  //   `select
  //     r.store_code "store_code",
  //     store_name "store_name",
  //     PROFILE_IMG_URL "profile_img_url",
  //     TOTAL_RATE "total_rate",
  //     latitude "latitude",
  //     longitude "longitude",
  //     STORE_TAG "store_tag",
  //     address "address",
  //     phone_no "phone_no",
  //     seat_status "seat_status",
  //     total_seat "total_seat",
  //     avg(review_rate) "total_review"
  //   from restaurant r, seat_cur_status s, review v
  //   where r.store_code = s.store_code and r.store_code = v.store_code
  //   group by `

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.store_code) {
    console.log("add store_code condition to query");
    binds.store_code = context.store_code;
    query += `\nand r.store_code = :store_code`;
  }

  if (context.store_category_code) {
    console.log("add category condition to query");
    binds.store_category_code = context.store_category_code;
    query += `\nand r.store_category_code = :store_category_code`;
  }

  if (context.search_keyword) {
    console.log("add search_keyword condition to query");
    // binds.store_name = context.search_keyword;
    query += `\nand r.store_name LIKE '%이대헌%'`;
  }
  console.log("executing query:", query);
  console.log("executing binds:", binds);
  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

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
    delete from;
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
