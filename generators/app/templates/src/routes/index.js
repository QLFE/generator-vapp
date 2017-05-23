import Vue from 'vue';
import Router from 'vue-router';
import hooks from './hooks';
import homeRouter from './home';
import aboutRouter from './about';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return {
      x: 0,
      y: 0
    };
  },
  routes: [
    ...homeRouter,
    ...aboutRouter
  ]
});

// 添加导航钩子
hooks(router);

export default router;
