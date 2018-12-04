const express = require('express');
const app = express();
const moment = require('moment')
//导入cors模块,该模块为跨域所用
const cors = require('cors');
const config = require('./config/config.js');

// 加载路由模块
const router = require('./routes/index.js');
app.use(cors());
app.use(router);

//解析表单的插件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}))


//创建数据库连接对象
//const mysql = require('mysql');
// const conn = mysql.createConnection({
//     // host: '127.0.0.1',//数据库地址
//     // user: 'root',//账号
//     // password: 'root',//密码
//     // database: 'mydb_12_9',//库名
//     // multipleStatements: true //允许执行多条语句

//     host: "188.131.174.180",
//     port: 3306,
//     user: "root",
//     password: "mzy123",
//     database: "blog"
// })
// 查询所有


app.listen(3001, () => {
  // console.log('http://localhost:' + config.port);
  console.log('正在监听端口3000,http://192.168.8.198:3001'); //192.168.1.114换成你的ip,本机ip查询用cmd=>ipconfig
})