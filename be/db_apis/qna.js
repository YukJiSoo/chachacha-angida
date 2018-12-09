const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
  `select
    qna_category "qna_category",
    question "question",
    answer "answer",
    customer_code "customer_code",
    manager_code "manager_code",
    qna_code "qna_code"
  from qna
  where manager_code = 1 or manager_code = 2`


  async function find(context) {
    let query = baseQuery;
    const binds = {};

    if (context.qna_code) {
      // console.log("add store_code condition to query");
      binds.qna_code = context.qna_code;
      query += `\nand qna_code = :qna_code`;
    }

    console.log("executing query:", query);
    const result = await database.simpleExecute(query, binds);

    return result.rows;
  }

  module.exports.find = find;

  const createSql =
   `insert into qna (
      question,
      customer_code,
      manager_code,
      answer,
      qna_code
    ) values (
      :question,
      :customer_code,
      1,
      '답변을 기다려주세요.',
      qna_seq.NEXTVAL
    ) returning qna_code
    into :qna_code`;

    async function create(qna) {
      const binds = Object.assign({}, qna);

      binds.qna_code = {
        dir: oracledb.BIND_OUT,
        type: oracledb.NUMBER
      }

      var qna_options = {
        autoCommit: true, // 명시적 false
        bindDefs: {
          customer_code: { type: oracledb.NUMBER},
          question: { type: oracledb.STRING, maxSize: 500}
        } };
      const result = await database.simpleExecute(createSql, binds);

      binds.qna_code = result.outBinds.qna_code[0];

      return binds;
    }
  module.exports.create = create;

  //
  // const updateSql =
  //  `update `;
  //
  // async function update(context) {
  //   const bind = Object.assign({}, context);
  //   const result = await database.simpleExecute(updateSql, bind);
  //
  //   if (result.rowsAffected && result.rowsAffected === 1) {
  //     return bind;
  //   } else {
  //     return null;
  //   }
  //
  // }
  //
  // module.exports.update = update;
  //
  // const deleteSql =
  //  `begin
  //     delete from
  //   end;`
  //
  // async function del(id) {
  //   const binds = {
  //     notice_code: id,
  //     rowcount: {
  //       dir: oracledb.BIND_OUT,
  //       type: oracledb.NUMBER
  //     }
  //   }
  //   const result = await database.simpleExecute(deleteSql, binds);
  //
  //   return result.outBinds.rowcount === 1;
  // }
  //
  // module.exports.delete = del;
