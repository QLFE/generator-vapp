// local
var apiPrefix = ''; // API接口链接
<% if (encrypt) { %>
// 加密相关参数
var encrypt = {
  supportSecurity: true,
  securitySign: 'kuZshtjxUgnHAu0qQX2JwVAOZIITcEyHhv0BrIV7DeI=',
  securityMerchantsNo: '20020000028',
  securityMerchantsCode: 'uzone'
}
<% } %>