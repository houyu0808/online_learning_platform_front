<template>
  <div>
    <el-row type="flex">
      <el-col :span="24" class="container">
        <div class="left-box">
          <div class="view-report">
            <h1>{{ video.name }}</h1>
            <div class="video-data">
              <span>总播放数：{{ video.clickTimes ? video.clickTimes : 0}} &nbsp;·&nbsp;</span>
              <span>{{ video.createdTime.getFullYear() }}-{{ video.createdTime.getMonth() }}-{{ video.createdTime.getDay() }}&nbsp;&nbsp;
                {{ video.createdTime.getHours() > 9 ? video.createdTime.getHours() : '0'+video.createdTime.getHours()}}:{{ video.createdTime.getMinutes() > 9 ? video.createdTime.getMinutes() : '0'+ video.createdTime.getMinutes() }}:{{video.createdTime.getSeconds() > 9 ? video.createdTime.getSeconds() : '0'+ video.createdTime.getSeconds() }}
              </span>
            </div>
          </div>
          <div class="video-box">
            <video-player :video-url="video.videoUrl" :image-url="video.imageUrl" :autoplay="true"></video-player>
          </div>
        </div>
        <div class="right-box">
          <div class="author-info">
            <img src="../../../assets/images/teacherImg.png" :alt="video.belongTeacherName">
            <span>{{ video.belongTeacherName }}</span>
          </div>
          <div class="other-video">
            <div></div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '../../../service/mainPage';
import videoPlayer from '../../../components/video-player';

export default {
  name: "index",
  data() {
    return {
      id: '',
      video: {}
    };
  },
  components: {
    videoPlayer
  },
  methods: {
    addClickTimesAndGetVideo(id){
      let that = this;
      api.addClickTimes({id: id});
      api.getVideoInfo({id: id}).then(res => {
        that.video = res.result;
        console.log(that.video);
        that.video.createdTime = new Date(that.video.createdTime);
        this.getTeacherVideoList(this.video.belongTeacherCode);
      });
    },
    getTeacherVideoList(teacherCode){
      api.getVideoList({teacherCode: teacherCode}).then(res => {
        console.log(res.result);
      });
    }
  },
  created () {
    this.id = this.$route.query.id;
    this.addClickTimesAndGetVideo(this.id);
  }
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
