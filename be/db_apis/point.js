const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
 `select TOTAL_POINT "TOTAL_POINT",
  from CUSTOMER_POINT`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.CUSTOMER_CODE = context.id;
    query += `\nwhere CUSTOMER_CODE = :CUSTOMER_CODE`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

const listQuery =
 `select OCCUR_COUNT "OCCUR_COUNT",
    OCCUR_DATE "OCCUR_DATE",
    OCCUR_POINT "OCCUR_POINT",
    STORE_NAME "STORE_NAME",
  from POINT_DETAIL`;

async function findList(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.CUSTOMER_CODE = context.id;
    query += `\nwhere CUSTOMER_CODE = :CUSTOMER_CODE order by OCCUR_COUNT DESC`;
  }

  const result = await database.simpleExecute(query, binds);

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
