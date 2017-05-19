import {
  Toast
} from 'mint-ui';

export default (instance) => {
  // Add a response interceptor
  instance.interceptors.response.use(response => response, (error) => {
    // Do something with response error
    let message = '';
    if (error.response) {
      message = error.response.data && error.response.data.msg;
    } else {
      message = error.message;
    }

    message = message || '请求出错, 请稍后重试';

    Toast({
      message,
      duration: 2000
    });

    return Promise.reject(error);
  });
};
