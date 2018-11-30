module.exports.executeQuery = function (query) {


var oracledb = require('oracledb');
var dbConfig = require('..//db/db_con.js');
var resultToReturn = '';

oracledb.autoCommit = true;
let conn = oracledb.getConnection({
  user : dbConfig.user,
  password : dbConfig.password,
  connectString : dbConfig.connectString
}, function(err, connection){
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('==> query executing ...');
  console.log('===>', query);
  connection.execute(query, function(err, result){
    if (err) {
      console.error(err.message);
      doRelease(connection);
      return;
    } else {
      console.log("result:", result);
    }
    resultToReturn = result;
    doRelease(connection, result);
  });

  function doRelease(connection, result){
    connection.close(function(err){
      if (err) {
        console.error(err.message);
      }
    })
  };
});

}
