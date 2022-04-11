'use strict';

module.exports = (app) => {
  const { model } = app;
  const adminSchema = require('../../schema/admin.js')(app);
  const Admin = model.define('admin', adminSchema);

  /**
   * 查询单个管理员by userName
   * @param {object} { userName, attributes } - 条件
   * @return {object|null} - 查找结果
   */
  Admin.getAdmin = async ({ attributes, userName }) => {
    return await Admin.findOne({
      attributes,
      where: { userName },
    });
  };
  /**
   * 新增管理员
   * @param {object} adminInfo - 新增参数
   * @return {object|null} - 结果
   */
  Admin.addAdmin = async (adminInfo) => {
    return await Admin.create(adminInfo);
  };
  /**
   * 修改管理员
   * @param {object} params - 新增参数
   * @return {object|null} - 结果
   */
  Admin.updateAdmin = async (params) => {
    const adminuser = await Admin.findByPk(params.uuid);
    return adminuser.update(params);
  };
  /**
   * 查询管理员列表
   * @param {object} { attributes } - 条件
   * @return {object|null} - 查找结果
   */
  Admin.userList = async ({ attributes, userName, password }) => {
    return await Admin.findAll({
      attributes,
      where: { password, userName },
    });
    // const condition = {
    //   offset: (page - 1) * limit,
    //   limit,
    //   order,
    //   attributes,
    //   where: { orgUuid },
    // };

    // if (keywordsLike) {
    //   condition.where.name = { [Op.like]: `%%${keywordsLike}%%` };
    // }

    // const { count, rows } = await FreightPlan.findAndCountAll(condition);

    // return { page, count, rows };
  };
  /**
   * 禁用管理员
   * @param {object} { userName, password, attributes } - 条件
   * @return {object|null} - 设置结果
   */
  Admin.userDisabled = async ({ attributes, userName }) => {
    return await Admin.findOne({
      attributes,
      where: { userName },
    });
  };
  return Admin;
};
