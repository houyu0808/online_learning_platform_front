<template>
  <div class="admin-page">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="18">
        <img :src="backImg" alt="" class="backImg" />
      </el-col>
      <el-col :span="6">
        <div class="admin-login">
          <img :src="logoImg" alt="" class="logoImg" />
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
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item class="button">
              <el-button
                type="primary"
                @click="onSubmit"
                class="submit"
                :loading="loadStatus"
                >登录</el-button
              >
            </el-form-item>
            <el-form-item class="back-button">
              <el-button class="back-homepage" @click="backHomepage" type="text">回到用户登录页面</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { adminLogin, validateToken } from "../../../service/login";

export default {
  name: "index",
  data() {
    return {
      logoImg: require("../../../assets/images/logo.png"),
      logoImg2: require("../../../assets/images/logo2.png"),
      backImg: require("../../../assets/images/backImg.png"),
      form: {
        username: "houyu",
        password: "houyu07181",
      },
      loadStatus: false,
    };
  },
  methods: {
    onSubmit() {
      this.loadStatus = true;
      adminLogin(this.form).then((res) => {
        if (res.status === 200) {
          this.$message.success(res.message);
          localStorage.setItem('username', res.result);
          this.$router.replace({
            path: "/college-manage",
            params: { username: this.form.username },
          });
        } else {
          this.$message.warning(res.message);
        }
        this.loadStatus = false;
      });
    },
    backHomepage() {
      this.$router.push('/');
    }
  },
  beforeCreate() {
    if (localStorage.getItem("token") !== null) {
      validateToken(localStorage.getItem("token")).then((res) => {
        if (res.message === "管理员") {
          this.$router.replace("/home");
        } else if (res.status === 500) {
          this.$message.warning(res.message);
        }
      });
    }
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
