<template>
  <el-carousel :interval="4000" type="card" :height="bannerHeight + 'px'">
    <el-carousel-item v-for="item in carouselImage" :key="item.id">
      <a href=""><img :src="item.imageUrl" alt="item.name" class="carousel"></a>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import api from '../../service/mainPage';

export default {
  name: 'index',
  data () {
    return {
      bannerHeight: 0,
      screenWidth: 0,
      carouselImage: []
    };
  },
  methods: {
    getCarousel(){
      api.getCarousel().then(res => {
        this.carouselImage = res.result;
      });
    }
  },
  created() {
    this.getCarousel();
  },
  mounted() {
    this.screenWidth = window.innerWidth;
    this.bannerHeight = 540 * this.screenWidth / 1920;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
      this.bannerHeight = 540 * this.screenWidth / 1920;
    };
  }
};
</script>

<style lang="scss" scoped>
@import "index";
</style>