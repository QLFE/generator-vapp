export default [{
  path: '/home',
  name: 'home',
  alias: '/',
  component: resolve => require(['../views/home'], resolve),
  meta: {
    title: '首页' // 网页标题
  }
}];
