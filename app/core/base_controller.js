'use strict';

const { Controller } = require('egg');

/**
 * BaseController
 * @class
 * @author ruiyong-lee
 */
class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  success(data, message = '操作成功', code = this.ctx.SUCCESS_CODE) {
    this.ctx.body = { code, message, data };
    this.ctx.status = 200;
  }

  fail(data = {}, message = '操作失败', code = this.ctx.ERROR_CODE) {
    this.ctx.body = { code, message, data };
    this.ctx.status = 200;
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}

module.exports = BaseController;
