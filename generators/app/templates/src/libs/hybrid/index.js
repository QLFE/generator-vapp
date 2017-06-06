import Hybrid from 'uzone-hybrid';

function getApp() {
  // 获取查询参数
  function getQueryString(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    const queryStr = window.location.search.substr(1).match(reg);

    if (queryStr && queryStr[2]) {
      return decodeURIComponent(queryStr[2]);
    }
    return '';
  }

  let app = getQueryString('op');
  if (!app) {
    if (navigator.userAgent.toUpperCase().indexOf('X-CROSS-AGENT-IOS') >= 0) {
      app = 'ios';
    } else if (navigator.userAgent.toUpperCase().indexOf('X-CROSS-AGENT-ANDROID') >= 0) {
      app = 'android';
    }
  }

  app = app.toLowerCase();

  return app || 'web';
}

export default new Hybrid(getApp());