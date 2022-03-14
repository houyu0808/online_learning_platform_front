<template>
  <div class="container">
    <div class="contain-box">
        <div class="teacher-info-box">
          <div class="user-info" :style="{backgroundImage: 'url(' + hengFu +')'}">
          <img :src="headImg" alt="">
          <div class="user-item">
            <div>
              <div class="username">{{ userInfo.username }}</div>
              <div class="user-autograph">{{ userInfo.autograph }}</div>
            </div>
            <div class="add-task"><el-button type="primary" @click="openAddBox" v-if="activeName === 'first'">发布任务</el-button></div>
          </div>
        </div>
        </div>
        <div class="tab-change">
          <el-tabs v-model="activeName">
            <el-tab-pane label="发布列表" name="first">
              <div class="task-list-box">
                <el-table
                  :data="taskList"
                  border
                  style="width: 100%"
                  :cell-style="tableCellStyle">
                  <el-table-column
                    prop="id"
                    label="ID"
                    sortable
                    width="60">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="任务名称"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="startTime"
                    label="开始时间"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="endTime"
                    label="结束时间"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="belongClassName"
                    label="班级"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    label="状态"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="comment"
                    label="备注"
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                      <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                      <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
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
            </el-tab-pane>
            <el-tab-pane label="任务情况" name="second">
              <div class="student-detail">
                <div class="select-task">
                  <span>选择任务:</span>
                  <el-select v-model="taskId" placeholder="请选择" @change="getTaskClass">
                    <el-option
                      v-for="item in taskList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
                <div class="task-class-list">
                  <el-table
                    :data="taskClassList"
                    border
                    style="width: 100%"
                    :cell-style="tableCellStyle">
                    <el-table-column
                      prop="id"
                      label="ID"
                      sortable
                      width="60">
                    </el-table-column>
                    <el-table-column
                      prop="stuNumber"
                      label="学号"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="stuName"
                      label="姓名"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="belongClassName"
                      label="班级"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="status"
                      label="状态"
                    >
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="100"
                      v-if="taskClassList.status === '完成'">
                      <template slot-scope="scope">
                        <el-button @click="download(scope.row)" type="text" size="small">下载</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-footer class="page-footer">
                    <el-pagination
                      v-show="pageInfo.totalElements > 0"
                      background
                      :total="pageInfo.totalElements"
                      @size-change="handleSizeChange2"
                      @current-change="handleCurrentChange2"
                      :layout="pageInfo.layout"
                      :current-page.sync="pageInfo.page"
                      :page-sizes="pageInfo.pageSizes"
                      :page-size="pageInfo.size"
                    >
                    </el-pagination>
                  </el-footer>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    <el-dialog
      title="发布新的任务"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose">
      <div class="add-task-box">
        <el-form ref="form" :model="taskForm" label-width="80px" label-position="left" :rules="rules">
          <el-form-item label="任务名称" prop="name">
            <el-input v-model="taskForm.name"></el-input>
          </el-form-item>
          <el-form-item label="所属班级" prop="belongClassCode">
            <el-select
              v-model="taskForm.belongClassCode"
              placeholder="请先选择所属班级"
            >
              <el-option
                v-for="item in classList"
                :key="item.id"
                :label="item.className"
                :value="item.classCode"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务文件">
            <el-upload
              class="upload-video"
              ref="upload-video"
              action=""
              :limit="1"
              :file-list="file"
              :on-change="fileChange"
              :auto-upload="false"
            >
              <el-button
                size="small"
                type="primary"
              >选取文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传word/excel文件(仅一份文件)且不超过1MB</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              v-model="taskForm.startTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="taskForm.endTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注" prop="comment">
            <textarea maxlength="100" v-model="taskForm.comment"></textarea>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="addTask()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import headImg from '../../../assets/images/默认头像.jpeg';
import api from '../../../service/task';
import background from '../../../assets/images/hengfu.jpeg';

export default {
  name: 'index',
  data() {
    return {
      headImg: headImg,
      hengFu: background,
      userInfo: null,
      pageInfo: {
        layout: 'total,prev,pager,next,sizes,jumper',
        pageSizes: [10, 20, 30, 40],
        page: 1,
        size: 10,
        totalElements: 0,
        totalPages: 0
      },
      page2Info: {
        layout: 'total,prev,pager,next,sizes,jumper',
        pageSizes: [10, 20, 30, 40],
        page: 1,
        size: 10,
        totalElements: 0,
        totalPages: 0
      },
      taskList: [],
      activeName: 'first',
      dialogVisible: false,
      taskForm: {
        name: '',
        belongClassCode: '',
        startTime: '',
        endTime: '',
        comment: ''
      },
      classList: [],
      file: null,
      rules: {
        name: [{ required: true, trigger: 'blur', message: '必填项' }],
        belongClassCode: [{ required: true, trigger: 'blur', message: '必填项' }],
        startTime: [{ required: true, trigger: 'blur', message: '必填项' }],
        endTime: [{ required: true, trigger: 'blur', message: '必填项' }]
      },
      taskId: '',
      taskClassList: []
    };
  },
  methods: {
    // 获取任务列表
    getTaskList(){
      let params = {
        teacherCode: this.userInfo.employeeNumber,
        ...this.pageInfo
      };
      params.page = params.page - 1;
      delete params.totalElements;
      delete params.pageSizes;
      delete params.totalPages;
      delete params.layout;
      let that = this;
      api.getTaskList(params).then(res => {
        that.taskList = res.result.content;
        that.taskId = that.taskList[0].id;
        for (let i = 0; i < that.taskList.length; i++){
          let nowTime = new Date();
          let startTime = new Date(that.taskList[i].startTime);
          that.taskList[i].startTime = that.timeReversal(startTime);
          let endTime = new Date(that.taskList[i].endTime);
          that.taskList[i].endTime = that.timeReversal(endTime);
          that.taskList[i].status = endTime.getTime() > nowTime.getTime() ? '进行中' : '已结束';
        }
        that.getTaskClass();
      });
    },
    handleClick(row) {
      this.activeName = 'second';
      this.taskId = row.id;
      this.getTaskClass();
    },
    // 删除任务
    handleDelete(row){
      this.$confirm('确认删除该任务吗？', '提示', { type: 'warning' }).then(res => {
        api.deleteTask({id: row.id}).then(res => {
          this.$message.success(res.message);
          this.getTaskList();
        });
      });
    },
    handleCurrentChange(e) {
      this.pageInfo.page = e;
      this.getTaskList();
    },
    handleSizeChange(e) {
      this.pageInfo.size = e;
      this.getTaskList();
    },
    handleCurrentChange2(e) {
      this.page2Info.page = e;
      this.getTaskClass();
    },
    handleSizeChange2(e) {
      this.page2Info.size = e;
      this.getTaskClass();
    },
    handleClose(done) {
      done();
    },
    cancel(){
      this.dialogVisible = false;
      this.taskForm = {};
    },
    addTask(){
      this.save();
      this.dialogVisible = false;
    },
    openAddBox(){
      this.dialogVisible = true;
      api.getClassList({collegeCode: this.userInfo.affiliatedCollegeCode}).then(res => {
        this.classList = res.result;
      });
    },
    save() {
      let formData = new FormData();
      formData.append('file', this.file.raw);
      formData.append('name', this.taskForm.name);
      formData.append('belongClassCode', this.taskForm.belongClassCode);
      formData.append('startTime', this.taskForm.startTime);
      formData.append('endTime', this.taskForm.endTime);
      formData.append('comment', this.taskForm.comment);
      formData.append('publisherCode', this.userInfo.employeeNumber);
      this.$refs.form.validate((valid) => {
        if (valid) {
          api.addTask(formData).then(res => {
            this.$message.success(res.message);
            this.getTaskList();
          });
        } else {
          this.$message.warning({ message: '请查看分步信息是否填写完整！' });
        }
      });
    },
    fileChange(file, fileList) {
      this.file = fileList[0];
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
    getTaskClass(){
      let params = {
        taskId: this.taskId,
        ...this.pageInfo
      };
      params.page = params.page - 1;
      delete params.totalElements;
      delete params.pageSizes;
      delete params.totalPages;
      delete params.layout;
      let that = this;
      api.getTaskClassPage(params).then(res => {
        that.taskClassList = res.result.content;
      });
    },
    download(row){
      console.log(row);
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('information'));
    this.getTaskList();
  }
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
