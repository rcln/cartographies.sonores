var express = require('express');
var swig = require('swig');

var db = require('./db');

var app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', true);
swig.setDefaults({ cache: false });

app.use("/rcln/labex-efl/cartographies/css", express.static('public/css'));
app.use("/rcln/labex-efl/cartographies/dashgum", express.static('public/dashgum'));
app.use("/rcln/labex-efl/cartographies/js", express.static('public/js'));
app.use("/rcln/labex-efl/cartographies/audio", express.static('public/audio'));

/*
app.use(function(req, res, next) {
   if (req.url == '/rcln/labex-efl/cartographies')
	res.redirect(301, '/rcln/labex-efl/cartographies/')
});
*/
app.get('/rcln/labex-efl/cartographies/', function(req, res) {
    res.render('languages', {});
});

app.get('/rcln/labex-efl/cartographies/data/:id', function(req, res) {
    res.contentType('json');

    db.query('SELECT * FROM language WHERE id=' + req.params.id, function(err, rows) {
        if (err) throw err;

        ret = rows[0]
        db.query( 
            'SELECT language_author.author_id, language_author.language_id, author.name, author.email, author.about ' +
            'FROM language_author ' +
            'INNER JOIN author ON language_author.author_id=author.id ' +
            'WHERE language_author.language_id=' + req.params.id,
            function(err, rows) {
            if (err) throw err;

            authors = [];
            for (var i = 0; i < rows.length ; i++)
            {
                authors.push({
                    name: rows[i].name,
                    email: rows[i].email,
                    about: rows[i].about
                });
            }

            ret.authors = authors

            res.send(ret);
        });
    })
});

app.get('/rcln/labex-efl/cartographies/data', function(req, res) {
    res.contentType('json');
    db.query('SELECT language_author.author_id, language_author.language_id, author.name FROM language_author INNER JOIN author ON language_author.author_id=author.id;', function(err, rows) {
        if (err) throw err;

        authors = Object();
        for (var i = 0; i < rows.length ; i++)
        {
            lid = rows[i].language_id;
            name = rows[i].name
            if (lid in authors)
                authors[lid] += ", " + name;
            else
                authors[lid] = name;
        }
    
        db.query('SELECT * FROM language', function(err, rows) {
            languages = [];

            for (var i = 0 ; i < rows.length ; i ++) {
                row = rows[i];

                if (row.position != null && row.position.trim().length > 0) {
                    l = row.position.split(",");
                    lat = parseFloat(l[0]);
                    lon = parseFloat(l[1]);
                } else {
                    lon = null;
                    lat = null;
                }

                languages.push({
                    id: row.id,
                    name: row.name,
                    glottonym: (row.glottonym == null ? "-" : row.glottonym),
                    family: (row.family == null ? "-" : row.family),
                    country: (row.country == null ? "-" : row.country),
                    lon: lon,
                    lat: lat,
                    author: authors[row.id],
                    audio: row.audio
                });
            }

            res.send(languages);

        });
    });
});

app.listen(8080);
