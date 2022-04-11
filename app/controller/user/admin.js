'use strict';

const Controller = require('../../core/base_controller');
const md5 = require('md5');

/**
 * Controller - user merchant
 * @class
 * @author ruiyong-lee
 */
class UserAdminController extends Controller {
  /**
   * 管理员登录
   */
  async login() {
    const { ctx } = this;
    const { userName, password } = ctx.request.body;
    const res = await ctx.service.user.admin.getAdmin(userName);
    if (!res) {
      this.fail(0, '用户尚未注册');
      return;
    }
    if (res.password !== md5(password)) {
      this.fail(0, '密码错误');
      return;
    }
    if (res.enableStatus === 'disabled') {
      this.fail(0, '该用户已被禁用');
      return;
    }
    // 设置token，并返回
    const token = this.ctx.setToken({ user_id: res.uuid });
    const result = { ...res.dataValues, token };
    delete result.password;
    this.success(result);
  }
  /**
   * 根据userName获取管理员
   */
  async getAdminInfo() {
    const { ctx } = this;
    const admin = await ctx.service.user.admin.getAdmin(ctx.request.body.userName);
    this.success(admin);
  }
  /**
   * 新增管理员
   */
  async addAdmin() {
    const { ctx } = this;
    const { userName } = ctx.request.body;
    const rule = {
      userName: 'string',
      password: 'string',
    };
    ctx.validate(rule);
    const isExited = await ctx.service.user.admin.getAdmin(userName);
    if (isExited) {
      this.fail(0, '该用户名已存在');
      return;
    }
    const res = await ctx.service.user.admin.addAdmin(ctx.request.body);
    const admin = { ...res.dataValues };
    delete admin.password;
    this.success(admin);
  }
  /**
   * 根据uuid删除管理员
   */
  async delAdmin() {
    const { ctx } = this;
    const { uuid } = ctx.request.body;
    const rule = {
      uuid: 'string',
    };
    ctx.validate(rule);
    const admin = await ctx.service.user.admin.delAdmin(uuid);
    if (!admin) {
      this.fail();
      return;
    }
    this.success(admin);
  }
  /**
   * 修改管理员
   */
  async updateAdmin() {
    const { ctx } = this;
    const { uuid, userName, name, currentUserId } = ctx.request.body;
    const rule = {
      uuid: 'string',
      userName: 'string',
    };
    ctx.validate(rule);
    const admin = await ctx.service.user.admin.updateAdmin({ uuid, userName, name, currentUserId });
    if (!admin) {
      this.fail();
      return;
    }
    this.success({ uuid, userName });
  }
  /**
   * 禁用管理员
   */
  async disabledAdmin() {
    const { ctx } = this;
    const { uuid, enableStatus, currentUserId } = ctx.request.body;
    const rule = {
      uuid: 'string',
      enableStatus: [ 'enabled', 'disabled' ],
    };
    ctx.validate(rule);
    const admin = await ctx.service.user.admin.updateAdmin({ uuid, enableStatus, currentUserId });
    if (!admin) {
      this.fail();
      return;
    }
    this.success({ uuid, userName: admin.userName, enableStatus });
  }
  /**
   * 密码重置
   */
  async resetPassword() {
    const { ctx } = this;
    const { uuid, password, currentUserId } = ctx.request.body;
    const rule = {
      uuid: 'string',
      password: 'string',
    };
    ctx.validate(rule);
    const admin = await ctx.service.user.admin.updateAdmin({ uuid, password: md5(password), currentUserId });
    if (!admin) {
      this.fail();
      return;
    }
    this.success({ uuid, userName: admin.userName, password });
  }
  /**
   * 查询列表
   */
  async getAdminList() {
    const { ctx } = this;
    const { uuid, userName } = ctx.request.body;
    const rule = {
      uuid: 'string',
      userName: 'string',
    };
    ctx.validate(rule);
    const admin = await ctx.service.user.admin.updateAdmin(ctx.request.body);
    if (!admin) {
      this.fail();
      return;
    }
    this.success({ uuid, userName });
  }
  
}

module.exports = UserAdminController;
