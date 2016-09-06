var db = require('./db');
var fixtures = require('pow-mongoose-fixtures');
console.warn("Running load_fixtures.js");

// We do not load the entire directory so we do not load (vim) swap's file
fixtures.load(__dirname + '/fixtures/languages.js', db, function (err) {
    console.warn("Loading fixtures ... ");
    if (err) throw err;
    db.connection.end()
});
