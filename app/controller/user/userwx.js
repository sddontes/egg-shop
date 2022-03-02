'use strict';

const Controller = require('../../core/base_controller');
const { wxconfig } = require('../../../config/contanst');

/**
 * @controller BookController（ 注释必写，swagger-doc是根据这段注释来生成接口的 ）。
 */
class UserController extends Controller {
  /**
   * 小程序用户注册/登录
   * @return {function|null} 登录结果
   */
  async login() {
    const { ctx, app } = this;
    const { code } = ctx.request.body;
    const sessionid = ctx.helper.uuidv4();
    // 登录凭证校验
    const weappInfo =
      (await ctx.curl(
        `https://api.weixin.qq.com/sns/jscode2session?appid=${wxconfig.appId}&secret=${wxconfig.appSecret}&js_code=${code}&grant_type=authorization_code`,
        {
          dataType: 'json',
        }
      )) || {};
    const { openid, session_key } = weappInfo.data || {};
    if (openid) {
      const result = JSON.stringify({ openid, session_key });
      // 保存openid和session_key到redis
      await app.redis.get('default').setex(sessionid, 3600 * 24, result);
      const isRegister = await ctx.service.user.userwx.getUserInfo({ openid });
      if (!isRegister) {
        await ctx.service.user.userwx.registerUser({
          openid,
          userId: ctx.helper.uuidv4(),
        });
      }
      this.success(sessionid);
    } else {
      return this.fail(ctx.ERROR_CODE, weappInfo.data.errmsg);
    }
  }
  /**
   * @Description: 获取微信用户基本信息
   * @param {*}
   * @return {*}
   */
  async getUserInfo() {
    const { ctx } = this;
    const rule = {
      openid: 'string',
    };
    ctx.validate(rule);
    const res = await ctx.service.user.userwx.getUserInfo(ctx.request.body);
    this.success(res);
  }
  /**
   * @Description: 修改微信用户基本信息
   * @param {*}
   * @return {*}
   */
  async modifyInfor() {
    const { ctx, app } = this;
    const rule = {
      openid: 'string',
    };
    ctx.validate(rule);
    const res = await ctx.service.user.user.modifyInfor(ctx.request.body);
    this.success(res);
  }
  /**
   * @Description: 获取微信用户手机号码
   * @param {*}
   * @return {*}
   */
  async getUserMobile() {
    const { ctx, app } = this;
    const rule = {
      openid: 'string',
    };
    ctx.validate(rule);
    const res = await ctx.service.user.user.getUserInfo(ctx.request.body);
    this.success(res);
  }
  // 查询小程序用户列表，支持模糊查询
  // 手机号字段格式有问题，暂不支持
  async getUserList() {
    const { ctx } = this;
    const userList = await ctx.service.user.userwx.getUserList(
      ctx.request.body
    );
    userList.length
      ? this.success(userList)
      : this.fail([], '未查询到任何信息');
  }
}

module.exports = UserController;
