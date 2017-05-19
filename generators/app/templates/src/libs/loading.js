import {
  Indicator
} from 'mint-ui';

let loadingCount = 0;
let timeoutId = null;

export default {
  show() {
    loadingCount++;
    if (loadingCount === 1) {

      timeoutId = setTimeout(() => {
        Indicator.open({
          spinnerType: 'fading-circle'
        });
      }, 300); // 300毫秒数据未返回显示loading
    }
  },

  close() {
    clearTimeout(timeoutId);
    if (loadingCount >= 1) {
      loadingCount--;
    }

    if (loadingCount === 0) {
      // 异步处理，防止同步调用 show 和 close 问题
      setTimeout(() => {
        Indicator.close();
      }, 0);
    }
  }
}