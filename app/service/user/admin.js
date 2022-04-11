"use strict";
const { v4: uuidv4 } = require("uuid");
const md5 = require("md5");
const Service = require("egg").Service;

/**
 * Service - admin
 * @class
 * @author ruiyong-lee
 */
class AdminService extends Service {
  /**
   * 查找某个管理员数据
   * @param {string} userName - 管理员账号 [ 'userName', 'uuid', 'createdTime', 'creatorName', 'creatorId', 'name', 'enableStatus', 'userType' ]
   * @return {object|null} - 查找结果
   */
  async getAdmin(userName) {
    const res = await this.app.model.User.Admin.getAdmin({
      attributes: { exclude: [] },
      userName,
    });
    return res;
  }
  /**
   * 新增管理员
   * @param {string} userInfo - 管理员信息
   * @return {object|null} - 查找结果
   */
  async addAdmin(userInfo) {
    const uuid = uuidv4();
    const { userName, currentUserId } = userInfo;
    const params = {
      lastModifiedTime: new Date(),
      lastModifierName: "system",
      lastModifierId: currentUserId,
      createdTime: new Date(),
      creatorName: "system",
      creatorId: currentUserId,
      enableStatus: "enabled",
      userType: "admin",
      name: userName,
      userName,
      uuid,
      password: md5(userInfo.password),
    };
    return await this.app.model.User.Admin.addAdmin(params);
  }
  /**
   * 删除管理员
   * @param {string} uuid - 管理员id
   * @return {object|null} - 操作结果
   */
  async delAdmin(uuid) {
    const adminUser = await this.app.model.User.Admin.findByPk(uuid);
    if (!adminUser) return;
    return await adminUser.destroy();
  }
  /**
   * 修改管理员
   * @param {object} params - 条件
   * @return {string|null} - 商家uuid
   */
  async updateAdmin(params = {}) {
    const { app } = this;
    const modifyInfo = app.getModifyInfo(params.currentUserId);
    const _params = app.filterParams(params);
    return await app.model.User.Admin.updateAdmin({
      ..._params,
      ...modifyInfo,
    });
  }
  /**
   * 修改管理员密码
   * @param {object} params - 条件
   * @return {string|null} - 商家uuid
   */
  async savePasswordModify(params = {}) {
    const { app } = this;
    const { userUuid, currentUserId, oldPassword, newPassword } = params;
    const modifyInfo = app.getModifyInfo(currentUserId);
    return await app.model.User.Admin.savePasswordModify({
      uuid: userUuid,
      oldPassword: md5(oldPassword),
      password: md5(newPassword),
      ...modifyInfo,
    });
  }
}

module.exports = AdminService;
