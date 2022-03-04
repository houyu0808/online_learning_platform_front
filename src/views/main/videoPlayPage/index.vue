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
            <video-player :video-url="video.videoUrl" :image-url="video.imageUrl"></video-player>
          </div>
          <div class="tip-info">
            <img src="../../../assets/icon/禁止.png" alt="禁止">
            <span>未经作者授权，禁止转载</span>
          </div>
          <div class="introduce-box">
            <p class="tip-text">视频简介:</p>
            <p class="video-text">{{video.videoIntroduce}}</p>
          </div>
          <div class="line"></div>
          <div class="comment-box">
            <div class="comment">
              <div class="user-image"><img src="../../../assets/images/默认头像.jpeg" alt=""></div>
              <div class="comment-input-area"><textarea maxlength="100" placeholder="发表一下你对本视频的看法吧!" v-model="commentInfo.commentText"></textarea></div>
              <div class="submit-comment"><button @click="addComments()">发表评论</button></div>
            </div>
            <div class="line"></div>
            <div class="comment-counts">共 {{ commentList.length}} 条评论</div>
            <div class="no-comments" v-if="commentList.length === 0"><span>该视频暂无评论!赶紧来抢一楼吧!</span></div>
            <div class="show-comments" v-else>
              <div class="comments-item" v-for="(item,index) in commentList" :key="index">
                <div class="user-comments">
                  <img src="../../../assets/images/默认头像.jpeg" alt="">
                  <div class="user-right">
                    <div class="comment-username">
                      {{ item.commentUsername }}
                    </div>
                    <div class="comment-text">
                      {{ item.commentText }}
                    </div>
                    <div class="comment-info">
                      {{ item.createdTime.getFullYear() }}-{{ item.createdTime.getMonth() + 1}}-{{ item.createdTime.getDay() }}&nbsp;&nbsp;
                      {{ item.createdTime.getHours() > 9 ? item.createdTime.getHours() : '0'+item.createdTime.getHours()}}:{{ item.createdTime.getMinutes() > 9 ? item.createdTime.getMinutes() : '0'+ item.createdTime.getMinutes() }}:{{item.createdTime.getSeconds() > 9 ? item.createdTime.getSeconds() : '0'+ item.createdTime.getSeconds() }}
<!--                      <div class="fabulous"></div>-->
<!--                      <div class="step"></div>-->
                      <el-popover
                        placement="bottom"
                        width="500"
                        trigger="click"
                        :visible-arrow="false">
                        <div class="comment">
                          <div class="comment-input-area"><textarea maxlength="100" :placeholder="'回复: '+ item.commentUsername" v-model="replyInfo.commentText"></textarea></div>
                          <div class="submit-comment"><button @click="addChildComments(item.id)">发表评论</button></div>
                        </div>
                        <div class="replay" slot="reference">回复</div>
                      </el-popover>
                    </div>
                  </div>
                </div>
                <div class="user-comments-reply" v-for="(data,i) in item.childCommentList" :key="i">
                  <img src="../../../assets/images/默认头像.jpeg" alt="">
                  <div class="reply-right">
                    <div class="reply-right-top">
                      <div class="reply-name">{{ data.commentUsername }}</div>
                      <div class="reply-text">{{ data.commentText }}</div>
                    </div>
                    <div class="reply-info">
                      {{ data.createdTime.getFullYear() }}-{{ data.createdTime.getMonth() + 1}}-{{ data.createdTime.getDay() }}&nbsp;&nbsp;
                      {{ data.createdTime.getHours() > 9 ? data.createdTime.getHours() : '0'+data.createdTime.getHours()}}:{{ data.createdTime.getMinutes() > 9 ? data.createdTime.getMinutes() : '0'+ data.createdTime.getMinutes() }}:{{data.createdTime.getSeconds() > 9 ? data.createdTime.getSeconds() : '0'+ data.createdTime.getSeconds() }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                <span>总播放数:{{ item.clickTimes ? item.clickTimes : 0}} &nbsp;·&nbsp;{{ item.createdTime.getFullYear() }}-{{ item.createdTime.getMonth() + 1 }}-{{ item.createdTime.getDay() }}</span>
              </div>
            </div>
          </div>
          <div class="recommend-today">今日推荐</div>
          <div class="rec-video">
            <div class="video-page-card" v-for="(item,index) in otherVideo.slice(0,5)" :key="index" @click="toVideoPage(item.id)">
              <div class="pic-box">
                <img :src="item.imageUrl" :alt="item.name">
              </div>
              <div class="info-box">
                <div class="video-name">{{ item.name }}</div>
                <span>{{ item.belongTeacherName }}</span>
                <span>总播放数:{{ item.clickTimes ? item.clickTimes : 0}} &nbsp;·&nbsp;{{ item.createdTime.getFullYear() }}-{{ item.createdTime.getMonth() + 1 }}-{{ item.createdTime.getDay() }}</span>
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
import commentApi from '../../../service/comment';
import videoPlayer from '../../../components/video-player';

export default {
  name: "index",
  data() {
    return {
      id: '',
      video: {},
      otherVideo: [],
      teacher: {},
      commentList: [],
      commentInfo: {
        commentText: "",
        belongVideoId: 5,
        fabulous: 0,
        step: 0,
        createdTime: "",
        commentUserCode: "",
        commentUsername: ""
      },
      replyInfo: {
        commentText: "",
        fabulous: 0,
        step: 0,
        createdTime: "",
        belongCommentId: "",
        commentUserCode: "",
        commentUsername: ""
      },
      userInfo: null
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
    // 调用：增加播放量 获取视频信息 获取教师其他课程列表 获取教师信息 获取评论列表
    addClickTimesAndGetVideo(id){
      let that = this;
      api.addClickTimes({id: id});
      api.getVideoInfo({id: id}).then(res => {
        that.video = res.result;
        that.video.createdTime = new Date(that.video.createdTime);
        that.getTeacherVideoList(that.video.belongTeacherCode);
        that.getTeacherInfo(that.video.belongTeacherCode);
        that.getComments(that.video.id);
      });
    },
    // 获取教师其他课程列表
    getTeacherVideoList(teacherCode){
      let that = this;
      api.getVideoList({teacherCode: teacherCode}).then(res => {
        that.otherVideo = res.result;
        let index = that.getIndex();
        that.otherVideo.splice(index, 1);
        for (let i = 0; i < that.otherVideo.length; i++){
          that.otherVideo[i].createdTime = new Date(that.otherVideo[i].createdTime);
        }
      });
    },
    // 获取教师信息
    getTeacherInfo(teacherCode){
      let that = this;
      api.getTeacher({teacherCode: teacherCode}).then(res => {
        that.teacher = res.result;
      });
    },
    // 获取评论列表
    getComments(id){
      let that = this;
      commentApi.getComments({id: id}).then(res => {
        that.commentList = res.result;
        for (let i = 0; i < that.commentList.length; i++){
          that.commentList[i].createdTime = new Date(that.commentList[i].createdTime);
          for (let j = 0; j < that.commentList[i].childCommentList.length; j++){
            that.commentList[i].childCommentList[j].createdTime = new Date(that.commentList[i].childCommentList[j].createdTime);
          }
        }
      });
    },
    // 跳转至其他视频页面
    toVideoPage(id){
      this.$router.push({
        path: '/learning-platform/videoPlayPage',
        query: {
          id: id
        }
      });
    },
    // 排除教师其他视频列表中中的目前相同视频
    getIndex(){
      let index;
      for (let i = 0; i < this.otherVideo.length; i++) {
        if (this.video.id === this.otherVideo[i].id) {
          index = i;
        }
      }
      return index;
    },
    // 发表评论
    addComments(){
      if (this.commentInfo.commentText !== ''){
        if (this.timer !== null) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.commentInfo.commentUserCode = this.userInfo.stuNumber ? this.userInfo.stuNumber : this.userInfo.employeeNumber;
          this.commentInfo.commentUsername = this.userInfo.username;
          this.commentInfo.belongVideoId = this.id;
          let that = this;
          commentApi.addComments(this.commentInfo).then(res => {
            this.$message.success(res.result);
            that.getComments(that.id);
            that.commentInfo.commentText = "";
          });
        }, 1000);
      } else {
        this.$message.warning('请输入回复内容!');
      }
    },
    // 回复评论
    addChildComments(id){
      if (this.replyInfo.commentText !== ""){
        if (this.timer !== null) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.replyInfo.commentUserCode = this.userInfo.stuNumber ? this.userInfo.stuNumber : this.userInfo.employeeNumber;
          this.replyInfo.commentUsername = this.userInfo.username;
          this.replyInfo.belongCommentId = id;
          let that = this;
          commentApi.addChildComments(this.replyInfo).then(res => {
            this.$message.success(res.result);
            that.getComments(this.id);
            that.replyInfo.commentText = "";
          });
        }, 1000);
      } else {
        this.$message.warning('请输入回复内容!');
      }
    }
  },
  created () {
    this.id = this.$route.query.id;
    this.addClickTimesAndGetVideo(this.id);
    this.userInfo = JSON.parse(localStorage.getItem('information'));
  }
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
