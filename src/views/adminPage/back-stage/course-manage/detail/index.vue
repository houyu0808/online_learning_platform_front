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
        <el-form-item label="课程名称：" prop="courseName">
          <el-input v-model="tableForm.courseName"></el-input>
        </el-form-item>
        <el-form-item label="所属学院：" prop="affiliatedCollegeCode">
          <el-select
            v-model="tableForm.affiliatedCollegeCode"
            placeholder="请选择"
            @change="setValue"
          >
            <el-option
              v-for="item in collegeList"
              :key="item.id"
              :label="item.collegeName"
              :value="item.collegeCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属专业：" prop="affiliatedMajorCode">
          <el-select
            v-model="tableForm.affiliatedMajorCode"
            placeholder="请先选择所属学院"
            :disabled="!tableForm.affiliatedCollegeCode"
          >
            <el-option
              v-for="item in majorList"
              :key="item.id"
              :label="item.majorName"
              :value="item.majorCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程代码：" prop="courseCode">
          <el-input v-model="tableForm.courseCode"></el-input>
        </el-form-item>
        <el-form-item label="授课教师：" prop="teacher">
          <el-select
            v-model="tableForm.teacher"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in teacherList"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开课状态：" prop="status">
          <el-select v-model="tableForm.status">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
import api from "../../../../../service/course";
import detailMixin from "../../../../../components/detailMixin";

export default {
  name: "index",
  mixins: [detailMixin],
  data() {
    return {
      tableForm: {
        id: "",
        courseName: "",
        courseCode: "",
        affiliatedCollegeCode: "",
        affiliatedMajorCode: "",
        teacher: "",
        status: 1,
      },
      updateApi: api.saveCourse,
      addApi: api.saveCourse,
      detailApi: api.getCourseById,
      rules: {
        courseName: [{ required: true, trigger: "blur", message: "必填项" }],
        courseCode: [
          {
            required: true,
            trigger: "blur",
            pattern: /^3203[0-9]{4}$/,
            message: "正确编码格式--例:3203xxxx",
          },
        ],
        affiliatedCollegeCode: [
          { required: true, trigger: "blur", message: "必填项" },
        ],
        affiliatedMajorCode: [
          { required: true, trigger: "blur", message: "必填项" },
        ],
      },
      collegeList: [],
      majorList: [],
      teacherList: [],
      options: [
        {
          key: 1,
          label: "是",
          value: 1,
        },
        {
          key: 2,
          label: "否",
          value: 0,
        },
      ],
    };
  },
  watch: {
    "tableForm.affiliatedCollegeCode": {
      handler(val) {
        if (val !== "") {
          this.getMajorSelect(val);
        }
      },
    },
  },
  methods: {
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = {
            ...this.tableForm,
          };
          if (this.id) {
            this.update(params, "/college-manage");
          } else {
            this.add(params, "/college-manage");
          }
        } else {
          this.$message.warning({ message: "请查看分步信息是否填写完整！" });
        }
      });
    },
    getCollegeSelect() {
      api
        .getCollegeList({ collegeName: "", page: 0, size: 100 })
        .then((res) => {
          this.collegeList = res.result.content;
        });
    },
    getMajorSelect(params) {
      api.getMajorList({ collegeCode: params }).then((res) => {
        this.majorList = res.result;
      });
    },
    setValue() {
      this.tableForm.affiliatedMajorCode = "";
    },
    getTeacherSelect() {
      api.getTeacherList({ username: "", page: 0, size: 1000 }).then((res) => {
        this.teacherList = res.result.content;
      });
    },
  },
  created() {
    this.getCollegeSelect();
    this.getTeacherSelect();
  },
};
</script>

<style scoped lang="scss">
@import "index";
</style>
