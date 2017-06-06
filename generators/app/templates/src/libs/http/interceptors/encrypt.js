import Encrypt from 'uzone-encrypt';
import conf from '@/config';

const encryptConf = conf.encrypt;
const encrypt = new Encrypt(encryptConf);

export default (instance) => {
  // Add a request interceptor
  instance.interceptors.request.use((config) => {
    if (encryptConf.supportSecurity) {
      config.data = encrypt.wrapWithRSA(config.data);
    }

    return config;
  }, (error) => {

  });

  // Add a response interceptor
  instance.interceptors.response.use((response) => {
    let data = response.data;
    if (encryptConf.supportSecurity && data.data) {
      data = encrypt.unWrapWithRSA(data.data);
      data = data ? JSON.parse(data) : null;
    }

    response.data = data;
    return response;
  }, (error) => {
    // Do something with response error
    if (error && error.config && error.config.showLoading !== false) {

    }

    return Promise.reject(error);
  });
};