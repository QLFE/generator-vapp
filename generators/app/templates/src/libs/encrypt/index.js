import md5 from 'blueimp-md5';
import { JSEncrypt } from './jsencrypt';

/**
 * 加密类
 *
 * @class Encrypt
 */
class Encrypt {
  constructor(config) {
    this.securityMerchantsCode = config.securityMerchantsCode;
    this.securityMerchantsNo = config.securityMerchantsNo;
    this.securityPriKey = config.securityPriKey;
    this.securityRsaKey = config.securityRsaKey;
    this.securitySign = config.securitySign;
  }

  wrapWithRSA(data) {
    const {
      securitySign,
      securityMerchantsCode,
      securityMerchantsNo,
      securityRsaKey
    } = this;
    const dataStr = JSON.stringify(data);
    const sign = md5(dataStr + securitySign);

    const encrypt = () => {
      const jsEncrypt = new JSEncrypt();
      jsEncrypt.setPublicKey(securityRsaKey);
      const key = jsEncrypt.getKey();
      const frameSz = parseInt(((key.n.bitLength() / 8) - 11) / 2, 10);
      const frames = parseInt((dataStr.length + frameSz - 1) / frameSz, 10);
      const array = [];
      for (let i = 0; i < frames; i++) {
        const bytes = dataStr.substring(i * frameSz,
          i + 1 === frames ? dataStr.length : (i + 1) * frameSz);
        array.push(key.encrypt(bytes));
      }
      const c = jsEncrypt.hex2b64(array.join(''));
      return c;
    };

    return {
      merchantsNo: securityMerchantsNo,
      merchantsCode: securityMerchantsCode,
      sign,
      data: encrypt(),
      timestamp: Date.parse(new Date())
    };
  }

  unWrapWithRSA(data) {
    const {
      securityPriKey
    } = this;
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPrivateKey(securityPriKey);
    const key = jsEncrypt.getKey();

    const decrypt = (ctext) => {
      const c = jsEncrypt.parseBigInt(ctext, 16);
      const m = key.doPrivate(c);
      return m;
    };

    const pkcs1unpad2 = (d, n) => {
      const b = d.toByteArray();
      let i = 0;
      while (i < b.length && b[i] === 0)++i;
      if (b.length - i !== n - 1 || b[i] !== 2) {
        return null;
      }
      ++i;
      while (b[i] !== 0) {
        if (++i >= b.length) return null;
      }
      return b.slice(i + 1);
    };

    const encode = (b, i) => {
      let ret = '';
      for (let i = 0; i < b.length; i++) {
        const c = b[i] & 255;
        if (c < 128) { // utf-8 decode
          ret += String.fromCharCode(c);
        } else if ((c > 191) && (c < 224)) {
          ret += String.fromCharCode(((c & 31) << 6) | (b[i + 1] & 63));
          ++i;
        } else {
          ret += String.fromCharCode(((c & 15) << 12) | ((b[i + 1] & 63) << 6) | (b[i + 2] & 63));
          i += 2;
        }
      }
      return ret;
    };

    data = jsEncrypt.b64tohex(data);
    const frameSz = key.n.bitLength() / 4;
    const frames = data.length / frameSz;
    let buff = null;
    for (let i = 0; i < frames; i++) {
      const bytes = data.substring(i * frameSz, i + 1 === frames ? data.length : (i + 1) * frameSz);
      const d = decrypt(bytes);
      const b = pkcs1unpad2(d, key.n.bitLength() / 8);
      buff = buff === null ? b : buff.concat(b);
    }
    data = encode(buff, buff && buff.length);
    return data;
  }
}

export default Encrypt;
