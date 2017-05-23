<template>
  <div class="nav-bar-wrapper">
    <div class="nav-bar">
      <div class="nav-back" @click="goBack" v-show="isShowBack"><span class="nav-arrow"></span></div>
      <div class="nav-title">{{title}}</div>
    </div>
  </div>
</template>
<script>
export default {

  name: 'nav-bar',

  props: {
    title: {
      type: String,
      default: ''
    },

    isShowBack: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {};
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
  background-color: #00de9e;
  color: #fff;
  font-size: 36px;
  z-index: 9999;
  overflow: hidden;
}

.nav-bar {
  height: 100px;
  padding: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-back {
  flex-shrink: 0;
  padding: 10px;
  margin: -10px;
}

.nav-title {
  flex: 1;
  text-align: center;
}


/*左箭头*/

.nav-arrow {
  display: block;
  height: 38px;
  width: 24px;
  font-size: 0;
  line-height: 0;
  position: relative;
  overflow: hidden;
}

.nav-arrow:before,
.nav-arrow:after {
  content: " ";
  display: block;
  border-top: 1px solid #fff;
  position: absolute;
  width: 100px;
  left: 0;
  top: 50%;
}

.nav-arrow:before {
  transform: translate(-50%, -80%) rotate(42deg);
}

.nav-arrow:after {
  transform: translate(-50%, -50%) rotate(-42deg);
}

</style>

