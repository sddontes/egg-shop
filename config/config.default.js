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
  config.swaggerdoc = {
    dirScanner: './app/controller', // 配置自动扫描的控制器路径。
    // 接口文档的标题，描述或其它。
    apiInfo: {
      title: 'NAPI', // 接口文档的标题。
      description: 'swagger-ui for NAPI document.', // 接口文档描述。
      version: '1.0.0', // 接口文档版本。
    },
    schemes: ['http', 'https'], // 配置支持的协议。
    consumes: ['application/json'], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html。
    produces: ['application/json'], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回。
    securityDefinitions: {
      // 配置接口安全授权方式。
      // apikey: {
      //   type: 'apiKey',
      //   name: 'clientkey',
      //   in: 'header',
      // },
      // oauth2: {
      //   type: 'oauth2',
      //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
      //   flow: 'password',
      //   scopes: {
      //     'write:access_token': 'write access_token',
      //     'read:access_token': 'read access_token',
      //   },
      // },
    },
    enableSecurity: false, // 是否启用授权，默认 false（不启用）。
    // enableValidate: true,    // 是否启用参数校验，默认 true（启用）。
    routerMap: false, // 是否启用自动生成路由，默认 true (启用)。
    enable: true, // 默认 true (启用)。
  };
  // 中间件
  config.middleware = ['auth', 'errorHandler'];
  return {
    ...config,
    ...userConfig,
  };
};
