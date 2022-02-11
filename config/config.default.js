/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1644306347590_7787';
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // add your mysql
  config.mysql = {
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123',
      // 数据库名
      database: 'boblog',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // set header allow origin
  config.cors = {
    origin: '*',
    allowMethods: 'GET,PUT,POST,DELETE',
  };

  config.security = {
    csrf: {
      enable: false,
      ignore: (ctx) => {
        if (ctx.request.url === `/${config.adminPath}/product/doUpload`) {
          return true;
        }
        return false;
      },
    },
    domainWhiteList: ['*'],
  };
  config.validate = {
    // convert: false,
    // validateRoot: false,
  };
  // jwt
  config.jwt = {
    secret: '123456',
    // ignore: '/weapp',
  };
  // redis
  config.redis = {
    clients: {
      default: {
        host: '127.0.0.1',
        port: '6379',
        password: '',
        db: '0',
      },
      subscribe: {
        host: '127.0.0.1',
        port: '6379',
        password: '',
        db: '1',
      },
      session: {
        host: '127.0.0.1',
        port: '6379',
        password: '',
        db: '2',
      },
    },
    agent: true,
  };
  // 文件上传 File 模式
  // multipart: {
  //   mode: 'file',
  // },

  // 中间件
  config.middleware = ['auth', 'errorHandler'];
  return {
    ...config,
    ...userConfig,
  };
};
