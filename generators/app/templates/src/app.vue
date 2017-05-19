<template>
  <div id="app">
    <NavBar></NavBar>
    <div class="app-page" :class="appClass">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/nav-bar';
import hybrid from '@/libs/hybrid';

export default {
  name: 'app',
  data() {
    return {

    };
  },

  computed: {
    appClass() {
      const { app } = hybrid;
      if (app !== 'WEB') {
        return `app-page-${app.toLowerCase()}`;
      }

      return '';
    }
  },

  components: {
    NavBar
  }
};

</script>
<style lang="scss">
@import './assets/scss/function';
@import './assets/scss/partials/reset';
body {
  background-color: #f3f3f3;
  color: #44444e;
  max-width: 750px;
  margin: 0 auto;
}

#app {
  font-size: 24px;
}

.app-page {
  padding-top: 100px;
}
.app-page.app-page-ios{
  padding-top: 64PX;
}
</style>
