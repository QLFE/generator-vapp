<template>
  <div id="app">
    <NavBar :isShowBack="isShowBack" :title="title"></NavBar>
    <div class="app-page">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/nav-bar';

export default {
  name: 'app',
  data() {
    return {

    };
  },

  computed: {
    isShowBack() {
      const {
        name
      } = this.$route;
      return name !== 'home';
    },

    title(){
      const route = this.$route;

      return (route.meta && route.meta.title) || ''
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
#app {
  font-size: 24px;
}

.app-page{
  padding-top: 100px;
}

</style>
