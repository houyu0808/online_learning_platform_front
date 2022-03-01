<template>
  <div class="navbar clearfix">
    <el-breadcrumb class="breadcrumb-container" separator="/">
      <el-breadcrumb-item
        v-for="(item,index) in levelList"
        :key="index"
        :to="{ path: item.path }"
      >
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
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
  </div>
</template>

<script>
import headImage from "../../assets/images/默认头像.jpeg";
import exitImage from "../../assets/icon/退出.png";
import exitHoverImage from "../../assets/icon/退出hover.png";

export default {
  name: "index",
  data() {
    return {
      levelList: [],
      headImage: headImage,
      exitImage: exitImage,
      exitHoverImage: exitHoverImage,
      isCollapse: false,
      username: ''
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb(); // 监听路由变化
    },
  },
  created() {
    this.getBreadcrumb();
    this.setWelcomeWorld();
    this.username = localStorage.getItem('username');
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.name); // 获取路由信息，并过滤保留路由名称信息存入数组
      this.levelList = matched;
      this.levelList[0].path = this.levelList[1].path;
    },
    exit() {
      this.$router.replace("/admin");
      localStorage.removeItem("token");
      localStorage.removeItem('username');
      localStorage.removeItem('userIdentify');
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
};
</script>

<style scoped lang="scss">
@import "index.scss";
</style>
