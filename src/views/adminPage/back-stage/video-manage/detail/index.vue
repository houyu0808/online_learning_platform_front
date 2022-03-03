<template>
  <div>
    <el-main>
      <el-form
        label-position="left"
        label-width="120px"
        :model="tableForm"
        class="form-box"
        ref="form"
        :rules="rules"
      >
        <el-form-item label="视频名称：" prop="name">
          <el-input v-model="tableForm.name"></el-input>
        </el-form-item>
        <el-form-item label="视频编码：" prop="videoCode">
          <el-input v-model="tableForm.videoCode"></el-input>
        </el-form-item>
        <el-form-item label="封面图片：">
          <el-upload
            class="upload-image"
            ref="upload-image"
            action=""
            :limit="1"
            :on-change="fileChange"
            :on-remove="handleRemove"
            :file-list="file1"
            list-type="picture"
            :auto-upload="false"
          >
            <el-button
              size="small"
              type="primary"
              v-if="JSON.stringify(file1) === '{}'"
              >点击上传</el-button
            >
          </el-upload>
        </el-form-item>
        <el-form-item label="课程视频：">
          <el-upload
            class="upload-video"
            ref="upload-video"
            action=""
            :limit="1"
            :on-change="videoChange"
            :on-remove="handleVideoRemove"
            :file-list="file2"
            :auto-upload="false"
          >
            <el-button
              size="small"
              type="primary"
              v-if="JSON.stringify(file2) === '{}'"
              >点击上传</el-button
            >
          </el-upload>
        </el-form-item>
        <el-form-item label="授课教师：" prop="belongTeacherCode">
          <el-select
            v-model="tableForm.belongTeacherCode"
            filterable
            placeholder="请输入教师姓名进行筛选"
          >
            <el-option
              v-for="item in teacherList"
              :key="item.id"
              :label="item.username + '(' + item.employeeNumber + ')'"
              :value="item.employeeNumber"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程：" prop="belongCourseCode">
          <el-select
            v-model="tableForm.belongCourseCode"
            filterable
            placeholder="请输入课程名称进行筛选"
          >
            <el-option
              v-for="item in courseList"
              :key="item.id"
              :label="item.courseName"
              :value="item.courseCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频介绍：" prop="videoIntroduce">
          <textarea maxlength="100" v-model="tableForm.videoIntroduce" class="video-introduce" />
          <p class="tip-count">{{ tableForm.videoIntroduce.length }}/100</p>
        </el-form-item>
      </el-form>
      <div class="button-box">
        <el-button type="primary" @click="save">{{
          id ? "更新" : "创建"
        }}</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-main>
  </div>
</template>

<script>
import api from '../../../../../service/video';
import detailMixin from '../../../../../components/detailMixin';

export default {
  name: 'index',
  mixins: [detailMixin],
  data() {
    return {
      tableForm: {
        id: '',
        name: '',
        videoCode: '',
        belongTeacherCode: '',
        belongCourseCode: '',
        imageUrl: '',
        videoUrl: '',
        videoIntroduce: ''
      },
      file1: {},
      file2: {},
      updateApi: api.saveVideo,
      addApi: api.saveVideo,
      detailApi: api.getVideoById,
      rules: {
        name: [{ required: true, trigger: 'blur', message: '必填项' }],
        videoCode: [{ required: true, trigger: 'blur', message: '必填项' }],
        belongCourseCode: [
          { required: true, trigger: 'blur', message: '必填项' }
        ],
        belongTeacherCode: [
          { required: true, trigger: 'blur', message: '必填项' }
        ]
      },
      teacherList: [],
      courseList: []
    };
  },
  methods: {
    save() {
      let formData = new FormData();
      formData.append('file1', this.file1.raw);
      formData.append('file2', this.file2.raw);
      formData.append('name', this.tableForm.name);
      formData.append('id', this.tableForm.id);
      formData.append('videoCode', this.tableForm.videoCode);
      formData.append('belongCourseCode', this.tableForm.belongCourseCode);
      formData.append('belongTeacherCode', this.tableForm.belongTeacherCode);
      formData.append('videoIntroduce', this.tableForm.videoIntroduce);
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.id) {
            this.update(formData, '/video-manage');
          } else {
            this.add(formData, '/video-manage');
          }
        } else {
          this.$message.warning({ message: '请查看分步信息是否填写完整！' });
        }
      });
    },
    fileChange(file, fileList) {
      this.file1 = fileList[0];
    },
    videoChange(file, fileList) {
      this.file2 = fileList[0];
    },
    handleRemove() {
      this.file1 = {};
    },
    handleVideoRemove() {
      this.file2 = {};
    },
    getTeacherSelect() {
      api.getTeacherList({ username: '', page: 0, size: 1000 }).then((res) => {
        this.teacherList = res.result.content;
      });
    },
    getCourseSelect() {
      api.getCourseList({ courseName: '', page: 0, size: 1000 }).then((res) => {
        this.courseList = res.result.content;
      });
    }
  },
  created() {
    this.getTeacherSelect();
    this.getCourseSelect();
  }
};
</script>

<style scoped lang="scss">
@import "index";
</style>
