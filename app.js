var express = require('express');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var multer = require('multer');

var upload = multer({
  dest: __dirname + '/uploads'
});

//  MONGOOSE
mongoose.connect('mongodb://localhost:27017/pokedex', { useNewUrlParser: true });
var db = mongoose.connection;
/* db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
}); */

// models
require('./models/Pokemon');
require('./models/Type');

/** @type {EXPRESS} [description] */
var app = express();

// img uploads
app.use(bodyParser.urlencoded());
app.use(upload.single('file'));

// resources
app.use('/css', express.static(`${__dirname}/node_modules/bootstrap/dist/css`));
app.use('/uploads', express.static(`${__dirname}/uploads`))

// routes
app.use('/', require('./routes/pokemons'));
app.use('/types', require('./routes/types'));

nunjucks.configure(__dirname+'/views', {
  autoescape: true,
  express: app,
});

/* app.get('/', (req, res) => {
  res.send('toto HOOOOOOO');
}) */

app.listen(3000);

