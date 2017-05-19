<template>
  <div class="banner" :class="className">
    <Swipe :auto="5000">
      <SwipeItem v-for="banner in bannerList" :key="banner.bannerUrl" @click.native="goto(banner.redirectUrl)">
        <img :src="banner.bannerUrl" alt="">
      </SwipeItem>
    </Swipe>
  </div>
</template>
<script>
import {
  Swipe,
  SwipeItem
} from 'mint-ui';
import hybrid from '@/libs/hybrid';

export default {

  name: 'banner',

  props: {
    bannerList: {
      type: Array,
      default() {
        return [];
      }
    },

    className: {
      type: String,
      default: ''
    },

    position: {
      type: String,
      default: ''
    }
  },

  data() {
    return {

    };
  },

  computed: {
  },

  methods: {
    goto(url) {
      hybrid.action('eeLogUBT', {
        action: 'CLICK',
        event: this.position === 'top' ? 'HomePage.Action.Banner' : 'HomePage.Action.bottomBanner',
        properties: {}
      });
      hybrid.action('openOtherWebView', {
        title: '',
        otherUrl: url
      });
      // location.href = url;
    }
  },

  components: {
    Swipe,
    SwipeItem
  }
};

</script>
<style lang="css" scoped>
.banner {
  width: 100%;
}

.banner-img {
  width: 100%;
}
</style>

