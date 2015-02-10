var db = require('./db');
var fixtures = require('pow-mongoose-fixtures');

// We do not load the entire directory so we do not load (vim) swap's file
fixtures.load(__dirname + '/fixtures/languages.js', db, function (err) {
    if (err) throw err;
    db.connection.close()
});
