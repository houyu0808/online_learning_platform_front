<template>
  <div class="login-page">
    <img
      :src="bgImg"
      style="width: 100vw; height: 100vh; z-index: 0; position: absolute"
    />
    <el-row type="flex" class="row-bg" justify="center">
      <transition name="el-zoom-in-center" mode="out-in">
        <el-col :span="8" class="login-form" v-if="showBox === 'login'">
          <div class="grid-content bg-purple">
            <el-tabs
              v-model="identify"
              type="card"
              @tab-click="handleClick"
              class="login-tab"
            >
              <el-tab-pane label="学生" name="学生"></el-tab-pane>
              <el-tab-pane label="教师" name="教师"></el-tab-pane>
              <el-form
                ref="form"
                :model="form"
                label-position="top"
                class="login-form-box"
              >
                <el-form-item label="账号:">
                  <el-input
                    v-model="form.username"
                    placeholder="请输入学号"
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码:">
                  <el-input
                    type="password"
                    v-model="form.password"
                    placeholder="请输入密码"
                  ></el-input>
                </el-form-item>
                <el-form-item class="button">
                  <a @click="showBox = 'forgetPassword'">忘记密码?</a>
                  <el-button
                    type="primary"
                    @click="onSubmit"
                    class="submit"
                    :loading="loadStatus"
                    >登录</el-button
                  >
                  <a @click="showBox = 'register'">立即注册</a>
                </el-form-item>
              </el-form>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="8" class="register-form" v-if="showBox === 'register'">
          <el-form ref="registerForm" label-position="top" class="register-box">
            <span class="back-icon" @click="showBox = 'login'"
              ><i class="el-icon-back"></i>返回</span
            >
            <el-form-item label="请问您是？" class="select-btn">
              <el-button @click="showBox = 'student'">学生</el-button>
              <el-button @click="showBox = 'teacher'">教师</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8" class="student-form" v-if="showBox === 'student'">
          <el-form
            ref="student"
            :model="studentForm"
            label-position="left"
            class="student-box"
            :rules="rules"
          >
            <span class="back-icon" @click="back"
              ><i class="el-icon-back"></i>返回</span
            >
            <el-form-item label="学号:" prop="stuNumber">
              <el-input
                v-model="studentForm.stuNumber"
                placeholder="请输入学号"
                @blur="searchStudentByStuNumber(studentForm.stuNumber)"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名:" prop="username">
              <el-input
                :disabled="true"
                v-model="studentForm.username"
                placeholder="请输入学号以检索"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号:" prop="phoneNumber">
              <el-input
                v-model="studentForm.phoneNumber"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input
                type="password"
                v-model="studentForm.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="surePassword1">
              <el-input
                type="password"
                v-model="studentForm.surePassword1"
                placeholder="请确认密码"
              ></el-input>
            </el-form-item>
            <el-form-item style="width: 50%; margin: 0 auto">
              <el-button
                type="primary"
                class="register-btn"
                @click="studentRegister"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8" class="teacher-form" v-if="showBox === 'teacher'">
          <el-form
            ref="teacher"
            :model="teacherForm"
            label-position="left"
            class="teacher-box"
            :rules="rules"
          >
            <span class="back-icon" @click="back"
              ><i class="el-icon-back"></i>返回</span
            >
            <el-form-item label="工号:" prop="employeeNumber">
              <el-input
                v-model="teacherForm.employeeNumber"
                placeholder="请输入工号"
                @blur="searchTeacherByemNumber(teacherForm.employeeNumber)"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名:" prop="username">
              <el-input
                disabled="true"
                v-model="teacherForm.username"
                placeholder="请输入工号以检索"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号:" prop="phoneNumber">
              <el-input
                v-model="teacherForm.phoneNumber"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input
                type="password"
                v-model="teacherForm.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="surePassword2">
              <el-input
                type="password"
                v-model="surePassword2"
                placeholder="请确认密码"
              ></el-input>
            </el-form-item>
            <el-form-item style="width: 50%; margin: 0 auto">
              <el-button
                type="primary"
                class="register-btn"
                @click="teacherRegister"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
        <el-col
          :span="8"
          class="changePwd-form"
          v-if="showBox === 'forgetPassword'"
        >
          <el-form
            ref="changePassword"
            :model="changeForm"
            label-position="left"
            class="changePwd-box"
            :rules="rules"
          >
            <span class="back-icon" @click="back2"
              ><i class="el-icon-back"></i>返回</span
            >
            <el-form-item label="身份" prop="identify">
              <el-select
                v-model="changeForm.identify"
                placeholder="请选择"
                prop="identify"
              >
                <el-option label="学生" value="学生"></el-option>
                <el-option label="教师" value="教师"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="学号"
              prop="username"
              v-if="changeForm.identify !== '教师'"
            >
              <el-input
                v-model="changeForm.username"
                placeholder="请输入您的学号"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="工号"
              prop="username"
              v-if="changeForm.identify === '教师'"
            >
              <el-input
                v-model="changeForm.username"
                placeholder="请输入您的工号"
              ></el-input>
            </el-form-item>
            <el-form-item label="旧密码" prop="password">
              <el-input
                v-model="changeForm.password"
                type="password"
                placeholder="请输入旧密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input
                v-model="changeForm.newPassword"
                type="password"
                placeholder="请输入新密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="surePassword3">
              <el-input
                v-model="changeForm.surePassword3"
                type="password"
                placeholder="请再次输入新密码"
              ></el-input>
            </el-form-item>
            <el-form-item style="width: 50%; margin: 0 auto">
              <el-button type="primary" @click="changePassword"
                >确认修改</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </transition>
    </el-row>
  </div>
</template>

<script>
import {
  changePwd,
  searchStudent,
  searchTeacher,
  stuRegister,
  teachRegister,
  userLogin
} from "../../service/login";
import url from "../../utils/url";

export default {
  name: "login",
  data() {
    const validatePassword1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.studentForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.teacherForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const validatePassword3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.changeForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        password: "",
        identify: "学生"
      },
      identify: "学生",
      bgImg: require("../../assets/images/bgImg.jpeg"),
      loadStatus: false,
      registerUrl: url + "/register",
      showBox: "login",
      studentForm: {
        stuNumber: "",
        username: "",
        password: "",
        phoneNumber: "",
        surePassword1: ""
      },
      teacherForm: {
        employeeNumber: "",
        username: "",
        password: "",
        phoneNumber: ""
      },
      changeForm: {
        username: "",
        identify: "",
        password: "",
        newPassword: "",
        surePassword3: ""
      },
      surePassword2: "",
      rules: {
        stuNumber: [
          { required: true, message: "请输入学号!", trigger: "blur" }
        ],
        identify: [{ required: true, message: "请选择身份!", trigger: "blur" }],
        employeeNumber: [
          { required: true, trigger: "blur", message: "请输入工号!" }
        ],
        username: [{ required: true, message: "请输入账号!", trigger: "blur" }],
        phoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            required: true,
            pattern: /^1[0-9]{10}$/,
            message: "手机号码格式错误",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            required: true,
            pattern: /^(\w){6,20}$/,
            message: "请输入6-20位由英文字符和数字构成的密码",
            trigger: "blur"
          }
        ],
        newPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            required: true,
            pattern: /^(\w){6,20}$/,
            message: "请输入6-20位由英文字符和数字构成的密码",
            trigger: "blur"
          }
        ],
        surePassword1: [
          { required: true, validator: validatePassword1, trigger: "blur" }
        ],
        surePassword2: [
          { required: true, validator: validatePassword2, trigger: "blur" }
        ],
        surePassword3: [
          { required: true, validator: validatePassword3, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 登录
    onSubmit() {
      this.loadStatus = true;
      userLogin(this.form).then((res) => {
        this.loadStatus = false;
        if (res.status === 200) {
          this.$message.success('登陆成功');
          localStorage.setItem('username', res.result.username);
          localStorage.setItem('information', JSON.stringify(res.result));
          localStorage.setItem('userIdentify', this.identify);
          this.$router.push("/home");
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 切换登录身份
    handleClick(tab, event) {
      this.form.identify = tab.label;
    },
    // 返回
    back() {
      this.showBox = "register";
      this.studentForm = {};
      this.teacherForm = {};
    },
    back2() {
      this.showBox = "login";
      this.changeForm = {};
    },
    // 通过学号获取学生信息
    searchStudentByStuNumber(val) {
      if (val !== "") {
        searchStudent(val).then((res) => {
          if (res.status === 200) {
            this.studentForm.username = res.result;
          } else {
            this.studentForm.username = "";
            this.$message.warning(res.message);
          }
        });
      }
    },
    searchTeacherByemNumber(val) {
      if (val !== "") {
        searchTeacher(val).then((res) => {
          if (res.status === 200) {
            this.teacherForm.username = res.result;
          } else {
            this.teacherForm.username = "";
            this.$message.warning(res.message);
          }
        });
      }
    },
    // 学生注册
    studentRegister() {
      this.$refs.student.validate((valid) => {
        if (valid) {
          stuRegister(this.studentForm).then((res) => {
            if (res.status === 200) {
              this.$message.success(res.result + ",快去登录吧");
              this.showBox = "login";
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    // 教师注册
    teacherRegister() {
      this.$refs.teacher.validate((valid) => {
        if (valid) {
          teachRegister(this.studentForm).then((res) => {
            if (res.status === 200) {
              this.$message.success(res.result + ",快去登录吧");
              this.showBox = "login";
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    // 修改密码
    changePassword() {
      this.$refs.changePassword.validate((valid) => {
        if (valid) {
          changePwd(this.changeForm).then((res) => {
            if (res.status === 200) {
              this.showBox = "login";
              this.$message.success(res.result);
            } else {
              this.$message.warning(res.message);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "index";
</style>
