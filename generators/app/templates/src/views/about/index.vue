<template>
  <div class="">
    {{detail}}
  </div>
</template>

<script>
import {
  mapState
} from 'vuex';

export default {

  name: 'about',

  data() {
    return {
    };
  },

  computed: {
    ...mapState({
      detail: state => state.user.detail
    })
  },
  created() {
    this.$store.dispatch('getUserDetail');
  }
};
</script>

<style lang="css" scoped>

</style>
