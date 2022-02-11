'use strict';

const Controller = require('../core/base_controller');

/**
 * Controller - 登录
 * @class
 * @author ruiyong-lee
 */
class ManageUser extends Controller {
  /**
   * 用户登录
   */
  async manageLogin() {
    const { ctx } = this;
    const params = ctx.request.body;
    const data = await ctx.service.user.user.getUserInfo(params);
    ctx.body = ctx.helper.json(data);
  }
}

module.exports = ManageUser;
