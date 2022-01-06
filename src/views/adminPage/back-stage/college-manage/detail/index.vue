<template>
  <div>
    <el-main>
      <el-form label-position="top" label-width="120px" :model="tableForm" class="form-box" ref="form" :rules="rules">
        <el-form-item label="学院名称：" prop="collegeName">
          <el-input v-model="tableForm.collegeName"></el-input>
        </el-form-item>
        <el-form-item label="学院代码：" prop="collegeCode">
          <el-input v-model="tableForm.collegeCode"></el-input>
        </el-form-item>
      </el-form>
      <div class="button-box">
        <el-button type="primary" @click="save">{{ id ? '更新' : '创建' }}</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-main>
  </div>
</template>

<script>
import api from '../../../../../service/college'
import detailMixin from '../../../../../components/detailMixin'

export default {
  name: 'index',
  mixins: [detailMixin],
  data () {
    return {
      tableForm: {
        id: '',
        collegeName: '',
        collegeCode: ''
      },
      updateApi: api.saveCollege,
      addApi: api.saveCollege,
      detailApi: api.getCollegeById,
      rules: {
        collegeName: [{required: true, trigger: 'blur', message: '必填项'}],
        collegeCode: [{required: true, trigger: 'blur', message: '必填项'}]
      }
    }
  },
  methods: {
    save () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = {
            ...this.tableForm
          }
          if (this.id) {
            this.update(params, '/college-manage')
          } else {
            this.add(params, '/college-manage')
          }
        } else {
          this.$message.warning({message: '请查看信息是否填写完整！'})
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
