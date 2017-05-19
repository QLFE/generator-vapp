<template>
  <div class="icon" :class="iconName || iconClass">
  
  </div>
</template>
<script>

export default {

  name: 'icon',

  props: {
    iconName: {
      type: String,
      default: ''
    },
    iconClass: {
      type: String,
      default: ''
    }
  },

  data() {
    return {

    };
  }
};

</script>
<style lang="css">
.icon {
  background: transparent no-repeat center center;
  background-size: contain;
}

.icon-interest-rate {
  background-image: url('~@/assets/img/icon/icon-interest-rate.png');
  width: 54px;
  height: 59px;
}

.icon-tax {
  background-image: url('~@/assets/img/icon/icon-tax.png');
  width: 52px;
  height: 59px;
}

.icon-loan {
  background-image: url('~@/assets/img/icon/icon-loan.png');
  width: 51px;
  height: 51px;
}
.icon-exchange-rate{
  background-image: url('~@/assets/img/icon/icon-exchange-rate.png');
  width: 57px;
  height: 56px;
}
</style>

