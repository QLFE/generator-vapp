import axios from 'axios';
import { apiConf } from '@/config';<% if (hybrid) { %>
import hybrid from '@/libs/hybrid';<% } %>
import showLoading from './interceptors/show-loading';
import errorHandler from './interceptors/error-handler';<% if (encrypt) { %>
import encrypt from './interceptors/encrypt';<% } %>

const instance = axios.create({
  timeout: apiConf.timeout
});

// 添加 showLoading 配置项
// 是否显示请求 loading
showLoading(instance);

// 添加 showDefaultError 配置项
// 是否默认错误处理
errorHandler(instance);
<% if (encrypt) { %>
// 添加加密处理
encrypt(instance);
<% } %>
<% if (hybrid) { %>
/**
 * Hybrid http
 */
const doHybridPost = (config) => {
  return new Promise((resolve, reject) => {
    hybrid.action('doPost', {
      api: config.url,
      param: config.data || {},
      callback: {
        success: (data) => {
          resolve(data);
        },
        error: (data) => {
          reject(data);
        }
      }
    });
  });
};<% } %>
<% if (hybrid) { %>
export default (config) => {
  if (hybrid.app !== 'web') {
    return doHybridPost(config);
  }

  return instance(config);
};
<% } else { %>
export default instance;
<% } %>