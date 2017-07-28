import Encrypt from 'uzone-sign';
import { encryptConf } from '@/config';

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