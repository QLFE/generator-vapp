import http from '@/libs/http';
import urls from './url-type';

/**
 * 填充方法
 * @param  {[type]} apiObj [description]
 * @param  {[type]} urls   [description]
 * @return {[type]}        [description]
 */
function fillMethods(apiObj, urls) {
  const urlKeys = Object.keys(urls);

  urlKeys.forEach((urlKey) => {
    const urlVal = urls[urlKey];

    if (typeof urlVal === 'string') {
      apiObj[urlKey] = assembleHttp(urlVal);
    } else {
      apiObj[urlKey] = {};
      fillMethods(apiObj[urlKey], urlVal);
    }
  });
}

/**
 * 组装http请求
 * @param  {[type]} urlVal [description]
 * @return {[type]}        [description]
 */
function assembleHttp(urlVal) {
  const defaultOptions = {
    method: 'post'
  };

  if (typeof urlVal === 'string') {
    urlVal = {
      url: urlVal,
      method: 'post'
    };
  }

  return (params, config) => {
    config = Object.assign({}, defaultOptions, urlVal, config);

    if (['post', 'put', 'patch'].indexOf(config.method) > -1) {
      config.data = params;
    } else {
      config.params = params;
    }

    return http(config).then(response => response.data);
  };
}

/**
 * Api 类
 */
class Api {
  constructor() {
    this.http = http;
  }
  /**
   * 作为Vue插件进行安装，挂载到Vue.prototype
   */
  install(Vue) {
    Vue.prototype.$api = this;
  }
}

fillMethods(Api.prototype, urls);


export default new Api();
