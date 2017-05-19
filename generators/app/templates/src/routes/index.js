import Vue from 'vue';
import Router from 'vue-router';
import hooks from './hooks';
import homeRouter from './home';
import interestRateRouter from './interest-rate';
import iframeRouter from './iframe';

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
    ...interestRateRouter,
    ...iframeRouter
  ]
});

// 添加导航钩子
hooks(router);

export default router;
