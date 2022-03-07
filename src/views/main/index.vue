<template>
  <div class="homePage">
    <el-row type="flex" class="nav-bar">
      <el-col :span="24"><navigation-bar></navigation-bar></el-col>
    </el-row>
    <el-row type="flex" class="main" style="width: 100%;height: 100%">
      <el-col :span="24" style="width: 100%;height: 100%"><router-view></router-view></el-col>
    </el-row>
  </div>
</template>

<script>
import navigationBar from '../../components/navigation-bar/index.vue';

export default {
  name: 'index',
  components: {
    navigationBar
  },
  methods: {},
  created() {}
};
</script>

<style scoped lang="scss">
@import "index";
</style>
