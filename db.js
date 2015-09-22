var mysql      = require('mysql');
var config     = require('./config');

var connection = mysql.createConnection({
  host     : config.db.host,
  user     : config.db.user,
  password : config.db.password,
  database : config.db.database
});
 
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
