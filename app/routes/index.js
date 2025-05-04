const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use('/public', express.static('public'))

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'kanta',
  password: 'sk0422OK',
  database: 'dependent_character'
});
connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return
  }
  console.log('success');
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '環境依存文字判別ツール' });
});

router.post('/', function(req, res, next) {
  res.render('index', { title: '環境依存文字判別ツール' });
});

router.get('/admin', function(req, res, next) {
  res.render('admin', { title: '管理者画面' });
});

router.post('/admin', function(req, res, next) {
  res.render('admin', { title: '管理者画面' });
});

router.use('/signup', require('./signup'));

module.exports = router;
