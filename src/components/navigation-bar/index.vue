<template>
  <div>
    <el-menu
      :default-active="this.$route.path"
      :router="true"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="white"
      text-color="#000"
      active-text-color="#409EFF"
    >
      <el-menu-item index="/learning-platform/"><img :src="mainLogo" class="mainLogo" alt=""> 首页</el-menu-item>
      <el-menu-item index="/learning-platform/broadcast-center">直播中心</el-menu-item>
      <el-menu-item index="/learning-platform/task-list" v-if="identify === '学生'">任务列表</el-menu-item>
      <el-menu-item index="/learning-platform/task-center" v-if="identify === '教师'">任务中心</el-menu-item>
      <el-menu-item index="4" disabled>论坛中心</el-menu-item>
      <el-menu-item index="5" disabled>自测评估</el-menu-item>
      <el-popover
        placement="top-start"
        :title="welcome + username"
        width="200"
        trigger="hover"
      >
      <div class="head-hover" style="text-align: center; margin: 0">
        <div class="exit-icon" @click="exit" @mouseover="showHover" @mouseout="hideHover">
          <img :src="exitImage" class="exit-image" id="exit-image" alt="退出" title="退出登录">
        </div>
      </div>
      <div
        type="primary"
        class="head-image"
        slot="reference"
      >
        <img class="image" :src="headImage" alt="头像" />
      </div>
      </el-popover>
    </el-menu>
  </div>
</template>

<script>
import headImage from "../../assets/images/默认头像.jpeg";
import exitImage from "../../assets/icon/退出.png";
import exitHoverImage from "../../assets/icon/退出hover.png";
import mainLogo from "../../assets/images/HY_LOGO.jpg";

export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      headImage: headImage,
      exitImage: exitImage,
      exitHoverImage: exitHoverImage,
      mainLogo: mainLogo,
      welcome: "",
      username: "",
      identify: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    exit() {
      this.$router.replace("/");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
    setWelcomeWorld() {
      const nowTime = new Date();
      const nowHour = nowTime.getHours();
      if (nowHour >= 0 && nowHour <= 6) {
        this.welcome = "早上好:";
      } else if (nowHour > 6 && nowHour <= 12) {
        this.welcome = "上午好:";
      } else if (nowHour > 12 && nowHour < 18) {
        this.welcome = "下午好:";
      } else {
        this.welcome = "晚上好:";
      }
    },
    showHover(){
      document.getElementById('exit-image').src = exitHoverImage;
    },
    hideHover() {
      document.getElementById('exit-image').src = exitImage;
    }
  },
  created() {
    this.setWelcomeWorld();
    this.username = localStorage.getItem('username');
    this.identify = localStorage.getItem('userIdentify');
  },
};
</script>
<style scoped lang="scss">
@import "index";
</style>
