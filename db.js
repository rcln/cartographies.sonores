var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Language = new Schema({
    id: Number,
    language: String,
    author: String,
    lexifier: String,
    region: String,
    lon: String,
    lat: String
});

mongoose.Language = mongoose.model('Language', Language);

mongoose.connect('mongodb://localhost/cartographie', function(err) {
    if (err) throw err;
});
module.exports = mongoose;
