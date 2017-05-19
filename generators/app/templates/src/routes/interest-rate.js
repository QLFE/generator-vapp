/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */
export default [{
  path: '/interest-rate',
  name: 'interest-rate',
  component: resolve => require(['../views/interest-rate'], resolve),
  meta: {
    title: '利率查询'
  }
}];
