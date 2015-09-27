var express = require('express');
var swig = require('swig');

var db = require('./db');
var config = require('./config')

var app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', true);
swig.setDefaults({ cache: false });

app.use(config.server.path + "css", express.static(__dirname + '/public/css'));
app.use(config.server.path + "dashgum", express.static(__dirname + '/public/dashgum'));
app.use(config.server.path + "js", express.static(__dirname + '/public/js'));
app.use(config.server.path + "audio", express.static(__dirname + '/public/audio'));
app.use(config.server.path + "images", express.static(__dirname + '/public/images'));
app.use(config.server.path + "thumbnails", express.static(__dirname + '/public/thumbnails'));

/*
app.use(function(req, res, next) {
   if (req.url == '/rcln/labex-efl/cartographies')
	res.redirect(301, '/rcln/labex-efl/cartographies/')
});
*/

app.get(config.server.path, function(req, res) {
    if(req.url.substr(-1) != '/')
        res.redirect(301, config.server.path);
    else
        res.render('languages', {});
});

app.get(config.server.path + 'data/:id', function(req, res) {
    res.contentType('json');

    db.query('SELECT * FROM language WHERE id=' + req.params.id, function(err, rows) {
        if (err || rows.length == 0) {
            res.status(404).end();
            return;
        };

        ret = rows[0]
        db.query( 
            'SELECT language_author.author_id, language_author.language_id, author.name, author.email, author.about ' +
            'FROM language_author ' +
            'INNER JOIN author ON language_author.author_id=author.id ' +
            'WHERE language_author.language_id=' + req.params.id,
            function(err, rows) {
            if (err) {
                res.status(404).end();
                return;
            };

            authors = [];
            for (var i = 0; i < rows.length ; i++)
            {
                authors.push({
                    name: rows[i].name,
                    email: rows[i].email,
                    about: rows[i].about
                });
            }

            ret.authors = authors;

            if (ret.position != null && ret.position.trim().length > 0) {
                ret.positions = JSON.parse(ret.position);
            } else {
                ret.positions = null;
            }
            delete ret.position;

            if (ret.images != null && ret.images.trim().length > 0) {
                ret.images = JSON.parse(ret.images);
            } else {
                ret.images = null;
            }

            res.send(ret);
        });
    })
});

app.get(config.server.path + 'data', function(req, res) {
    res.contentType('json');
    
    db.query('SELECT * FROM language', function(err, rows) {
        languages = [];

        for (var i = 0 ; i < rows.length ; i ++) {
            row = rows[i];

            if (row.position != null && row.position.trim().length > 0) {
                positions = JSON.parse(row.position)
            } else {
                positions = null;
            }

            languages.push({
                id: row.id,
                name: row.name,
                glottonym: (row.glottonym == null ? "-" : row.glottonym),
                family: (row.family == null ? "-" : row.family),
                country: (row.country == null ? "-" : row.country),
                positions: positions,
                audio: row.audio,
                speakers: (row.speakers == null ? "-" : row.speakers)
            });
        }

        res.send(languages);

    });
});

app.listen(config.server.port);
