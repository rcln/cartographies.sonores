var mysql      = require('mysql');
var config     = require('./config');

var param = {
  host     : config.db.host,
  user     : config.db.user,
  password : config.db.password,
  database : config.db.database
};

if (config.db.socketPath != undefined)
  param.socketPath: config.db.socketPath;

var connection = mysql.createConnection(param);
 
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
