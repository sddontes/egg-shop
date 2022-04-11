'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // mysql: {
  //   enable: true,
  //   package: 'egg-mysql',
  // },
  // 校验入参
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // jwt token认证
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  // swagger接口文档
  // swaggerdoc: {
  //   enable: true,
  //   package: 'egg-swagger-doc',
  // },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
};
