<template>
  <div class="home">
    <div class="top-banner">
      <Banner :bannerList="topBannerList" className="top-banner-height" position="top"></Banner>
    </div>
    <div class="action-wrapper">
      <div class="action">
        <div class="action-item-wrapper" v-for="item in actions" @click="goto(item)">
          <div class="action-item">
            <Icon :iconName="item.icon"></Icon>
            <p class="action-item-label">{{item.label}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-banner">
      <Banner :bannerList="bottomBannerList" className="bottom-banner-height" position="bottom"></Banner>
    </div>
  </div>
</template>
<script>
import Banner from '@/components/banner';
import Icon from '@/components/icon';
import hybrid from '@/libs/hybrid';
import conf from '@/config';

export default {
  name: 'home',
  data() {
    return {
      topBannerList: [],
      bottomBannerList: [],
      actions: [{
        label: '利率查询',
        url: 'interest-rate',
        icon: 'icon-interest-rate',
        event: 'HomePage.Action.Rate'
      }, {
        label: '个税查询',
        url: 'http://m.shuilvjisuan.com/',
        icon: 'icon-tax',
        event: 'HomePage.Action.Tax'
      }, {
        label: '贷款计算器',
        url: 'https://jin.baidu.com/tool/calculator/house.html',
        icon: 'icon-loan',
        event: 'HomePage.Action.Calculator'
      }, {
        label: '汇率换算',
        url: 'http://m.cngold.org/home/dy157.html',
        icon: 'icon-exchange-rate',
        event: 'HomePage.Action.Exchange'
      }]
    };
  },

  computed: {
  },

  methods: {
    goto({ url, label, event }) {
      hybrid.action('eeLogUBT', {
        action: 'CLICK',
        event,
        properties: {}
      });

      if (url.indexOf('//') === -1) {
        this.$router.push(url);
      } else {
        hybrid.action('openOtherWebView', {
          title: label,
          otherUrl: url
        });
      }
    },

    getBanners() {
      let bannerList = sessionStorage.getItem('bannerList');

      if (bannerList) {
        try {
          bannerList = JSON.parse(bannerList);

          this.topBannerList = bannerList.topBanner;
          this.bottomBannerList = [bannerList.bottomBanner];
          return;
        } catch (error) {
          console.log('e', error);
        }
      }

      hybrid.action('doPost', {
        api: `${conf.baseUrl}/banner/getBanner`,
        param: {},
        callback: (data) => {
          const bannerList = data && data.data;
          const { topBanner, bottomBanner } = bannerList;
          sessionStorage.setItem('bannerList', JSON.stringify(bannerList));
          this.topBannerList = topBanner;
          this.bottomBannerList = [bottomBanner];
        }
      });
    }
  },

  created() {
    this.getBanners();

    hybrid.action('eeLogUBT', {
      action: 'GOIN',
      event: 'HomePage.Action.Load',
      properties: {}
    });
  },

  components: {
    Banner,
    Icon
  }

};
</script>

<style>
.top-banner-height {
  height: 320px;
}

.bottom-banner-height {
  height: 170px;
}
</style>

<style lang="scss" scoped>
.action-wrapper {
  background-color: #f0f0f0;
  padding: 30px 16px;

  font-size: 0;
}

.action {
  position: relative;
  background-color: #fff;
  border-radius: 18px;
  padding: 36px 44px;
}

.action-item-wrapper {
  display: inline-block;
  width: 50%;
  font-size: 0;
  height: 182px;
}

.action-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 182px;
  font-size: 24px;
  color: #44444e;
}

.action-item:active {
  background-color: #f0f0f0;
}

.action::before {
  position: absolute;
  content: '';
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 524px;
  height: 1px;
  background-color: #dedfe0;
}

.action::after {
  position: absolute;
  content: '';
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1px;
  height: 364px;
  background-color: #dedfe0;
}

.action-item-label {
  margin-top: 15px;
}

.bottom-banner {
  height: 170px;
}
</style>
