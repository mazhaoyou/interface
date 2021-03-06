const logger = require("log4js").getLogger("controllers/musicController");
const BaseController = require('./baseController');
const ApiService = require("../services/apiService");

/**
 * 业务逻辑层
 * 主要对业务逻辑进行处理
 */
class ApiController extends BaseController {
  constructor() {
    super();
    this.apiService = new ApiService();
  }

  /**
   * 登陆注册
   * @param req
   * @param res
   */
  userLogin(req, res) {
    try {
      const query = req.query
      const number = req.body.number
      const password = req.body.password
      let loginData;
      //登陆
      loginData = this.apiService.userLand(number, password).then(data => {
        // jsonData=super.json(200,data)
        //this.json(data);
        res.status(200).json(this.result(data))
      }).catch(err => {
        logger.error(err);
        //res.status(400).json({
        //ms: err
        //});
        res.status(400).json(err)
      });
    } catch (e) {
      res.status(400).json({
        msg: e.message
      });
    }
  }

  /**
   * 注册
   * @param req
   * @param res
   */
  userRegister(req, res) {

    try {
      const query = req.query
      const number = req.body.number
      const password = req.body.password
      console.log("number="+number);
      let loginData;
      loginData = this.apiService.userRegister(number, password).then(data => {
        res.status(200).json(this.result(data));
      }).catch(err => {
        logger.error(err);
        res.status(400).json({
          ms: err
        });
      });

    } catch (e) {
      res.status(400).json({
        msg: e.message
      });
    }
  }
  /*博客列表*/
  bolgList(req,res){
 try {
   
 } catch (error) {
  res.status(400).json({
    msg: error.message
  });
 }
  }
}

module.exports = ApiController;