<template>
  <div>
    <el-row type="flex">
      <el-col :span="24" class="container">
        <div class="left-box">
          <div class="view-report">
            <h1>{{ video.name }}</h1>
            <div class="video-data">
              <span>总播放数:{{ video.clickTimes ? video.clickTimes : 0}} &nbsp;·&nbsp;</span>
              <span>{{ video.createdTime.getFullYear() }}-{{ video.createdTime.getMonth() + 1}}-{{ video.createdTime.getDay() }}&nbsp;&nbsp;
                {{ video.createdTime.getHours() > 9 ? video.createdTime.getHours() : '0'+video.createdTime.getHours()}}:{{ video.createdTime.getMinutes() > 9 ? video.createdTime.getMinutes() : '0'+ video.createdTime.getMinutes() }}:{{video.createdTime.getSeconds() > 9 ? video.createdTime.getSeconds() : '0'+ video.createdTime.getSeconds() }}
              </span>
            </div>
          </div>
          <div class="video-box">
            <video-player :video-url="video.videoUrl" :image-url="video.imageUrl" :autoplay="true"></video-player>
          </div>
          <div class="line"></div>
          <div class="tip-info">
            <img src="../../../assets/icon/禁止.png" alt="禁止">
            <span>未经作者授权，禁止转载</span>
          </div>
          <div class="introduce-box">
            <p class="tip-text">视频简介:</p>
            <p class="video-text">{{video.videoIntroduce}}</p>
          </div>
          <div class="line"></div>
        </div>
        <div class="right-box">
          <div class="author-info">
            <img src="../../../assets/images/teacherImg.png" :alt="video.belongTeacherName">
            <div class="t-info">
              <div class="name">{{ video.belongTeacherName }}</div>
              <div class="autograph">{{ teacher.autograph }}</div>
            </div>
          </div>
          <div class="other-recommend">
            <div>该老师的其它课程:</div>
          </div>
          <div class="other-video">
            <div class="video-page-card" v-for="(item,index) in otherVideo.slice(0,5)" :key="index" @click="toVideoPage(item.id)">
              <div class="pic-box">
                <img :src="item.imageUrl" :alt="item.name">
              </div>
              <div class="info-box">
                <div class="video-name">{{ item.name }}</div>
                <span>{{ item.belongTeacherName }}</span>
                <span>总播放数:{{ video.clickTimes ? video.clickTimes : 0}} &nbsp;·&nbsp;{{ video.createdTime.getFullYear() }}-{{ video.createdTime.getMonth() + 1 }}-{{ video.createdTime.getDay() }}</span>
              </div>
            </div>
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
      video: {},
      otherVideo: [],
      teacher: {}
    };
  },
  components: {
    videoPlayer
  },
  watch: {
    '$route' (to, from) {
      this.$router.go(0);
    }
  },
  methods: {
    addClickTimesAndGetVideo(id){
      let that = this;
      api.addClickTimes({id: id});
      api.getVideoInfo({id: id}).then(res => {
        that.video = res.result;
        that.getTeacherVideoList(that.video.belongTeacherCode);
        that.getTeacherInfo(that.video.belongTeacherCode);
      });
    },
    getTeacherVideoList(teacherCode){
      let that = this;
      api.getVideoList({teacherCode: teacherCode}).then(res => {
        that.otherVideo = res.result;
        let index = that.getIndex();
        this.otherVideo.splice(index, 1);
        this.video.createdTime = new Date(this.video.createdTime);
      });
    },
    getTeacherInfo(teacherCode){
      let that = this;
      api.getTeacher({teacherCode: teacherCode}).then(res => {
        that.teacher = res.result;
      });
    },
    toVideoPage(id){
      this.$router.push({
        path: '/learning-platform/videoPlayPage',
        query: {
          id: id
        }
      });
    },
    getIndex(){
      let index;
      for (let i = 0; i < this.otherVideo.length; i++) {
        if (this.video.id === this.otherVideo[i].id) {
          index = i;
        }
      }
      return index;
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
