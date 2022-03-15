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
            label="开始时间">
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="结束时间">
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
              <el-upload
                class="upload-video"
                ref="upload-video"
                action=""
                :limit="1"
                :before-upload="beforeUploadForm"
                :http-request="fileChange"
                :file-list="file"
                :auto-upload="false"
              >
                <el-button @click="uploadFile(scope.row)" type="text" size="small">上传</el-button>
              </el-upload>
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
      fileData: null
    };
  },
  methods: {
    getStudentTaskList(){
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
        if (row['status'] === '进行中' || row['status'] === '完成'){
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
    beforeUploadForm (file) {
      // 验证文件类型
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
      const extension = testmsg === 'doc' || testmsg === 'docx';
      if (!extension) {
        this.$message({
          message: '上传文件只能是doc/docx格式!',
          duration: 1000,
          showClose: true,
          type: 'warning'
        });
      }
      return extension;
    },
    fileChange(param, type){
      let date = new Date();
      let formData = new FormData();
      formData.append('file', param.file);
      formData.append('stuNumber', this.fileData.stuNumber);
      formData.append('taskId', this.fileData.id);
      formData.append('uploadTime', date.toString());
      api.uploadFile(formData).then(res => {
        console.log(res);
      });
    },
    uploadFile(row){
      this.fileData = row;
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
