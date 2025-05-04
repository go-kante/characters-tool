const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use('/public', express.static('public'))


// mysqlに接続
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'detect_d_chara',
    dateStrings: "date",
    multipleStatements: true
});

// 他のファイルでmysqlを使えるようにexportします
module.exports = con

con.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
});

// ここでlogin関連のapiを管理
app.use('/', require('./routes/login.js'));

app.listen(3030, function () {
    console.log('listening on 3030')
});

