<template>
  <div class="container">
    <el-row type="flex">
      <el-col :span="24" class="teacher-info-box">

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
    };
  },
  methods: {
  },
  created () {
    console.log(new Date());
  }
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
