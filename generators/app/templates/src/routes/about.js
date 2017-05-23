export default [{
  path: '/about',
  name: 'about',
  component: resolve => require(['../views/about'], resolve),
  meta: {
    title: '关于' // 网页标题
  }
}];