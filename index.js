
var express = require('express');
var swig = require('swig');

var app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', true);
swig.setDefaults({ cache: false });

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('languages', {});
});

app.get('/data', function(req, res) {
    res.contentType('json');
    res.send({ some: "stuff" });
});

app.listen(8080);
