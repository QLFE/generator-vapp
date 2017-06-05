import Vue from 'vue';
import FastClick from 'fastclick';
import 'uzone-flexible';
import App from './app';
import router from './routes';
import store from './store';
import Api from './api';
import filters from './libs/filters';

// 全局挂载 filter
Object.keys(filters).forEach((key, index) => {
  Vue.filter(key, filters[key]);
});

// promise polyfill
require('es6-promise').polyfill();

// fix 点击延迟
FastClick.attach(document.body);

// 挂载 Api, 在组件内可直接 this.$api 访问
Vue.use(Api);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
