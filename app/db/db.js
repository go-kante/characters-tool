const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sk0422',
  database: 'detect_d_chara',
  multipleStatements: true
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL接続失敗: ' + err.stack);
    return;
  }
  console.log('MySQL接続成功');
});

module.exports = connection;