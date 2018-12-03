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
  console.log("dbstart")
  const result = await database.simpleExecute(query, binds);
  console.log("dbresult:", result)
  return result.rows;
}

module.exports.find = find;


