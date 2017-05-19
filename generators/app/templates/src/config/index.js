export default {
  version: '1.0.0',
  channel: 'u-friend-invitation',
  channelNo: 'u-friend-invitation',
  productNo: 'uzone',

  baseUrl: window.apiPrefix,
  timeout: 1000 * 10,

  // 加密相关配置
  encryption: {
    supportSecurity: window.supportSecurity || false,
    securityRsaKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCk9/oQ45I9VxllEHemwaVZEfCyuAXYlEJQW3K6d+uzM6ahVXKCNx+ug8uneShqNBClOt4D2CdZEhEZ5YngOLWuhzR4ooW4TRcuHoZbdEh5pxHg11ha0jjtML3TGXQ2AWo0CZnwJ56DlEWQJdQNOPFrqilKRj8UKL45wcaxwz1EFQIDAQAB',
    securitySign: 'kuZshtjxUgnHAu0qQX2JwVAOZIITcEyHhv0BrIV7DeI=',
    securityMerchantsNo: '20010000010',
    securityMerchantsCode: 'uzone',
    securityPriKey: 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAJwW2IQXOsEorTDW7eDGVsRL0dnrQ4UbEsHyHgIOONQHaiGXXO5pF61U1OsvqjCZsGXOfuHRhSdSgcvUkJ0nFQnO8DwpuoC1dBx6VqIejshb/oxyKZ/AKNcCiwU66ZpvWjTjIkTPCV3BSJSChyBug97HM1NkaP4w28sJRXM+zTRJAgMBAAECgYA088cmIJ9NEhiXHgL7Iy4iT7p0XEy+pi2Z4CJv/hUnURCfLrNXKg3fPo0w8C2jaTAfiYsf3q12ZpYj6QvaVHzdHEpbIu4oHkmvNzbG7xJ9Mc+p1ye+aGbS12tFi/cJ5mzJ2MXG0oERalKXVbT0tPDeALiJR9rZKOhrtF8HgTj+JQJBAM1TQwFAfXNsrucED5gIArhZvQsSqpHhMQ+epFU0zzde5a0oWQVkiRS0vIbnD7TLJJYXIksOpf69ObsPj01ErOsCQQDCnMi8mDzNRm3aXdfg6OUR9Bo5t1Xmc0YH8ocQmimbx9whGt5S9083sdHUrh6i1fl9x0Xgx/YqM8sKixk3wQabAkEApsPCf0jO26nhYNbGh5eyBeM1DMJLcZKyk1opZN8wkmtsJjjIHP4r7HpjSTpwYkpAW/tMKiQqpH0yX4FixcJKowJBAK6dpJNreWqqHdkHyLJZ5WdVgc51jJKorZZl6wBfgqPvELl3dTI2CpMrbt2ImZ57pU9Q5IcKg/pb3HuKUUcwX68CQF8A44vJKaeDOPrXs+wY8FOAeSF93UJd0Csy7KjjgNQCknmLzGxt7h7R/u02DbXfoSF3w7763cxdTjLdhkhHy94=',
  }
};
