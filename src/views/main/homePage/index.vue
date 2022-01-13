<template>
    <div>
      <el-row type="flex">
        <el-col :span="24"><carousel></carousel></el-col>
      </el-row>
      <el-row type="flex" class="main-body" justify="center">
        <el-col :span="22">
          <div class="extension"><img :src="extensionImage" alt="" class="extension-logo">&nbsp;推广</div>
          <el-row>
            <el-col :span="16">
              <el-row class="left-box">
                <el-col :span="4" v-for="(item, index) in extensionList" :key="item.id" :offset="index % 4 == 0 ? 0 : 2">
                  <el-card :body-style="{ padding: '0px' }" shadow="hover">
                    <img :src="item.imageUrl" class="image-card">
                    <div class="title-author">
                      <span class="title">{{ item.name }}</span><br>
                      <span class="author">{{ item.belongTeacherName }}</span>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <div class="video-play">
                <video-player :videoUrl="extensionList[0].videoUrl" :imageUrl="extensionList[0].imageUrl"></video-player>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" class="main-body" justify="center">
        <el-col :span="22">
          <div class="extension"><img :src="hotImage" alt="" class="extension-logo">&nbsp;专业热门</div>
            <el-row class="left-box">
              <el-col :span="4" v-for="o in 6" :key="o">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <img src="" class="image-card">
                  <div class="title-author">
                    <span class="title">C语言程序设计</span><br>
                    <span class="author">xx老师</span>
                  </div>
                </el-card>
              </el-col>
            </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" class="main-body" justify="center">
        <el-col :span="22">
          <div class="extension"><img :src="recommend" alt="" class="extension-logo">&nbsp;名师推荐</div>
            <el-row class="left-box">
              <el-col :span="4" v-for="o in 6" :key="o">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <img src="" class="image-card">
                  <div class="title-author">
                    <span class="title">C语言程序设计</span><br>
                    <span class="author">xx老师</span>
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
import videoPlayer from '../../../components/video-player/index.vue';
import hotImage from '../../../assets/icon/热门.png';
import recommend from '../../../assets/icon/推荐.png';
import api from '../../../service/mainPage';

export default {
  name: 'index',
  components: {
    carousel,
    videoPlayer
  },
  data () {
    return {
      extensionImage: extension,
      hotImage: hotImage,
      recommend: recommend,
      extensionList: []
    };
  },
  methods: {
    getExtension() {
      api.getExtensionList().then(res => {
        this.extensionList = res.result;
      });
    },
    getRecommendTeacher(){
      
    }
  },
  created () {
    this.getExtension();
  }
};
</script>

<style lang="scss" scoped>
@import "index";
</style>