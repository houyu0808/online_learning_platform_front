<template>
  <div class="container">
    <div class="whole-box">
      <div class="left-box">
        <div class="info-box">
          <div class="head-image"><img :src="userInfo.headImgUrl" alt=""></div>
          <div class="username"> {{userInfo.username}} </div>
          <div class="userInfo"><span> {{ userInfo.affiliatedCollegeName }} </span>
            <span> {{ userInfo.affiliatedMajorName ? userInfo.affiliatedMajorName : '' }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{userInfo.identify}} </span></div>
        </div>
      </div>
      <div class="mid-box">
        <div class="publish-box">
          <el-input type="textarea" placeholder="今天有什么想和大家分享的吗?" resize="none" v-model="forum" class="forum-input-box"></el-input>
          <div class="more-functions">
            <el-popover
              placement="bottom"
              width="300"
              trigger="click">
              <div style="margin-bottom: 10px;font-weight: bold;padding-left: 5px;font-size: 15px">表情</div>
              <div class="emoji-list">
                <div class="emoji-item" v-for="(item,index) in emojis" :key="index" @click="handleEmoji(item)">{{ item }}</div>
              </div>
              <img :src="emojiLogo" slot="reference" alt="表情" title="表情" @mouseenter="changeLogo('emojiActive')" @mouseleave="changeLogo('emoji')">
            </el-popover>
            <el-popover
              placement="bottom"
              width="324"
              trigger="click">
              <div>
                <div style="margin-bottom: 10px;padding-left: 5px;font-size: 15px">请选择图片({{ files.length }}/9)</div>
                <el-upload
                  action=""
                  list-type="picture-card"
                  :auto-upload="false"
                  :on-change="handleChange"
                  :on-remove="handleRemove"
                  :limit="9">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="imgUrl" alt="">
                </el-dialog>
              </div>
              <img :src="imageLogo" slot="reference" alt="图片" title="图片" @mouseenter="changeLogo('imageActive')" @mouseleave="changeLogo('image')">
            </el-popover>
          </div>
          <el-button type="primary" class="publish-btn" size="mini" @click="submitForum" :disabled="forum === ''">发表</el-button>
        </div>
        <div class="comment-box">
          <div class="infinite-list">
            <div v-for="(item,index) in forumList" class="infinite-list-item" :key="index">
              <div class="userInfo">
                <div class="head-img"><img :src="item.headImg" alt=""></div>
                <div class="user-right-box">
                  <div class="userName">{{ item.username }}</div>
                  <div class="publish-time">{{ timeReversal(new Date(item.forumVO.publishTime)) }}</div>
                </div>
              </div>
              <div class="forum-content">
                <div class="forum-text">{{ item.forumVO.forumContent }}</div>
                <div class="forum-img" v-if="item.forumImgVOList.length > 0" :style="imgStyle(item.forumImgVOList.length)">
                  <div class="forum-img-item" v-for="(i,idx) in item.forumImgVOList" :key="idx" :style="itemStyle(item.forumImgVOList.length)">
                    <img :src="i.imgUrl" alt="" title="查看图片" @click="showImage(i.imgUrl)">
                  </div>
                </div>
              </div>
              <div class="opt-box">
                <div class="zan-box"><i :class="item.like ? 'zan zaned':'zan'" @click="addLike(item)"></i><span>{{item.forumVO.likes}}</span></div>
                <div class="comments-box"><i class="comment" @click="showCommentBox(index)"></i><span>{{ item.forumCommentVOList.length ? item.forumCommentVOList.length : 0 }}</span></div>
              </div>
              <div :class="'show-comment comment-item' + [index]">
                <div class="comment">
                  <div class="user-image"><img :src="userInfo.headImgUrl" alt=""></div>
                  <div class="comment-input-area"><textarea v-model="commentText" maxlength="100" placeholder="发表一下你对本视频的看法吧!"></textarea></div>
                  <div class="submit-comment"><button @click="addComment(item)">发表评论</button></div>
                </div>
                <div class="no-comments" v-if="item.forumCommentVOList.length === 0"><span>该动态暂无评论!赶紧来抢一楼吧!</span></div>
                <div class="show-comments" v-else>
                  <div class="comments-item" v-for="(it,inx) in item.forumCommentVOList" :key="inx">
                    <div class="user-comments">
                      <img :src="it.headImgUrl" alt="">
                      <div class="user-right">
                        <div class="comment-username">
                          {{ it.username }}
                        </div>
                        <div class="comment-text">
                          {{ it.comment }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-box">
        <div class="news-box"></div>
      </div>
    </div>
    <el-dialog
      :visible.sync="showImg"
      width="50%">
      <img :src="showImageUrl" alt="" style="width: 100%">
    </el-dialog>
  </div>
</template>

<script>
import emoji from '../../../assets/icon/emoji.png';
import emojiActive from '../../../assets/icon/emoji_active.png';
import image from '../../../assets/icon/image.png';
import imageActive from '../../../assets/icon/image_active.png';
import api from '../../../service/forum';

export default {
  name: 'index',
  data(){
    return {
      emojis: [
        '😀', '😄', '😅', '🤣', '😂', '😉', '😊', '😍', '😘', '😜',
        '😝', '😏', '😒', '🙄', '😔', '😴', '😷', '🤮', '🥵', '😎',
        '😮', '😰', '😭', '😱', '😩', '😡', '💀', '👽', '🤓', '🥳',
        '😺', '😹', '😻', '🤚', '💩', '👍', '👎', '👏', '🙏', '💪'
      ],
      forum: '',
      emojiLogo: emoji,
      imageLogo: image,
      dialogVisible: false,
      imgUrl: '',
      files: [],
      userInfo: {},
      pageInfo: {
        size: 999,
        page: 0,
        sort: 'publish_time,asc'
      },
      forumList: [],
      showImageUrl: '',
      showImg: false,
      showCommentList: [],
      commentText: ''
    };
  },
  methods: {
    handleEmoji(emoji){
      this.forum = this.forum + emoji;
    },
    changeLogo(item){
      switch (item) {
        case 'emoji':
          this.emojiLogo = emoji;
          break;
        case 'emojiActive':
          this.emojiLogo = emojiActive;
          break;
        case 'image':
          this.imageLogo = image;
          break;
        case 'imageActive':
          this.imageLogo = imageActive;
          break;
      }
    },
    handleChange(file){
      if (this.files.length < 9){
        this.files.push(file.raw);
        console.log(this.files);
      } else {
        this.$message.warning('最多选择九张图片');
      }
    },
    handleRemove(file){
      this.files.splice(this.files.findIndex(item => item.uid === file.uid), 1);
      console.log(this.files);
    },
    submitForum(){
      let formData = new FormData();
      formData.append('files', this.files);
      formData.append('userNumber', this.userInfo.stuNumber);
      formData.append('forumContent', this.forum);
      formData.append('publishTime', new Date());
      formData.append('identify', this.userInfo.identify);
      console.log(formData);
      api.publishForum(formData).then(res => {
        this.$message.success(res.message);
        this.getForumsList();
      });
    },
    getForumsList(){
      let that = this;
      api.getForumList(this.pageInfo).then(res => {
        that.forumList = res.result;
        for (let i = 0; i < that.forumList.length; i++){
          that.showCommentList[i] = false;
          console.log(that.showCommentList[i]);
        }
      });
    },
    addComment(item){
      if (this.commentText !== ''){
        let that = this;
        api.addComment({
          belongForumId: item.forumVO.id,
          comment: this.commentText,
          commentUserNumber: (this.userInfo.stuNumber ? this.userInfo.stuNumber : this.userInfo.employeeNumber),
          identify: this.userInfo.identify
        }).then(res => {
          this.$message.success(res.message);
          that.getForumsList();
          that.commentText = '';
        });
      } else {
        this.$message.warning('请输入评论内容!');
      }
    },
    timeReversal (date) {
      let y = date.getFullYear(); // 年
      let m = date.getMonth() + 1; // 月
      m = m < 10 ? ('0' + m) : m;
      let d = date.getDate(); // 日
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours(); // 时
      h = h > 10 ? h : '0' + h;
      let minute = date.getMinutes(); // 分
      minute = minute < 10 ? ('0' + minute) : minute;
      let Seconds = date.getSeconds(); // 秒
      Seconds = Seconds > 10 ? Seconds : '0' + Seconds;
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + Seconds;
    },
    // 图片展示样式动态改变
    imgStyle(dataLength){
      let style = {
        height: ''
      };
      switch (dataLength){
        case 1:
          style.height = '250px';
          break;
        case 2:
          style.height = '120px';
          break;
        case 3:
          style.height = '150px';
          break;
        case 4 || 5 || 6:
          style.height = '280px';
          break;
        case 7 || 8 || 9:
          style.height = '410px';
          break;
      }
      return style;
    },
    itemStyle(dataLength){
      let style = {
        width: '',
        height: ''
      };
      switch (dataLength){
        case 1:
          style.width = '360px';
          style.height = '250px';
          break;
        case 2:
          style.width = '190px';
          style.height = '100px';
          break;
        default:
          style.width = '120px';
          style.height = '120px';
          break;
      }
      return style;
    },
    showImage(image){
      this.showImageUrl = image;
      this.showImg = true;
    },
    showCommentBox(index){
      let showBox = document.getElementsByClassName('comment-item' + index)[0];
      if (showBox.style.display === 'block'){
        showBox.style.display = 'none';
      } else {
        showBox.style.display = 'block';
      }
    },
    addLike(item){
      if (item.like === true){
        api.cancelLike({
          forumId: item.forumVO.id,
          userNumber: (this.userInfo.stuNumber ? this.userInfo.stuNumber : this.userInfo.employeeNumber)
        }).then(res => {
          this.$message.success(res.message);
          this.getForumsList();
        });
      } else {
        api.addLike({
          forumId: item.forumVO.id,
          userNumber: (this.userInfo.stuNumber ? this.userInfo.stuNumber : this.userInfo.employeeNumber)
        }).then(res => {
          this.$message.success(res.message);
          this.getForumsList();
        });
      }
    },
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('information'));
    this.getForumsList();
  },
};
</script>

<style scoped lang="scss">
@import "index";
</style>
