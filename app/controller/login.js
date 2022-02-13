'use strict';

const Controller = require('../core/base_controller');

/**
 * @controller BookController（ 注释必写，swagger-doc是根据这段注释来生成接口的 ）。
 */
class UserController extends Controller {
  /**
   * @summary 用户登录
   * @description 用户登录
   **/
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
