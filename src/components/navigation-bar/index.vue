<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="black"
      text-color="#fff"
      active-text-color="red"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">处理中心</el-menu-item>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-popover
        placement="top-start"
        :title="welcome"
        width="200"
        trigger="hover">
        <div type="primary" class="head-image" @click="showBox" slot="reference">
          <img class="image" :src="headImage" alt="头像">
        </div>
      </el-popover>
    </el-menu>
  </div>
</template>

<script>
import headImage from '../../assets/images/默认头像.jpeg'

export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      headImage: headImage,
      welcome: ''
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    exit () {
      this.$router.replace('/')
      localStorage.removeItem('token')
    },
    setWelcomeWorld () {
      const nowTime = new Date();
      const nowHour = nowTime.getHours;
      if(0 <= nowHour <= 6){
        this.welcome
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import 'index';
</style>
