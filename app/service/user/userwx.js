'use strict';

const md5 = require('md5');
const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 查找某个用户数据
   * @param {string} userName - 用户账号
   * @param {string} password - 用户密码
   * @return {object|null} - 查找结果
   */
  async getUserInfo(params) {
    const { openid } = params;
    const result = await this.app.mysql.query(
      `select user_id,openid,status from user_users where openid = '${openid}'`
    );
    return result[0];
  }
  // 微信小程序用户列表，模糊查询
  async getUserList(params = {}) {
    const { nickname, userId: user_id, mobile, page, pageSize } = params;
    const _params = {
      nickname,
      mobile,
      user_id,
    };
    let queryString = '';
    for (const i in _params) {
      if (i && _params[i]) {
        queryString = queryString + `and ${i}='${_params[i]}' `;
      }
    }
    queryString = queryString ? 'where ' + queryString.slice(4) : '';
    const result = await this.app.mysql.query(
      `select * from user_users ${queryString}ORDER BY 'create-time' DESC limit ${
        page ? page - 1 : 0
      },${pageSize || 10};`
    );
    return result || [];
  }
  /**
   * 新增用户
   * @param {object} params - 条件
   * @return {string|null} - 用户uuid
   */
  async registerUser(params = {}) {
    const { openid, userId } = params;
    const result = await this.app.mysql.query(
      `INSERT INTO user_users (user_id,openid) values ('${userId}','${openid}')`
    );
    return result;
  }

  /**
   * 修改用户
   * @param {object} params - 条件
   * @return {string|null} - 用户uuid
   */
  async saveModify(params = {}) {
    const { app } = this;
    let { merchant, userUuid, userName } = params;
    const { password } = merchant;
    const modifyInfo = app.getModifyInfo(userUuid, userName);

    if (password) {
      merchant.password = md5(password);
    }

    merchant = { ...merchant, ...modifyInfo };

    return await app.model.User.Merchant.saveModify(merchant);
  }

  /**
   * 修改用户密码
   * @param {object} params - 条件
   * @return {string|null} - 用户uuid
   */
  async savePasswordModify(params = {}) {
    const { app } = this;
    const { userUuid, userName, oldPassword, newPassword } = params;
    const modifyInfo = app.getModifyInfo(userUuid, userName);

    return await app.model.User.Merchant.savePasswordModify({
      uuid: userUuid,
      oldPassword: md5(oldPassword),
      password: md5(newPassword),
      ...modifyInfo,
    });
  }

  /**
   * 获取用户分页列表
   * @param {object} params - 条件
   * @return {object|null} - 查找结果
   */
  async query(params = {}) {
    const { app } = this;
    return await app.model.User.Merchant.query({
      ...params,
      attributes: [
        'uuid',
        'version',
        'createdTime',
        'name',
        'enableStatus',
        'userName',
        'servicePhone',
        'linkPhone',
        'linkMan',
      ],
    });
  }

  /**
   * 根据uuid获取用户
   * @param {object} uuid - 用户uuid
   * @param {object} userType - 用户类型
   * @return {object|null} - 查找结果
   */
  async get(uuid) {
    const { app } = this;
    return await app.model.User.Merchant.get({
      uuid,
      attributes: [
        'uuid',
        'version',
        'name',
        'enableStatus',
        'userName',
        'servicePhone',
        'linkPhone',
        'linkMan',
        'address',
        'appId',
        'appSecret',
        'mchId',
        'mchKey',
      ],
    });
  }
}

module.exports = UserService;
