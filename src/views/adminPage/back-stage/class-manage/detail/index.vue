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
        <el-form-item label="班级名称：" prop="className">
          <el-input v-model="tableForm.className"></el-input>
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
            @change="getValue"
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
        <el-form-item label="学院代码：" prop="classCode">
          <el-input
            v-model="tableForm.classCode"
            placeholder="请先选择所属专业"
            :disabled="!tableForm.affiliatedMajorCode"
          ></el-input>
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
import api from "../../../../../service/class";
import detailMixin from "../../../../../components/detailMixin";

export default {
  name: "index",
  mixins: [detailMixin],
  data() {
    const isNum = (rule, value, callback) => {
      const age = /^[0-9]*$/;
      if (!age.test(value)) {
        callback(new Error("编码必须为纯数字，正确编码格式--例:32000101xx"));
      } else {
        callback();
      }
    };
    return {
      tableForm: {
        id: "",
        className: "",
        classCode: "",
        affiliatedCollegeCode: "",
        affiliatedMajorCode: "",
      },
      collegeList: [],
      majorList: [],
      updateApi: api.saveClass,
      addApi: api.saveClass,
      detailApi: api.getClassById,
      rules: {
        className: [{ required: true, trigger: "blur", message: "必填项" }],
        classCode: [
          {
            required: true,
            trigger: "blur",
            pattern: /^[0-9]{10}$/,
            message: "正确编码格式--例:32000101xx",
          },
          { validator: isNum, trigger: "blur" },
        ],
        affiliatedCollegeCode: [
          { required: true, trigger: "blur", message: "必填项" },
        ],
        affiliatedMajorCode: [
          { required: true, trigger: "blur", message: "必填项" },
        ],
      },
      majorName: "",
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
            this.update(params, "/class-manage");
          } else {
            this.add(params, "/class-manage");
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
    getValue() {
      this.tableForm.classCode = this.tableForm.affiliatedMajorCode;
    },
    setValue() {
      this.tableForm.affiliatedMajorCode = "";
      this.tableForm.classCode = "";
    },
  },
  created() {
    this.getCollegeSelect();
  },
};
</script>

<style scoped lang="scss">
@import "index";
</style>
