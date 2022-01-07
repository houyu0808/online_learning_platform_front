<template>
  <div class="back-stage-page">
    <el-container class="back-stage-container">
      <el-aside class="aside-menu" style="width: auto">
        <el-menu
          ref="menu"
          :default-active="$route.path"
          :collapse="isCollapse"
          class="el-menu-vertical"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <img class="menu-title" :src="menuImg" v-if="!isCollapse" alt="" />
          <div v-for="item in menuList" :key="item.id">
            <el-menu-item :index="item.path">
              <i class="el-icon-menu"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="main-header" style="height: auto">
          <div class="collapse-box">
            <i
              class="el-icon-s-fold menu-button"
              v-if="!isCollapse"
              @click="changCollapse"
            ></i>
            <i
              class="el-icon-s-unfold menu-button"
              v-if="isCollapse"
              @click="changCollapse"
            ></i>
          </div>
          <breadcrumb></breadcrumb>
        </el-header>
        <router-view />
      </el-container>
    </el-container>
  </div>
</template>
<script>
import breadcrumb from "../../../components/breadcrumb/index";
import menuImg from "../../../assets/images/后台LOGO.png";
import global from "../../../utils/global";

export default {
  name: "index",
  components: {
    breadcrumb,
  },
  data() {
    return {
      isCollapse: false,
      menuImg: menuImg,
      menuList: global.MENU,
    };
  },
  methods: {
    changCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>
<style scoped lang="scss">
@import "index";
</style>
