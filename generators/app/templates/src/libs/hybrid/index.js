/*
 * @Author: Wang Xiao
 * @Date: 2017-05-09 21:18:48
 * @Last Modified by: Wang Xiao
 * @Last Modified time: 2017-05-11 18:40:25
 */
import Proxy from './proxy';

function getQueryString(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const queryStr = window.location.search.substr(1).match(reg);

  if (queryStr && queryStr[2]) {
    return decodeURIComponent(queryStr[2]);
  }
  return '';
}

function getApp() {
  let app = getQueryString('op');
  if (!app) {
    if (navigator.userAgent.toUpperCase().indexOf('X-CROSS-AGENT-IOS') >= 0) {
      app = 'IOS';
    } else if (navigator.userAgent.toUpperCase().indexOf('X-CROSS-AGENT-ANDROID') >= 0) {
      app = 'ANDROID';
    }
  }

  app = app.toUpperCase();

  return app || 'WEB';
}

export default new Proxy('IOS');
