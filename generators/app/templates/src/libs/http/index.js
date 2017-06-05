import axios from 'axios';
import config from '@/config';
import showLoading from './interceptors/show-loading';
import errorHandler from './interceptors/error-handler';<% if (encrypt) { %>
import encrypt from './interceptors/encrypt';<% } %>

const instance = axios.create({
  timeout: config.api.timeout
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

export default instance;
