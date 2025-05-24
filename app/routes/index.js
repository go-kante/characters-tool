const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

const ADMIN_ID = 'admin';
const ADMIN_PW = '1234';

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

router.get('/admin', function (req, res) {
  res.render('admin', { title: '管理者画面' });
});

router.post('/admin', function(req, res) {
  const { id, pw } = req.body;

  if (id === ADMIN_ID && pw === ADMIN_PW) {
    req.session.loggedIn = true;
    req.session.username = id;
    res.redirect('/admin/dashboard'); // ログイン成功時
  } else {
    res.render('admin', {
      title: '管理者画面',
      error: 'IDまたはパスワードが違います'
    });
  }
});

router.get('/admin/dashboard', function(req, res) {
  if (req.session.loggedIn) {
    res.render('dashboard', {
      username: req.session.username
    });
  } else {
    res.redirect('/admin'); // ログインしてなければログインページへ
  }
});

module.exports = router;
