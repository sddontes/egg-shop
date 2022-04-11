'use strict';
const Service = require('egg').Service;
const crypto = require('crypto-js');

class MpUploadOssHelper {
  constructor(options) {
    this.accessKeyId = options.accessKeyId;
    this.accessKeySecret = options.accessKeySecret;
    // 限制参数的生效时间，单位为小时，默认值为1。
    this.timeout = options.timeout || 1;
    // 限制上传文件的大小，单位为MB，默认值为10。
    this.maxSize = options.maxSize || 10;
  }

  createUploadParams() {
    const policy = this.getPolicyBase64();
    const signature = this.signature(policy);
    return {
      OSSAccessKeyId: this.accessKeyId,
      policy,
      signature,
    };
  }

  getPolicyBase64() {
    const date = new Date();
    // 设置policy过期时间。
    date.setHours(date.getHours() + this.timeout);
    const srcT = date.toISOString();
    const policyText = {
      expiration: srcT,
      conditions: [
        // 限制上传文件大小。
        ['content-length-range', 0, this.maxSize * 1024 * 1024],
      ],
    };
    const buffer = new Buffer(JSON.stringify(policyText));
    return buffer.toString('base64');
  }

  signature(policy) {
    return crypto.enc.Base64.stringify(
      crypto.HmacSHA1(policy, this.accessKeySecret)
    );
  }
}

class UploadService extends Service {
  async index() {
    const mpHelper = new MpUploadOssHelper({
      accessKeyId: 'LTAI5tPjYUXMtC', //bdYZtWrGvj
      accessKeySecret: 'WEQNwWTfnmg', // ayx7ioCC5UQEh7Jfe1h
      // 限制参数的生效时间，单位为小时，默认值为1。
      timeout: 1,
      // 限制上传文件大小，单位为MB，默认值为10。
      maxSize: 10,
    });
    // 生成参数。
    const params = mpHelper.createUploadParams();
    return params;
  }
}
module.exports = UploadService;
