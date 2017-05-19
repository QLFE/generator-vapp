<template>
  <div class="">
    <div class="tab-menu-wrapper">
      <div class="tab-menu">
        <div class="tab-menu-item" v-for="(item, key) in typeInfo" :class="{'is-active': item.isActive}" @click="toggle(key)">{{item.label}}</div>
      </div>
    </div>
    <div class="tab-container-wrapper">
      <div class="tab-container">
        <div class="tab-container-item" v-for="(item, key) in typeInfo" v-show="item.isActive">
          <div class="flex-row" v-for="row in item.table">
            <div class="flex-col" :class="`flex-col-${row.length}`" v-for="col in row">{{col}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="addon">
      <p><span class="addon-circle"></span>最新利率更新时间为{{updateTime}}。</p>
      <p><span class="addon-circle"></span>以上为央行公布的贷款基准利率，公积金贷款只能用于房贷，各地会根据当地政策对利率进行上浮和下调。</p>
    </div>
  </div>
</template>

<script>
import hybrid from '@/libs/hybrid';

export default {

  name: 'interest-rate',

  data() {
    return {
      updateTime: '2017年04月18日',
      tableDiscount: ['8.5', '9.0', '9.5', '1.1', '1.2'],
      typeKeys: ['fundLoan', 'commercialLoan'],
      typeInfo: {
        fundLoan: {
          label: '公积金贷款利率',
          isActive: true,
          table: [
            ['', '≤ 5年', '> 5年'],
            ['基准年利率', '2.75%', '3.25%'],
            ['8.5折', '2.34%', '2.76%'],
            ['9.0折', '2.48%', '2.93%'],
            ['9.5折', '2.61%', '3.09%'],
            ['1.1折', '3.03%', '3.58%'],
            ['1.2折', '3.30%', '3.90%']
          ]
        },
        commercialLoan: {
          label: '商业贷款利率',
          isActive: false,
          table: [
            ['', '≤ 1年', '≤ 1-5年', '> 5年'],
            ['基准年利率', '4.35%', '4.75%', '4.90%'],
            ['8.5折', '3.70%', '4.04%', '4.17%'],
            ['9.0折', '3.92%', '4.28%', '4.41%'],
            ['9.5折', '4.13%', '4.51%', '4.66%'],
            ['1.1折', '4.79%', '5.23%', '5.39%'],
            ['1.2折', '5.22%', '5.70%', '5.88%']
          ]
        }
      }
    };
  },

  computed: {

  },

  methods: {
    toggle(curKey) {
      hybrid.action('eeLogUBT', {
        action: 'CLICK',
        event: curKey === 'fundLoan' ? 'RatePage.Action.PublicFunds' : 'RatePage.Action.Commerce',
        properties: {}
      });

      const { typeKeys, typeInfo } = this;
      typeKeys.forEach((key) => {
        if (key === curKey) {
          typeInfo[key].isActive = true;
        } else {
          typeInfo[key].isActive = false;
        }
      });
    }
  },

  created() {

  }
};
</script>

<style lang="css" scoped>
.tab-menu-wrapper {
  padding: 32px 60px 50px;
  display: flex;
  justify-content: center;
}

.tab-menu {
  display: flex;
}

.tab-menu-item {
  padding: 15px 0;
  width: 261px;
  border: 1px solid #0092ff;
  font-size: 24px;
  text-align: center;
}

[data-dpr="2"] .tab-menu-item{
  border-width: 0.5px;
}

.tab-menu-item:first-child {
  border-top-left-radius: 35px;
  border-bottom-left-radius: 35px;
}

.tab-menu-item:last-child {
  border-top-right-radius: 35px;
  border-bottom-right-radius: 35px;
}

.tab-menu-item.is-active {
  background-color: #0092ff;
  color: #fff;
}

.tab-container-wrapper {
  background-color: #fff;
}

.addon {
  padding: 0 30px;
  margin: 50px 0;
  color: #66666e;
  line-height: 1.8;
}

.addon p {
  padding-left: 1.5em;
  text-indent: -1.5em;
}

.addon-circle {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #ffa400;
  position: relative;
  margin-right: 20px;
}

.addon-circle::after {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background-color: #ffa400;
  border-radius: 50%;
}

.flex-row:first-child {
  padding: 30px 0;
  border-top: 1px solid #0092ff;
  border-bottom: 1px solid #0092ff;
  font-size: 26px;
  font-weight: 700;
}

[data-dpr="2"] .flex-row:first-child{
  border-width: 0.5px;
}

.flex-row:first-child .flex-col {
  color: #44444e !important;
}

.flex-row {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}

.flex-col:first-child{
  font-weight: 700;
}

.flex-col:not(:first-child) {
  color: #66666e;
}

.flex-col {
  text-align: center;
}

.flex-col-3 {
  width: 33.33%;
}

.flex-col-4 {
  width: 25%;
}
</style>
