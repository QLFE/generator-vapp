/*
 * @Author: Wang Xiao
 * @Date: 2017-05-10 10:49:17
 * @Last Modified by: Wang Xiao
 * @Last Modified time: 2017-05-11 09:34:18
 */
import Encrypt from '@/libs/encrypt';
import http from '@/libs/http';
import config from '@/config';
import deviceInfo from '@/libs/device-info';

const encryptInstance = new Encrypt(config.encryption);

export default {
  doPost({
    api,
    param,
    callback
  }, ctx) {
    const supportSecurity = config.encryption.supportSecurity;
    const apiConfig = {};

    if (typeof param.showLoading !== 'undefined') {
      apiConfig.showLoading = param.showLoading;
      delete param.showLoading;
    }

    // 加密判断
    if (supportSecurity) {
      param = encryptInstance.wrapWithRSA(param);
    }

    http({
      method: 'post',
      url: api,
      data: param,
      ...apiConfig
    })
      .then((response) => {
        let data = response.data;
        if (supportSecurity && data.data) {
          data = encryptInstance.unWrapWithRSA(data.data);
          data = data ? JSON.parse(data) : null;
        }

        ctx.callback(callback, data);
      })
      .catch((error) => {
        let message = (error && error.message) || '';
        if (supportSecurity) {
          message = encryptInstance.unWrapWithRSA(message);
        }

        ctx.callback(callback, message);
      });
  },
  /**
   * Todo
   *
   * @param {any} { action, event, properties }
   * @param {any} ctx
   */
  eeLogUBT({ action, event, properties }, ctx) {
    const _properties = {
      $manufacturer: deviceInfo.manufacturer,
      $model: deviceInfo.model,
      $os: deviceInfo.os,
      $os_version: deviceInfo.os_version,
      $app_version: config.version,
      $screen_width: window.screen.availWidth,
      $screen_height: window.screen.availHeight,
      $longitude: 0,
      $latitude: 0,
      $province: '',
      $city: '',
      $district: '',
      $ip: '0.0.0.0',
      $market: 'web'
    };

    const data = {
      domain: 'mobanker-uzone-flash',
      distinctId: '',
      timestamp: Date.now(),
      action,
      event,
      properties: _properties,
      loading: false
    };
  },

  openOtherWebView({
    title,
    otherUrl
  }, ctx) {
    location.href = otherUrl;
  }
};
