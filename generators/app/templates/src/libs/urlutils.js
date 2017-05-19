/**
 * 获取query参数
 * @param  {string} name 需要获取的参数key值
 * @return {[type]}      [description]
 */
const getParams = (name, search) => {
  search = (search || window.location.search).match(/\?.*(?=\b|#)/);

  if (!search) {
    return name ? '' : {};
  }

  search = search[0].replace(/^\?/, '');

  const queries = {};
  const params = search.split('&');

  params.forEach((param) => {
    param = param.split('=');
    queries[param[0]] = param[1] ? decodeURIComponent(param[1]) : '';
  });

  return name ? queries[name] : queries;
};

/**
 * 获取hash query参数
 * @param  {string} name 需要获取的参数key值
 * @return {[type]}      [description]
 */
const getHashParams = (name, hash) => {
  hash = (hash || window.location.hash).split('#');

  if (!hash || !hash[1]) {
    return name ? '' : {};
  }

  hash = hash[1].replace(/^.*\?/, '');

  const queries = {};
  const params = hash.split('&');

  params.forEach((param) => {
    param = param.split('=');
    queries[param[0]] = param[1] ? decodeURIComponent(param[1]) : '';
  });

  return name ? queries[name] : queries;
};

/**
 * 给url注入参数，注入的参数会覆盖旧参数
 * @Author   fisher<wangjiang.fly.1989@163.com>
 * @DateTime 2016-06-25T09:37:04+0800
 * @param    {Object}                           params  要注入的参数
 * @param    {String}                           url     要注入参数的url, 为空时取当前页面url
 * @param    {Array}                           withouts url中需要排除的参数key数组
 * 例：
 * fillParams({a: 1, b: 2, c: 3}, 'http://a.b.c.d?aa=1&bb=2&cc=3&b=4#a=0&b=6', ['aa', 'a', 'b', 'c', 'bb', 'cc'])
 *   =》"http://a.b.c.d#a=0&b=6"
 *
 * fillParams({a: 1, b: 2, c: 3}, 'http://a.b.c.d?aa=1&bb=2&cc=3&b=4#a=0&b=6', ['aa', 'a', 'b', 'c', 'bb'])
 *   =》"http://a.b.c.d?cc=3#a=0&b=6"
 *
 *  fillParams({a: 1, b: 2, c: 3}, 'http://a.b.c.d?aa=1&bb=2&cc=3&b=4#a=0&b=6', ['aa'])
 *   =》"http://a.b.c.d?bb=2&cc=3&a=1&b=2&c=3#a=0&b=6"
 *
 *  fillParams({a: 1, b: 2, c: 3}, 'http://a.b.c.d?aa=1&bb=2&cc=3&b=4#a=0&b=6')
 *   =》"http://a.b.c.d?aa=1&bb=2&cc=3&a=1&b=2&c=3#a=0&b=6"
 *
 *  fillParams({a: 1, b: 2, c: 3}, 'http://a.b.c.d')
 *   =》"http://a.b.c.d?a=1&b=2&c=3"
 *
 * @return   {String}                          注入参数后的url
 */
const fillParams = (params, url, withouts) => {
  url = url || window.location.href;

  const urlPairs = url.split('#');
  const fullUrl = urlPairs[0];

  const hashUrl = urlPairs.length > 1 ? `#${urlPairs[1]}` : '';
  const baseUrl = fullUrl.split('?')[0];
  const originParams = getParams(null, fullUrl);

  const paramsList = [];
  let re = '';

  Object.keys(originParams).forEach((key) => {
    if (typeof params[key] === 'undefined' && withouts.indexOf(key) === -1) {
      paramsList.push(`${key}=${originParams[key]}`);
    }
  });

  Object.keys(params).forEach((key) => {
    if (withouts.indexOf(key) === -1 && typeof params[key] !== 'undefined') {
      paramsList.push(`${key}=${params[key]}`);
    }
  });

  re += baseUrl;
  re += paramsList.length > 0 ? `?${paramsList.join('&')}` : '';
  re += hashUrl;

  return re;
};

/**
 * 填充 http/https
 * @param {*} url 填充的url
 * @param {*} protocol 填充的协议名
 */
const fillProtocol = (url, protocol) => {
  if (url.indexOf('//') === 0) {
    url = protocol.indexOf(':') === -1 ? `${protocol}:${url}` : protocol + url;
  }

  return url;
};

/**
 * 替换占位符 支持:id 和 {id} 两种形式
 * @param    {[type]}                url    [description]
 * @param    {[type]}                params [description]
 * @return   {[type]}                [description]
 * @datetime 2017-01-05T11:31:40+080
 * @author wangxiao<i@muyao.me>
 */
const replacePlaceholder = (url, params) => {
  url = url.replace(/:([^/]+)/gi, (match, key) => params[key]);

  url = url.replace(/{([^}]+)}/gi, (match, key) => params[key]);

  return url;
};

export default {
  getParams,
  getHashParams,
  fillParams,
  fillProtocol,
  replacePlaceholder
};
