'use strict';

const Controller = require('../../core/base_controller');
const md5 = require('md5');

/**
 * @controller BookController（ 注释必写，swagger-doc是根据这段注释来生成接口的 ）。
 */
class UserController extends Controller {
  /**
   * @summary 用户登录
   * @description 用户登录
   **/
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const res = await ctx.service.user.useradmin.login({ username });
    if (!res) {
      this.fail(0, '用户尚未注册');
      return;
    }
    if (res.password !== md5(password)) {
      this.fail(0, '密码错误');
      return;
    }
    const { user_id } = res;
    const token = ctx.setToken({ user_id });
    this.success({ user_id, username, token });
  }
  /**
   * @Description: 新增用户
   * @param {*}
   * @return {*}
   */
  async addUser() {
    const { ctx } = this;
    const { username } = ctx.request.body;
    // 判断用户是否已注册
    const userInfo = await ctx.service.user.useradmin.getUserInfo({ username });
    if (userInfo) {
      this.fail('用户名已存在');
      return;
    }
    const isSuccess = await ctx.service.user.useradmin.addUser(
      ctx.request.body
    );
    if (isSuccess) {
      this.success();
      return;
    }
    this.fail();
  }
  // 查询单个管理员的信息详情
  async getUserInfo() {
    const { ctx } = this;
    const { currentUserId } = ctx.request.body;
    const userInfo = await ctx.service.user.useradmin.getUserInfo({
      currentUserId,
    });
    if (userInfo) {
      this.success(userInfo);
      return;
    }
    this.fail();
  }
  // 查询小程序用户列表，支持模糊查询
  // 手机号字段格式有问题，暂不支持
  async getManagerList() {
    const { ctx } = this;
    const managerList = await ctx.service.user.useradmin.getManagerList(
      ctx.request.body
    );
    managerList.length
      ? this.success(managerList)
      : this.fail([], '未查询到任何信息');
  }
}

module.exports = UserController;
