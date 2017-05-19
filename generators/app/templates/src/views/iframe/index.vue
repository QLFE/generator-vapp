<template>
  <div class="page-iframe">
    <iframe :src="url" frameborder="0" class="iframe"></iframe>
  </div>
</template>

<script>
import hybrid from '@/libs/hybrid';

export default {

  name: 'iframe-ele',

  data() {
    return {
      url: this.$route.query.url
    };
  },

  computed: {

  },

  methods: {

  },

  created() {
    document.title = this.$route.query.title;
  }
};
</script>

<style>

</style>

<style lang="css" scoped>
.page-iframe{
  flex: 1;
  display: flex;
}
.iframe{
  width: 100%;
}
</style>
