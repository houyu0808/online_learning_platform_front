<template>
    <div>
      <el-row type="flex">
        <el-col :span="24"><carousel></carousel></el-col>
      </el-row>
      <el-row type="flex" class="main-body" justify="center">
        <el-col :span="22">
          <div class="extension"><img :src="extensionImage" alt="" class="extension-logo">推广</div>
          <el-row>
            <el-col :span="4" v-for="(o, index) in 8" :key="o" :offset="index > 0 ? 2 : 0">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image-card">
                <div style="padding: 14px;">
                  <span>好吃的汉堡</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import carousel from '../../../components/carousel/index.vue';
import extension from '../../../assets/icon/推广.png';

export default {
  name: 'index',
  components: {
    carousel
  },
  data () {
    return {
      extensionImage: extension
    };
  }
};
</script>

<style lang="scss" scoped>
@import "index";
</style>