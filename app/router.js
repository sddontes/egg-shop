'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 微信小程序
  router.get('/weapp/user/login', controller.user.userwx.login); // 用户登录
  router.get('/weapp/user/getInfo', controller.user.userwx.getUserInfo); // 获取用户信息接口
  router.post('/weapp/user/modifyInfor', controller.user.userwx.modifyInfor); // 修改用户信息接口，比如用户新增nickname和Avatar
  router.get('/weapp/user/getMobile', controller.user.userwx.getUserMobile); // 微信授权获取手机号接口
  router.post('/api/user/getUserList', controller.user.userwx.getUserList); // 查询用户列表
  // 后台管理系统
  router.post('/api/user/adminlogin', controller.user.admin.login); // 登录
  router.post('/api/user/addAdmin', controller.user.admin.addAdmin); // 新增
  router.post('/api/user/getAdminInfo', controller.user.admin.getAdminInfo); // 查询单个
  router.post('/api/user/delAdmin', controller.user.admin.delAdmin); // 删除
  router.post('/api/user/updateAdmin', controller.user.admin.updateAdmin); // 修改
  router.post('/api/user/changeStatusAdmin', controller.user.admin.disabledAdmin); // 开启/禁用管理员
  router.post('/api/user/resetPassword', controller.user.admin.resetPassword); // 密码重置
  router.post('/api/user/getAdminList', controller.user.admin.getAdminList); // 查询列表

  // router.get('/api/user/getWxUserInfo', controller.user.userWx.getUserInfo); // 查询单个微信用户信息

  router.get('/api/upload', controller.upload.index); // oss上传获取keyid
};
