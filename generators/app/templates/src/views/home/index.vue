<template>
<div class="user">
  <div class="head-icon">
    <img :src="profile.headIcon" alt="">
  </div>
  <div class="name">
    <router-link to="about" class="about-link">{{profile.name}}</router-link>
  </div>
</div>
</template>
<script>
import {
  mapState
} from 'vuex';

export default {
  name: 'home',
  data() {
    return {

    };
  },

  computed: {
    ...mapState({
      profile: state => state.user.profile
    })
  },

  created() {
    this.$store.dispatch('getUserProfile');
  }

};
</script>
<style lang="scss" scoped>
.user{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}
.head-icon{
  width: 200px;
  height: 200px;

  img{
    width: 100%;
  }
}

.about-link{
  text-decoration: underline;
}

</style>
