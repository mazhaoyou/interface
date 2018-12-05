// 1. 创建一个 router 对象 （router 对象既是一个对象，也是一个函数）
var express = require('express');
// 加载业务模块
var path = require('path');
const conn = require('../db/database.js');
var router = express.Router();
const checkAuth = require('../middlewares/authorization')
const ApiController = require('../controller/apiController')

const apiController = new ApiController()

/* 博客列表 */
router.get('/getlist', (req, res) => {
  const sqlStr = 'SELECT * FROM article ORDER BY articleID DESC '
  conn.query(sqlStr, (err, results) => {
    if (err) return res.json({
      code: 1,
      message: '资料不存在',
      affextedRows: 0
    })
    res.json({
      code: 200,
      list: results,
      affextedRows: results.affextedRows
    })
  })
})
// 按条件查询
router.get('/getlistdetl', (req, res) => {
  const number = req.query.articleID
  const sqlStr = 'SELECT * FROM article  where articleID =?'
  conn.query(sqlStr, number, (err, results) => {
    if (err) {
      return res.json({
        code: 1,
        message: '查询条件有误',
        'err': err,
        affextedRows: 0
      })
    } else {
      res.json({
        code: 200,
        list: results,
        affextedRows: results.affextedRows
      })

    }
  })
})
// 插入
router.post('/addcard', (req, res) => {
  const user = req.body;
  // var title =articleTitle req.body.title;
  // var content = req.body.content;
  // var author = req.session.user.authorName;
  // var query = 'INSERT article SET =' + mysql.escape(title) + ',articleAuthor=' + mysql.escape(author) + ',articleContent=' + mysql.escape(content) + ',articleTime=CURDATE()';
  user.articleTime = moment().format('YYYY-MM-DD HH:mm:ss'); //格式化日期
  const sqlStr = 'insert into article set ?';
  console.log("user=" + user);
  conn.query(sqlStr, user, (err, results) => {
    if (err) return res.json({
      err_code: 1,
      message: err,
      affectedRows: 0
    })
    res.json({
      err_code: 0,
      message: '恭喜成功',
      affectedRows: results.affectedRows
    })
  })

})

/**
 * 定义路由
 */

//登陆路由
router.post('/login', checkAuth, apiController.userLogin.bind(apiController))
//注册路由
router.post('/register', checkAuth, apiController.userRegister.bind(apiController))

// 3. 返回 router 对象
module.exports = router;