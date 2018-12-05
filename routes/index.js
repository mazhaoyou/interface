const users = require('./router.js')

module.exports = function RouterModule (app) {
  //定义统一的路由前缀
  app.use('/api', users)
  app.listen(3000, () => {
    // console.log('http://localhost:' + config.port);
    console.log('正在监听端口3000,http://192.168.8.198:3000'); //192.168.1.114换成你的ip,本机ip查询用cmd=>ipconfig
  })
}
