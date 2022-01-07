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
        <el-form-item label="姓名：" prop="username">
          <el-input v-model="tableForm.username"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-select v-model="tableForm.sex" placeholder="请选择性别">
            <el-option
              v-for="item in sexOptions"
              :key="item.key"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号：" prop="employeeNumber">
          <el-input v-model="tableForm.employeeNumber"></el-input>
        </el-form-item>
        <el-form-item label="电话号码：" prop="phoneNumber" v-if="id">
          <el-input v-model="tableForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="所属学院：" prop="affiliatedCollegeCode">
          <el-select
            v-model="tableForm.affiliatedCollegeCode"
            placeholder="请选择"
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
import api from "../../../../../service/teacher";
import detailMixin from "../../../../../components/detailMixin";

export default {
  name: "index",
  mixins: [detailMixin],
  data() {
    return {
      tableForm: {
        id: "",
        username: "",
        sex: "",
        employeeNumber: "",
        phoneNumber: "",
        affiliatedCollegeCode: "",
      },
      updateApi: api.saveTeacher,
      addApi: api.saveTeacher,
      detailApi: api.getTeacherById,
      rules: {
        username: [{ required: true, trigger: "blur", message: "必填项" }],
        sex: [{ required: true, trigger: "blur", message: "必填项" }],
        employeeNumber: [
          { required: true, trigger: "blur", message: "必填项" },
        ],
        phoneNumber: [
          {
            pattern: /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/,
            trigger: "blur",
            message: "请输入有效的手机号码",
          },
        ],
        affiliatedCollegeCode: [
          { required: true, trigger: "blur", message: "必填项" },
        ],
      },
      sexOptions: [
        {
          key: 1,
          label: "男",
          value: "男",
        },
        {
          key: 2,
          label: "女",
          value: "女",
        },
      ],
      collegeList: [],
    };
  },
  methods: {
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = {
            ...this.tableForm,
          };
          if (this.id) {
            this.update(params, "/teacher-manage");
          } else {
            this.add(params, "/teacher-manage");
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
  },
  created() {
    this.getCollegeSelect();
  }
};
</script>

<style scoped lang="scss">
@import "index";
</style>
