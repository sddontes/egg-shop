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
  async getUserInfo(params) {
    const { username } = params;
    const result = await this.app.mysql.query(
      `select * from user_admin where username = '${username}'`
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
}

module.exports = UserService;
