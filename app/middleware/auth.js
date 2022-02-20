'use strict';

/**
 * 判断是否登录
 * @param {object} options - 中间件的配置项
 * @param {Egg.Application} app - 当前应用的实例
 * @author ruiyong-lee
 * @return {null} null
 */
module.exports = (options, app) => {
  return async function auth(ctx, next) {
    if (ctx.path.indexOf('/weapp/') === 0) {
      // 微信小程序接口
      const sessionid = ctx.get('sessionid');
      const session =
        ctx.helper.JSONParse(await app.redis.get('default').get(sessionid)) ||
        {};
      const { openid } = session;
      const excludedPathList = ['/weapp/login', '/weapp/user/login']; // 不需要登录的接口

      ctx.request.body.openid = openid;
      ctx.request.body = { ...ctx.request.body, ...ctx.query };

      // 过滤登录接口
      if (openid || excludedPathList.includes(ctx.path)) {
        await next();
      } else {
        ctx.status = 401;
        ctx.body = {
          code: ctx.NO_LOGIN_CODE,
          message: '尚未登录',
        };
      }
    } else {
      // 管理端接口
      // 过滤登录接口和验证token
      const ignorePaths = ['/api/user/login', '/api/user/logout'];
      if (ignorePaths.includes(ctx.path)) {
        await next();
      } else {
        const valid = await ctx.verifyToken();
        if (valid) {
          await next();
        }
      }
    }
  };
};
