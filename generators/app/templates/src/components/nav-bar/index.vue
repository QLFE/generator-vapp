<template>
  <div class="nav-bar-wrapper" :class="appNavClass">
    <div class="nav-bar-ios" v-if="app === 'IOS'"></div>
    <div class="nav-bar">
      <div class="nav-bar-back" @click="goBack" v-if="isShowBack"><span></span></div>
      <div class="nav-bar-title">{{title}}</div>
    </div>
  </div>
</template>
<script>
import hybrid from '@/libs/hybrid';

export default {

  name: 'nav-bar',

  data() {
    return {
      app: hybrid.app
    };
  },

  computed: {
    title() {
      const $route = this.$route;
      return $route.query.title || $route.meta.title || '金融优助手';
    },
    appNavClass() {
      const {
        app
      } = this;
      const arr = [];
      if (app !== 'WEB') {
        arr.push('nav-bar-app');
      }

      if (app === 'IOS') {
        arr.push('nav-bar-app-ios');
      }

      if (app === 'ANDROID') {
        arr.push('nav-bar-app-android');
      }

      return arr;
    },
    isShowBack() {
      const {
        name
      } = this.$route;

      return (name !== 'home');
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};

</script>
<style lang="scss" scoped>
.nav-bar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #0092ff;
  color: #fff;
  font-size: 36px;
  z-index: 9999;
  overflow: hidden;
}

.nav-bar {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.nav-bar-app-ios .nav-bar{
  height: 44PX;
}

.nav-bar-back{
  padding: 10px 30PX 10px 20PX;
  position: absolute;
  transform: translate(0, -50%);
  top: 50%;
  left: 0;
}

.nav-bar-back span{
  display: block;
  width: 12PX;
  height: 20PX;
  background: url(./img/back.png) no-repeat center center;
  background-size: contain;
}

.nav-bar-title {
  padding: 0 20PX;
  flex: 1;
  text-align: center;
  font-size: 18PX;
  font-weight: bold;
}

.nav-bar-ios {
  background-color: #0092ff;
  height: 20PX;
}

</style>

