const oracledb = require('oracledb');
const database = require('../services/database.js');

// select store_name, seat_status, total_seat
// from restaurant r, seat_cur_status s where r.store_code = s.store_code;
const baseQuery =
  `select
    menu_code "menu_code",
    menu_name "menu_name",
    menu_img_url "menu_img_url",
    menu_price "menu_price",
    menu_desc "menu_desc",
    store_code "store_code"
  from menu`

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.store_code) {
    console.log("add store_code condition to query");
    binds.store_code = context.store_code;
    query += `\nwhere store_code = :store_code`;
  }

  console.log("executing query:", query);
  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

async function findOne(context) {
  let query = baseQuery;
  const binds = {};

  if (context.store_code) {
    console.log("add store_code condition to query");
    binds.store_code = context.store_code;
    binds.menu_code = context.menu_code;
    query += `\nwhere store_code = :store_code and menu_code = :menu_code`;
  }

  console.log("executing query:", query);
  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.findOne = findOne;

const createSql =
 `insert into menu (
    menu_code,
    menu_name,
    menu_img_url,
    menu_price,
    menu_desc,
    store_code
  ) values (
    meu_seq.NEXTVAL,
    :menu_name,
    :menu_img_url,
    :menu_price,
    :menu_desc,
    :store_code
  ) returning menu_code
  into :menu_code`;

async function create(context) {
  let menuContext = {}

  menuContext.menu_name = context.menu.menu_name
  menuContext.menu_img_url = context.menu.menu_img_url
  menuContext.menu_price  = context.menu_price
  menuContext.menu_desc  = context.menu_desc
  menuContext.store_code = context.store_code

  menuContext.menu_code = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }
  console.log(menuContext)
  const menuResult = await database.simpleExecute(createSql, menuContext);

  const menu_code = menuResult.outBinds.menu_code[0];
  console.log(menu_code)

  return menu_code
}

module.exports.create = create;

const updateSql =
  `update menu
  set menu_name = :menu_name,
  menu_img_url = :menu_img_url,
  menu_price = :menu_price,
  menu_desc = :menu_desc,
  store_code = :store_code
  where menu_code = :menu_code`;
 

async function update(context) {
  let menuContext = {}

  menuContext.menu_name = context.menu.menu_name
  menuContext.menu_img_url = context.menu.menu_img_url
  menuContext.menu_price  = context.menu_price
  menuContext.menu_desc  = context.menu_desc
  menuContext.store_code = context.store_code
  menuContext.menu_code = contest.menu_code

  console.log(menuContext)
  const menuResult = await database.simpleExecute(updateSql, menuContext);

  if (menuResult.rowsAffected && menuResult.rowsAffected === 1) {
    return menuResult;
  } else {
    return null;
  }
}

module.exports.update = update;

const deleteSql =
 `begin
    delete from job_history
    where employee_id = :employee_id;
    delete from employees
    where employee_id = :employee_id;
    :rowcount := sql%rowcount;
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
