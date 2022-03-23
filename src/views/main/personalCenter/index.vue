<template>
  <div class="container">
    <div class="student-info" >
      <div class="title"><div class="logo"></div><div class="title-info">我的信息</div></div>
      <el-form label-position="left" label-width="80px" :model="studentInfo">
        <el-form-item label="头像">
          <img :src="studentInfo.headImgUrl ? studentInfo.headImgUrl : defaultImg" class="head-img-item">
          <el-button @click="dialogVisible = true" type="text">更换头像</el-button>
          <el-dialog
            title="上传头像"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :auto-upload="false"
              :on-change="handleAvatarSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span slot="footer" class="dialog-footer">
              <el-button @click="handleClose">取 消</el-button>
              <el-button type="primary" @click="uploadImage">确 定</el-button>
            </span>
          </el-dialog>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="studentInfo.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="studentInfo.stuNumber" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="studentInfo.sex" :disabled="true">
            <el-radio :label="'男'">男</el-radio>
            <el-radio :label="'女'">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="studentInfo.phoneNumber" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所属学院">
          <el-input v-model="studentInfo.affiliatedCollegeName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所属专业">
          <el-input v-model="studentInfo.affiliatedMajorName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所属班级">
          <el-input v-model="studentInfo.affiliatedClassName" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import defaultImg from '../../../assets/images/默认头像.jpeg';
import api from '../../../service/mainPage';

export default {
  name: 'index',
  data(){
    return {
      studentInfo: {},
      defaultImg: defaultImg,
      file: null,
      dialogVisible: false,
      imageUrl: ''
    };
  },
  methods: {
    handleClose(){
      this.file = null;
      this.imageUrl = null;
      this.dialogVisible = false;
    },
    handleAvatarSuccess(res) {
      const isJPG = (res.type !== 'image/jpeg' && res.type !== 'image/png');
      const isLt2M = res.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      } else {
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        } else {
          this.file = res.raw;
          this.imageUrl = URL.createObjectURL(res.raw);
        }
      }
      console.log(this.file);
      return isJPG && isLt2M;
    },
    uploadImage(){
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('userNumber', this.studentInfo.stuNumber);
      formData.append('identify', this.studentInfo.identify);
      console.log(formData);
      api.uploadHeadImg(formData).then(res => {
        this.$message.success(res.message);
      });
    }
  },
  created () {
    this.studentInfo = JSON.parse(localStorage.getItem('information'));
  }
};
</script>

<style scoped lang="scss">
@import "index";
</style>
