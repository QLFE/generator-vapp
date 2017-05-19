const _storage = {};

/**
 * 检测storage 是否可用
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
function detect(type) {
  try {
    const storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

export default {
  defaults: {
    prefix: '__qianlong__'
  },

  enabled: detect('localStorage'),

  /**
   * 获取对应 key 的 value 值
   * @param    {string}                key key值
   * @return   {[type]}                返回对应的 value 值
   * @datetime 2016-12-15T11:42:26+080
   * @author wangxiao<i@muyao.me>
   */
  get(key) {
    let obj;

    if (this.enabled) {
      const value = localStorage.getItem(key);
      try {
        obj = JSON.parse(value);
      } catch (e) {
        obj = value;
      }
    } else {
      obj = _storage[key];
    }

    if (obj && obj.data) {
      if (!('expire' in obj) || obj.expire > (new Date()).getTime()) {
        return obj.data;
      }
      this.remove(key);
    }
    return null;
  },

  /**
   * set item
   * @param    {stirng}                key    key值
   * @param    {object}                value  值
   * @param    {number}                expire 过期时间，单位毫秒
   * @datetime 2016-12-15T11:38:50+080
   * @author wangxiao<i@muyao.me>
   */
  set(key, value, expire) {
    const obj = {
      data: value
    };

    if (expire && expire > 0) {
      obj.expire = (new Date()).getTime() + expire;
    }

    if (this.enabled) {
      localStorage.setItem(key, JSON.stringify(obj));
    } else {
      _storage[key] = obj;
    }
    return value;
  },

  /**
   * 删除对应 key 值
   * @param    {string}                key key 值
   * @return   {null}
   * @datetime 2016-12-15T11:44:00+080
   * @author wangxiao<i@muyao.me>
   */
  remove(key) {
    if (this.enabled) {
      localStorage.removeItem(key);
    } else {
      delete _storage[key];
    }
  },

  /**
   * 返回所有的 keys
   * @return   {array}                返回 key 值数组
   * @datetime 2016-12-15T11:45:02+080
   * @author wangxiao<i@muyao.me>
   */
  getKeys() {
    let keys = [];
    if (this.enabled) {
      keys = Object.keys(localStorage);
    } else {
      keys = Object.keys(_storage);
    }

    return keys;
  },

  removeExpired() {
    const keys = this.getKeys();

    keys.forEach((key) => {
      this.get(key);
    });
  }
};
