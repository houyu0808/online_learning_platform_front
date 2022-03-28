<template>
  <div class="container">
    <div class="whole-box">
      <div class="left-box">
        <div class="info-box"></div>
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
        <div class="comment-box"></div>
      </div>
      <div class="right-box">
        <div class="news-box"></div>
      </div>
    </div>
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
      userInfo: {}
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
        this.$message.success(res.result);
      });
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('information'));
  }
};
</script>

<style scoped lang="scss">
@import "index";
</style>
