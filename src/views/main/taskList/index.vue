<template>
  <div class="container">
    <div class="contain-box">
      <div class="student-info-box">
        <div class="user-info" :style="{backgroundImage: 'url(' + hengFu +')'}">
          <img :src="headImg" alt="">
          <div class="user-item">
            <div>
              <div class="username">{{ userInfo.username }}</div>
              <div class="user-autograph">这个人很懒，什么也没有留下！</div>
            </div>
          </div>
        </div>
      </div>
      <div class="task-list">

      </div>
    </div>
  </div>
</template>

<script>
import headImg from '../../../assets/images/默认头像.jpeg';
import background from '../../../assets/images/hengfu.jpeg';
export default {
  name: 'taskList',
  data(){
    return {
      headImg: headImg,
      hengFu: background,
      userInfo: null
    };
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('information'));
  }
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
