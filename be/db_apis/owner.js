const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
 `select store_code "store_code",
 store_name "store_name",
 address "address",
 coporate_no "coporate_no",
 business_no "business_no",
 phone_no "phone_no",
 latitude "latitude",
 longitude "longitude",
 profile_img_url "profile_img_url",
 total_rate "total_rate",
 store_desc "store_desc",
 store_tag "store_tag",
 store_tag "store_tag",
 store_id	"store_id",
 store_password	"store_password",
 store_category_Code "store_category_code",
 start_time "start_time",
 end_time	"end_time",
 break_start_time	"break_start_time",
 break_end_time	"break_end_time",
 owner_name "owner_name"
 from restaurant r`;

async function find(context) {
  let query = baseQuery;
  var binds = {};

  if (context.store_id) {
    console.log("db owner auth check")
    binds.store_id = context.store_id;
    binds.store_password = context.store_password;
    query +=
    `\nwhere store_id = :store_id and store_password = :store_password`;
  }
  console.log("dbstart")
  console.log(binds.store_id)
  console.log(binds.store_password)
  const result = await database.simpleExecute(query, binds);
  console.log("dbresult:", result)
  return result.rows;
}

module.exports.find = find;


const createSql =
`insert `;

async function create(notice){
  const notice = Object.assign({}, notice);

  notice.notice_code = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql, notice);

  notice.notice_code = result.outBinds.notice_code[0];

  return notice;
}

module.exports.create = create;


const updateSql =
 `update `;

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
    delete from
  end;`

async function del(id) {
  const binds = {
    notice_code: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del;
