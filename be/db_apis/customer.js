const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
 `select
   c.customer_code "customer_code",
   c.grade_code "grade_code",
   customer_name "customer_name",
   address "address",
   phone_no "phone_no",
   birth_date "birth_date",
   profile_img_url "profile_img_url",
   grade_name "grade_name",
   point_rate "point_rate"
 from customer c, membership_grade g
 where c.grade_code = g.grade_code`;

async function find(context) {
  let query = baseQuery;
  var binds = {};

  if (context.customer_id) {
    console.log("db customer auth check")
    binds.customer_id = context.customer_id;
    binds.customer_password = context.customer_password;
    query +=
    `\nand customer_id = :customer_id and customer_password = :customer_password`;
  }
  var opts = {
    bindDefs: {
      customer_id: { type: oracledb.STRING, maxSize: 18},
      customer_password: { type: oracledb.STRING, maxSize: 18}
    } };
  console.log("customer.js find() binds >> ", binds);
  const result = await database.simpleExecute(query, binds, opts);
  console.log("dbresult:", result)
  return result.rows;
}

module.exports.find = find;


const createSql =
`insert`;

async function create(customer){
  const customer = Object.assign({}, customer);

  customer.customer_code = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql, customer);

  customer.customer_code = result.outBinds.customer_code[0];

  return customer;
}

module.exports.create = create;


const updateSql =
 `update customer
 set address = :address,
 phone_no = :phone_no,
 customer_password = :customer_password
 where customer_code = :customer_code`;

async function update(context) {
  console.log(context)
  let updateContext = {}

  updateContext.address = context.address
  updateContext.phone_no = context.phone_no
  updateContext.customer_password  = context.customer_password
  updateContext.customer_code  = parseInt(context.customer_code,10)

  console.log(updateContext)
  const userResult = await database.simpleExecute(updateSql, updateContext);

  if (userResult.rowsAffected && userResult.rowsAffected === 1) {
    return userResult;
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
    customer_code: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del;
