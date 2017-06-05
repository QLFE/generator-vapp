import api from './api';<% if (encrypt) { %>
import encrypt from './encrypt';<% } %>

export default {
  version: '1.0.0',
  channel: 'u-friend-invitation',
  channelNo: 'u-friend-invitation',
  productNo: 'uzone',

  api, // api 相关配置<% if (encrypt) { %>
  encrypt // 加密相关配置<% } %>
};
