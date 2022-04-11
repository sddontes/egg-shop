'use strict';

module.exports = (app) => {
  const { model } = app;
  const adminSchema = require('../schema/admin.js')(app);
  const Admin = model.define('admin', adminSchema);

  /**
   * 查找管理员
   * @param {object} { uuid, attributes } - 条件
   * @return {object|null} - 查找结果
   */
  Admin.get = async ({ uuid, attributes }) => {
    return await Admin.findOne({
      attributes,
      where: { uuid },
    });
  };

  return Admin;
};
