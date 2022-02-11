'use strict';
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  // 生成唯一id
  uuidv4,
  // 字符串转对象，转换出错返回{}或者默认值
  JSONParse(str, defaultResult) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return defaultResult || {};
    }
  },
  // 接口返回json对象
  json(data, code = 200, msg = 'success', addition) {
    return Object.assign(
      {
        result: code === 200 ? 'success' : 'fail',
        code: code || 0,
        message: msg,
        data,
      },
      addition
    );
  },
  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },
  changeTime(time) {
    return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss');
  },
  relativeTime(time) {
    return moment(new Date(time * 1000)).fromNow();
  },
  // 封装socket.io数据格式
  parseSocketMsg(action, payload = {}, metadata = {}) {
    return {
      meta: { timestamp: Date.now(), ...metadata },
      data: { action, payload },
    };
  },
};
