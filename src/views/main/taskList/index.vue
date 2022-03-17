<template>
  <div class="container">
    <div class="contain-box">
      <div class="student-info-box">
        <div class="user-info" :style="{backgroundImage: 'url(' + hengFu +')'}">
          <img :src="headImg" alt="">
          <div class="user-item">
            <div>
              <div class="username">{{ userInfo.username }}</div>
              <div class="user-autograph">这个人很懒，什么也没有留下！</div>
            </div>
          </div>
        </div>
      </div>
      <div class="task-list">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :cell-style="tableCellStyle">
          <el-table-column
            prop="name"
            label="任务名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="开始时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="结束时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="publisherName"
            label="发布人">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="uploadStatus"
            label="任务进度">
          </el-table-column>
          <el-table-column
            prop="comment"
            label="备注"
            width="200">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="downloadFile(scope.row)" type="text" size="small">下载</el-button>
              <el-button @click="uploadFile(scope.row)" type="text" size="small">上传</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-footer class="page-footer">
          <el-pagination
            v-show="pageInfo.totalElements > 0"
            background
            :total="pageInfo.totalElements"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :layout="pageInfo.layout"
            :current-page.sync="pageInfo.page"
            :page-sizes="pageInfo.pageSizes"
            :page-size="pageInfo.size"
          >
          </el-pagination>
        </el-footer>
      </div>
    </div>
    <el-dialog
      title="文件上传"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose">
      <div>
        <el-upload
          class="upload-demo"
          drag
          :on-change="fileChange"
          action=""
          limit="1"
          :auto-upload="false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传doc/docx文件，且不超过5MB</div>
        </el-upload>
      </div>
      <div style="margin-top: 10px;height: 30px">
        <el-button type="primary" @click="submit()" style="float: right">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import headImg from '../../../assets/images/默认头像.jpeg';
import background from '../../../assets/images/hengfu.jpeg';
import api from '../../../service/task';
import axios from 'axios';

export default {
  name: 'taskList',
  data(){
    return {
      headImg: headImg,
      hengFu: background,
      userInfo: null,
      tableData: [],
      pageInfo: {
        layout: 'total,prev,pager,next,sizes,jumper',
        pageSizes: [10, 20, 30, 40],
        page: 1,
        size: 10,
        totalElements: 0,
        totalPages: 0
      },
      file: null,
      fileData: null,
      dialogVisible: false,
      taskClass: []
    };
  },
  methods: {
    async getStudentTaskList(){
      await this.getStudentTaskClass();
      let params = {
        classCode: this.userInfo.affiliatedClassCode,
        ...this.pageInfo
      };
      params.page = params.page - 1;
      delete params.totalElements;
      delete params.pageSizes;
      delete params.totalPages;
      delete params.layout;
      let that = this;
      api.getStudentTaskList(params).then(res => {
        that.tableData = res.result.content;
        for (let i = 0; i < that.tableData.length; i++){
          let nowTime = new Date();
          let startTime = new Date(that.tableData[i].startTime);
          that.tableData[i].startTime = that.timeReversal(startTime);
          let endTime = new Date(that.tableData[i].endTime);
          that.tableData[i].endTime = that.timeReversal(endTime);
          that.tableData[i].status = endTime.getTime() > nowTime.getTime() ? '进行中' : '已结束';
          for (let j = 0; j < that.taskClass.length; j++){
            if (that.taskClass[j].belongTaskId === that.tableData[i].id){
              that.tableData[i].uploadStatus = that.taskClass[j].status;
            }
          }
        }
      });
    },
    handleSizeChange(e) {
      this.pageInfo.size = e;
      this.getStudentTaskList();
    },
    handleCurrentChange(e) {
      this.pageInfo.page = e;
      this.getStudentTaskList();
    },
    tableCellStyle({row, column, rowIndex, columnIndex}){
      if (column.label === '状态'){
        if (row['status'] === '进行中'){
          return {
            color: 'green'
          };
        } else {
          return {
            color: 'red'
          };
        }
      }
      if (column.label === '任务进度'){
        if (row['uploadStatus'] === '完成'){
          return {
            color: 'green'
          };
        } else {
          return {
            color: 'red'
          };
        }
      }
    },
    timeReversal (date) {
      let y = date.getFullYear(); // 年
      let m = date.getMonth() + 1; // 月
      m = m < 10 ? ('0' + m) : m;
      let d = date.getDate(); // 日
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours(); // 时
      let minute = date.getMinutes(); // 分
      minute = minute < 10 ? ('0' + minute) : minute;
      let Seconds = date.getSeconds(); // 秒
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + Seconds;
    },
    downloadFile(row){
      axios({
        method: 'GET',
        url: 'http://localhost:8090/task/downloadfile',
        params: {id: row.id},
        responseType: 'blob',
        header: {
          token: localStorage.getItem('token')
        }
      }).then(res => {
        let url = window.URL.createObjectURL(new Blob([res.data]));
        let a = document.createElement('a');
        a.download = row.name + '.docx';
        a.href = url;
        a.click();
      });
    },
    uploadFile(row){
      this.fileData = row;
      this.dialogVisible = true;
    },
    handleClose(){
      this.dialogVisible = false;
    },
    submit(){
      let formData = new FormData();
      let date = new Date();
      formData.append('file', this.file.raw);
      formData.append('stuNumber', this.userInfo.stuNumber);
      formData.append('taskId', this.fileData.id);
      formData.append('uploadTime', date.toString());
      api.uploadFile(formData).then(res => {
        this.$message.success(res.message);
      });
      this.dialogVisible = false;
    },
    fileChange(file, fileList) {
      this.file = fileList[0];
    },
    getStudentTaskClass(){
      let that = this;
      api.getStudentTaskClass({stuNumber: this.userInfo.stuNumber}).then(res => {
        that.taskClass = res.result;
      });
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('information'));
    this.getStudentTaskList();
  }
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
