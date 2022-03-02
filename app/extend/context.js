'use strict';

module.exports = {
  SUCCESS_CODE: 0, // 成功
  NO_LOGIN_CODE: 100, // 未登录
  UNIQUE_CODE: 200, // 唯一性冲突
  ERROR_CODE: 500, // 失败

  // 获取token
  getAccessToken() {
    return (
      this.request.header.authorization ||
      this.cookies.get('token', { signed: false })
    );
  },
  // 设置token
  setToken(data = {}) {
    const { app } = this;
    // const { name, userUuid, userName, userType, orgUuid } = data;
    // 如果需要得到精确的结果，需要自己另加额外的控制标志位
    // if (decodeURI(name) === name) {
    //   name = encodeURI(name);
    // }
    const token = app.jwt.sign(data, app.config.jwt.secret, {
      expiresIn: '12h',
    });
    const cookieConfig = {
      maxAge: 1000 * 3600 * 24 * 7,
      httpOnly: false,
      overwrite: true,
      signed: false,
    };
    this.cookies.set('token', Object.keys(data).length ? token : '', {
      ...cookieConfig,
      httpOnly: true,
    });
    return token;
  },
  removeToken() {
    this.cookies.set('token', null);
  },
  // 校验token
  async verifyToken() {
    const { app } = this;
    const token = this.getAccessToken(this);
    const verifyResult = await new Promise((resolve) => {
      app.jwt.verify(token, app.config.jwt.secret, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            this.setToken(); // 刷新token
            resolve({ verify: true, message: 'token失效' });
          } else {
            resolve({ verify: false, message: err.message });
          }
        } else {
          resolve({ verify: true, data: decoded });
        }
      });
    });
    if (!verifyResult.verify) {
      this.verifyFail(401, verifyResult.message);
      return false;
    }
    this.request.body = {
      ...this.request.body,
      ...this.query,
      currentUserId: verifyResult.data?.user_id,
    };
    return true;
  },
  // 校验token失败
  verifyFail(code, message) {
    this.body = { code, message };
    this.status = code;
  },
};
