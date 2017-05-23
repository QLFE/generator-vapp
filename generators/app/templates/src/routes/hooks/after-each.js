import detect from '@/libs/detect';
import loading from '@/libs/loading';

export default {
  /**
   * 改变title标题
   * @param  {[type]} route [description]
   * @return {[type]}       [description]
   */
  replaceDocTitle(route) {
    const {
      title
    } = route.meta;

    if (title) {
      document.title = title;
    }

    // Magic iPhone 微信需要通过加载 iframe 来刷新 title
    if (detect.os.ios && detect.browser.weixin && title) {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', 'static/favicon.ico');
      iframe.style.display = 'none';
      iframe.addEventListener('load', () => {
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 0);
      });
      document.body.appendChild(iframe);
    }
  },

  /**
   * HTML上添加当前页的属性标记，便于某些css切换
   * @param {[type]} route [description]
   */
  addPageTag(route) {
    const docEl = document.documentElement;
    const {
      name = ''
    } = route;

    docEl.setAttribute('data-page', name);
  },

  closeLoading(route) {
    loading.close();
  }
};
