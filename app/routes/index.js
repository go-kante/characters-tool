var express = require('express');
var router = express.Router();


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



module.exports = router;
