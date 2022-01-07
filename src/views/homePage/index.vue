<template>
  <div class="homePage">
    <navigation-bar></navigation-bar>
    <el-button
      type="primary"
      class="head-image"
      icon="el-icon-switch-button"
      circle
      @click="exit"
    ></el-button>
  </div>
</template>

<script>
import navigationBar from '../../components/navigation-bar/index.vue';

export default {
  name: 'index',
  components: {
    navigationBar
  },
  methods: {
    exit() {
      this.$router.replace('/');
      localStorage.removeItem('token');
    }
  },
  created() {}
};
</script>

<style scoped>
</style>
