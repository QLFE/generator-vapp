/*
 * @Author: Wang Xiao
 * @Date: 2017-05-09 18:34:16
 * @Last Modified by: Wang Xiao
 * @Last Modified time: 2017-05-10 16:51:55
 */

const iosCall = (url) => {
  const seed = Math.random();
  const iframe = document.createElement('iframe');
  iframe.src = `${url}&seed=${seed}`;
  iframe.style.display = 'none';
  document.documentElement.appendChild(iframe);
};

/**
 * 协议参数调整，填坑，后续必须保证协议实际传参key和对外key保持一致
 */
const adjustParams = (actionName, params) => {
  // 兼容性处理，pageId -> page
  if (params.pageId) {
    params.page = params.pageId;
  }

  return params;
};

export default {
  /**
   * 通用调用协议
   *
   * @param {any} actionName 协议名字
   * @param {any} params 协议参数
   * @returns
   */
  action(actionName, params) {
    if (actionName === 'doPost') {
      this.doPost(params);
      return;
    }

    params = adjustParams(actionName, params);

    // 正常流程
    params = Object.assign({}, params, {
      seed: Math.random() // seed 随机数
    });
    let url = `plugin://${actionName}`;
    const paramsUrl = [];

    Object.keys(params).forEach((key) => {
      let value = params[key];
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      paramsUrl.push(`${key}=${encodeURIComponent(value)}`);
    });

    url = `${url}?${paramsUrl.join('&')}`;

    iosCall(url);
  },

  /**
   * doPost 请求协议
   *
   * @param {any} {
   *     api,
   *     param,
   *     callback
   *   } 请求参数
   */
  doPost({
    api,
    param,
    callback
  }) {
    param = JSON.stringify(param);
    const url = `CALL://${encodeURIComponent(api)}?param=${encodeURIComponent(param)}&cb=${encodeURIComponent(callback)}`;

    iosCall(url);
  }
};
