'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/user/login', controller.login.userLogin);
  router.get('/user/register', controller.home.index);
  router.post('/user/manage', controller.manage.manageLogin);
};
