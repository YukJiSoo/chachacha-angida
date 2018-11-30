var express = require('express');
var createError = require('http-errors');
var router = express.Router();

var oracledb = require('oracledb');
var dbConfig = require('../../../db/db_con.js');
// var dbConfig = require('be/db_con.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  oracledb.getConnection({
    user : dbConfig.user,
    password : dbConfig.password,
    connectString : dbConfig.connectString
  }, function(err, connection){
    if (err) {
      console.error(err.message);
      return;
    }
    console.log('==> search query');
    var query = 'select * from emp';

    connection.execute(query, function(err, result){
      if (err) {
        console.error(err.message);
        doRelease(connection);
        return;
      }

      console.log(result.rows);
      doRelease(connection, result.rows);
    });
  });

  function doRelease(connection, userlist){
    connection.close(function(err){
      if (err) {
        console.error(err.message);
      }
      console.log('list size: ' + userlist.length);

      for(var i=0; i<userlist.length; i++){
        console.log('name: ' + userlist[i][1]);
      }
      res.send(userlist);
    })
  };
});

/* POST home page. */
router.post('/', (req, res, next) => {
})


router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
