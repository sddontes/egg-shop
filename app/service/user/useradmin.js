'use strict';

const md5 = require('md5');
const Service = require('egg').Service;

class UserService extends Service {
  async login({ username }) {
    const result = await this.app.mysql.query(
      `select * from user_admin where username = '${username}'`
    );
    return result[0];
  }
  /**
   * 查找某个用户数据
   * @param {string} userName - 用户账号
   * @param {string} password - 用户密码
   * @return {object|null} - 查找结果
   */
  async getUserInfo({ currentUserId }) {
    const result = await this.app.mysql.query(
      `select * from user_admin where user_id = '${currentUserId}'`
    );
    return result[0];
  }
  /**
   * 新增用户
   * @param {object} params - 条件
   * @return {string|null} - 用户uuid
   */
  async addUser(params = {}) {
    const { username, password } = params;
    const userid = this.ctx.helper.uuidv4();
    const result = await this.app.mysql.query(
      `INSERT INTO user_admin (user_id,username,password) values ('${userid}','${username}','${md5(
        password
      )}')`
    );
    return !!(result && result.affectedRows);
  }
  // 管理员列表查询
  async getManagerList(params = {}) {
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
      `select * from user_admin ${queryString}ORDER BY 'create-time' DESC limit ${
        page ? page - 1 : 0
      },${pageSize || 10};`
    );
    return result || [];
  }
}
module.exports = UserService;
