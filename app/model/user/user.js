'use strict';

const md5 = require('md5');
const Service = require('egg').Service;

/**
 * Model - 用户
 * @class
 * @author ruiyong-lee
 */
class userModel extends Service {
  //   /**
  //    * 查找某个用户数据
  //    * @param {string} userName - 用户账号
  //    * @param {string} password - 用户密码
  //    * @return {object|null} - 查找结果
  //    */
  async getUserInfo() {
    return await this.app.mysql.get('admin', {
      id: 1,
    });
  }

  /**
   * 新增用户
   * @param {object} params - 条件
   * @return {string|null} - 用户uuid
   */
  async saveNew(params = {}) {
    let { merchant, userUuid, userName } = params;
    const { app } = this;
    const crateInfo = app.getCrateInfo(userUuid, userName);

    merchant = {
      ...merchant,
      ...crateInfo,
      password: md5(merchant.password),
      orgName: merchant.name,
      userType: 'merchant',
      enableStatus: true,
    };

    return await app.model.User.Merchant.saveNew(merchant);
  }
}

module.exports = userModel;
