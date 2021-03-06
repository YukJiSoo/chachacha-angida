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
