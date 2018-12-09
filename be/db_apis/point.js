const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
 `select total_point "total_point" from CUSTOMER_POINT`;
/* CUSTOMER_POINT 테이블에서 누적 포인트(total_point) 조회 */
async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.customer_code) {
    binds.customer_code = context.customer_code;
    query += `\nwhere customer_code = :customer_code`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

const listQuery =
 `select OCCUR_COUNT "occur_count",
    OCCUR_DATE "occur_date",
    OCCUR_POINT "occur_point",
    STORE_NAME "store_name"
  from POINT_DETAIL`;
/* POINT_DETAIL 테이블에서 포인트 내역 조회 */
async function findList(context) {
  let query = listQuery;
  const binds = {};

  if (context.customer_code) {
    binds.customer_code = context.customer_code;
    query += `\nwhere customer_code = :customer_code order by occur_count DESC`;
  }

  const result = await database.simpleExecute(listQuery, binds);

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

/* POINT_DETAIL, CUSTOMER_POINT 테이블에서는 딱히 delete 필요없는 것 같다. */
