var router = require('express').Router();

// mysql
const con = require('./app/server.js')

// loginを管理できるライブラリー
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

router.use(session({ secret: '1234', resave: true, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());

// loginページ
router.get('/edit', function (req, res) {
    res.render('edit.ejs')
});

// login
// loginに失敗した場合、/failに飛ばす
router.post('/login', passport.authenticate('local', { failureRedirect: '/fail' }), function (req, res) {
    res.redirect('/')
});

passport.use(new LocalStrategy({
    // id, pw のそれぞれのinputのnameと合わせる
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
}, function (input_id, input_pw, done) {
    const sql = `select * from accounts where id = '${input_id}'`
    con.query(sql, function (err, result) {

        // mysql から取り出したaccounts情報から１番目の情報と照合する
        // 実際はもっとちゃんとした方がいいですが、なるべくシンプルに
        login_data = result[0]
        if (err) return done(err)
        if (!login_data) return done(null, false, { message: 'account does not exist' })
        if (input_pw == login_data.pw) {
            return done(null, login_data)
        } else {
            return done(null, false, { message: 'wrong password' })
        }
    })
}));

// ログインに成功したらuser.idのセッションを生成し、Cookieを作る
passport.serializeUser(function (user, done) {
    done(null, user.id)
});

passport.deserializeUser(function (user_id_saved, done) {
    // ユーザーの情報をDBから探す
    const sql = `select * from accounts where id = '${user_id_saved}'`
    con.query(sql, function (err, result) {
        done(null, result[0])
    })
});


// ミドルウェアでログイン有無によるページ接近の管理
function is_login(req, res, next) {
    if (req.user) {
        // loginした状態なら、通す
        next()
    } else {
        // loginしてないならこのページに飛ばす
        res.render('login.ejs')
    }
}

// ミドルウェアでログインしているかチェックし、ログインしているならreq.userのDBを見せる
router.get('/mypage', is_login, function (req, res) {
    // deserializeUserで得られたuserのDBデータ持ってくる
    console.log(req.user)
    res.send(req.user)
})



module.exports = router;
