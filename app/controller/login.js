'use strict';

const Controller = require('../core/base_controller');

/**
 * Controller - 登录
 * @class
 * @author ruiyong-lee
 */
class UserController extends Controller {
  /**
   * 用户登录
   */
  async userLogin() {
    const { ctx } = this;
    const res = await ctx.service.user.user.getUserInfo();
    const result = {
      name: 'nickname',
      userUuid: 'password',
      userName: 'nickname',
      userType: 'sdsd',
      orgUuid: 'password',
    };
    console.log('result', ctx.helper.json(res[0]));
    ctx.body = ctx.helper.json(res[0]);
    ctx.setToken(result);
  }
}

module.exports = UserController;
