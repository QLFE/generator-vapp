/*
 * @Author: Wang Xiao
 * @Date: 2017-05-09 20:46:50
 * @Last Modified by: Wang Xiao
 * @Last Modified time: 2017-05-18 10:45:03
 */

import { Base64 } from 'js-base64';
import ios from './ios';
import android from './android';
import web from './web';

class Proxy {
  constructor(platform) {
    this.app = platform;

    if (platform === 'IOS') {
      this.driver = ios;
    }

    if (platform === 'android') {
      this.driver = android;
    }

    if (platform === 'WEB') {
      this.driver = web;
    }

    this.callbackFuncs = {}; // 协议注册回调
    this.callbackContent = {}; // App 注入的 callback 数据

    this.exposeToApp(); // 把方法暴露给 App
  }

  /**
   * 调用协议方法
   *
   * @param {any} actionName 协议方法名
   * @param {any} params 协议参数，json形式
   *
   * @memberof Proxy
   */
  action(actionName, params) {
    const callback = params && params.callback;
    let funcName;

    if (callback) {
      funcName = this.registerCB(actionName, callback);

      params.callback = funcName;
    }

    // 判断是否有特定方法，不存在则调用通用方法
    if (this.driver[actionName]) {
      this.driver[actionName](params, this);
    } else {
      this.driver.action(actionName, params, this);
    }
  }

  /**
   * 注册回调
   *
   * @param {any} actionName 回调名字
   * @param {any} callback 回调函数
   *
   * @memberof Proxy
   */
  registerCB(actionName, callback) {
    if (callback) {
      if (typeof callback === 'function') {
        callback = {
          success: callback
        };
      }

      callback = Object.assign({}, {
        success: () => {},
        error: () => {}
      }, callback);
    }

    let st = Math.random().toString();
    st = st.substr(2, st.length);

    const funcName = `${actionName}${st}`;

    this.callbackFuncs[funcName] = callback;

    return funcName;
  }

  /**
   * 暴露给app的js方法
   * @memberof Proxy
   */
  exposeToApp() {
    window.setCallBackContent = (func, index, partten) => {
      if (!this.callbackContent[func]) {
        this.callbackContent[func] = {
          count: 0,
          data: {}
        };
      }
      this.callbackContent[func].count++;
      this.callbackContent[func].data[parseInt(index, 10)] = partten;
    };

    window.callback = (func, data, codec) => {
      function decode(text) {
        text = Base64.decode(text);
        text = decodeURIComponent(text);

        return text.replace(/\[:space\]/g, ' ');
      }

      if (!data && this.callbackContent[func]) {
        // 通过分片调用
        const arr = [];
        for (let i = 0; i < this.callbackContent[func].count; i++) {
          arr.push(this.callbackContent[func].data[i]);
        }
        data = arr.join('');
      }

      if (codec === 'base64') {
        /**
         * Encoder/decoder flag bit to indicate using the "URL and
         * filename safe" variant of Base64 (see RFC 3548 section 4) where
         * {@code -} and {@code _} are used in place of {@code +} and
         * {@code /}.
         */
        const text = data.replace(/-/g, '+').replace(/_/g, '/').replace(/\$/g, '=');
        try {
          data = decode(text);
        } catch (error) {
          data = {
            status: '0',
            error: '-1',
            message: error.message,
            data: {}
          };
        }
      }

      this.callback(func, data);
    };
  }

  /**
   * 函数回调
   *
   * @param {any} func
   * @param {any} data
   *
   * @memberof Proxy
   */
  callback(func, data) {
    if (typeof data !== 'object' && data) {
      try {
        data = JSON.parse(data);
      } catch (e) {
        // Todo
      }
    }

    try {
      if (!this.callbackFuncs[func]) {

      } else if (data.status === '1' || data.status === 1) {
        this.callbackFuncs[func].success(data);
      } else {
        this.callbackFuncs[func].error(data);
      }
    } catch (e) {
      // Todo
    }
  }
}


export default Proxy;
