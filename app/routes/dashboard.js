var express = require('express');
var router = express.Router();

/* GET users listing. */
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
