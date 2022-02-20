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
  // 后台管理系统
  router.post('/api/user/login', controller.user.useradmin.login); // 登录
  router.post('/api/user/addUser', controller.user.useradmin.addUser); // 新增
  router.post('/api/user/getUserInfo', controller.user.useradmin.getUserInfo); // 查询单个管理员信息
  // router.get('/api/user/getWxUserInfo', controller.user.userWx.getUserInfo); // 查询单个微信用户信息
};
