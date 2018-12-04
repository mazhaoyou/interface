const express = require('express')
const checkAuth = require('../middlewares/authorization')
const router = express.Router()
const ApiController = require('../controller/apiController')

const apiController = new ApiController()

/**
 * 在这里定义路由
 */

//登陆路由
router.post('/login', checkAuth, apiController.userLogin.bind(apiController))
//注册路由
router.post('/register', checkAuth, apiController.userRegister.bind(apiController))

module.exports = router