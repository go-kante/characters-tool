const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');


require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use('/public', express.static('public'))



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

const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
connection.query(sql, [id, pw], (err, results) => {
  if (err) {
    return res.status(500).send('サーバーエラー');
  }

  if (results.length > 0) {
    req.session.loggedIn = true;
    req.session.username = id;
    res.redirect('/admin/dashboard');
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
