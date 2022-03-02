'use strict';

const Controller = require('../core/base_controller');

class UploadController extends Controller {
  async index() {
    const { ctx } = this;
    const params = await ctx.service.upload.index();
    // 小程序端参考：https://help.aliyun.com/document_detail/92883.html
    this.success(params);
  }
}

module.exports = UploadController;
