import eventConf from './event';
import apiConf from './api';<% if (encrypt) { %>
import encryptConf from './encrypt';<% } %>

// APP 配置
export const appConf = {
  version: '1.0.0',
  channel: 'u-friend-invitation',
  channelNo: 'u-friend-invitation',
  productNo: 'uzone',
};

// 模块加载
export { apiConf,<% if (encrypt) { %> encryptConf, <% } %>eventConf };
