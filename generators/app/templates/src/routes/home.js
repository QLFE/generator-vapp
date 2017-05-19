/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */
export default [{
  path: '/home',
  name: 'home',
  alias: '/',
  component: resolve => require(['../views/home'], resolve),
  meta: {
    title: '金融优助手'
  }
}];
