import afterEach from './after-each';
import beforeEach from './before-each';

export default (router) => {
  Object.keys(beforeEach).forEach((key) => {
    router.beforeEach(beforeEach[key]);
  });

  Object.keys(afterEach).forEach((key) => {
    router.afterEach(afterEach[key]);
  });
};
