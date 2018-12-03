const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
  `select
    notice_code "notice_code",
    notice_contents "notice_contents",
    manager_code "manager_code",
    notice_name "notice_name"
  from notice
  where manager_code = 1 or manager_code = 2`


  async function find(context) {
    let query = baseQuery;
    const binds = {};

    if (context.notice_code) {
      // console.log("add store_code condition to query");
      binds.notice_code = context.notice_code;
      query += `\nand notice_code = :notice_code`;
    }

    console.log("executing query:", query);
    const result = await database.simpleExecute(query, binds);

    return result.rows;
  }

  module.exports.find = find;
