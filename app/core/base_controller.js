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

  success(data, message, status) {
    this.ctx.body = {
      code: this.ctx.SUCCESS_CODE,
      data,
      message: message || '操作成功',
    };
    this.ctx.status = status || 200;
  }

  fail(message, code = this.ctx.ERROR_CODE) {
    this.ctx.body = { code, message: message || '操作失败', data: {} };
    this.ctx.status = 200;
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}

module.exports = BaseController;
