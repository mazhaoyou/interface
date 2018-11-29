const express = require('express');
const app = express();
const moment = require('moment')
    //导入cors模块,该模块为跨域所用
const cors = require('cors');
//const mysql = require('./database');
app.use(cors());

//解析表单的插件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))


//创建数据库连接对象
const mysql = require('mysql');
const conn = mysql.createConnection({
    // host: '127.0.0.1',//数据库地址
    // user: 'root',//账号
    // password: 'root',//密码
    // database: 'mydb_12_9',//库名
    // multipleStatements: true //允许执行多条语句

    host: "188.131.174.180",
    port: 3306,
    user: "root",
    password: "mzy12",
    database: "blog"
})
// 查询所有
app.get('/api/getlist', (req, res) => {
  const sqlStr = 'SELECT * FROM article ORDER BY articleID DESC '
  conn.query(sqlStr, (err, results) => {
      if (err) return res.json({ err_code: 1, message: '资料不存在', affextedRows: 0 })
      res.json({ err_code: 200, message: results, affextedRows: results.affextedRows })
  })
})
// 按条件查询
app.get('/api/getlistdetl', (req, res) => {
  const number = req.query.articleID
  const sqlStr = 'SELECT * FROM article  where articleID =?'
  conn.query(sqlStr, number, (err, results) => {
      if (err){
          return res.json({code: 1, message: '查询条件有误','err':err, affextedRows: 0 })
      } else {
        res.json({ code: 200, message: results, affextedRows: results.affextedRows })

      }
  })
})
// 插入
app.post('/api/addcard', (req, res) => {
  const user = req.body
  // var title = req.body.title;
  // var content = req.body.content;
  // var author = req.session.user.authorName;
  // var query = 'INSERT article SET articleTitle=' + mysql.escape(title) + ',articleAuthor=' + mysql.escape(author) + ',articleContent=' + mysql.escape(content) + ',articleTime=CURDATE()';
   user.articleTime = moment().format('YYYY-MM-DD HH:mm:ss')//格式化日期
   const sqlStr = 'insert into article set ?'
  conn.query(sqlStr,user,(err, results) => {
      if (err) return res.json({ err_code: 1, message: err, affectedRows: 0 })
      res.json({ err_code: 0, message: '恭喜成功', affectedRows: results.affectedRows })
  })

})



app.listen(3000, () => {
  console.log('正在监听端口3000,http://192.168.31.100:3000'); //192.168.1.114换成你的ip,本机ip查询用cmd=>ipconfig
})