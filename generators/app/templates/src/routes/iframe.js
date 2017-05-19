/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */
export default [{
  path: '/iframe',
  name: 'iframe',
  component: resolve => require(['../views/iframe'], resolve),
  meta: {
    title: '加载中...'
  }
}];
