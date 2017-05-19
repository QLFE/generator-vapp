import loading from '@/libs/loading';

export default {
  showLoading(to, from, next) {
    if (from.matched.length !== 0) {
      loading.show();
    }

    next();
  }
};
