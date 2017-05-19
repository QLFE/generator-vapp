/*
 * @Author: Wang Xiao
 * @Date: 2017-05-09 18:34:16
 * @Last Modified by: Wang Xiao
 * @Last Modified time: 2017-05-10 09:28:21
 */

/**
 * 协议参数调整，填坑，后续必须保证协议实际传参key和对外key保持一致
 */
const adjustParams = (actionName, params) => {
  if (actionName === 'dialog') {
    params.class = params.type;
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

    window.android.plugin(actionName, JSON.stringify(params));
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
    window.android.call(api, JSON.stringify(param), callback);
  }
};
