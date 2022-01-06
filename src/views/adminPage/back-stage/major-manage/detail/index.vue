<template>
  <div>
    <el-main>
      <el-form label-position="top" label-width="120px" :model="tableForm" class="form-box" ref="form" :rules="rules">
        <el-form-item label="专业名称：" prop="majorName">
          <el-input v-model="tableForm.majorName"></el-input>
        </el-form-item>
        <el-form-item label="所属学院：" prop="affiliatedCollegeCode">
          <el-select v-model="tableForm.affiliatedCollegeCode" placeholder="请选择" @change="getValue">
            <el-option
              v-for="item in collegeList"
              :key="item.id"
              :label="item.collegeName"
              :value="item.collegeCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业代码：" prop="majorCode">
          <el-input v-model="tableForm.majorCode" :disabled="!tableForm.affiliatedCollegeCode" placeholder="请先选择所属学院"></el-input>
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
import api from '../../../../../service/major'
import detailMixin from '../../../../../components/detailMixin'

export default {
  name: 'index',
  mixins: [detailMixin],
  data () {
    const isNum = (rule, value, callback) => {
      const age = /^[0-9]*$/
      if (!age.test(value)) {
        callback(new Error('编码必须为纯数字，正确编码格式--例:32000101xx'))
      } else {
        callback()
      }
    }
    return {
      tableForm: {
        id: '',
        majorName: '',
        majorCode: '',
        affiliatedCollegeCode: ''
      },
      collegeList: [],
      updateApi: api.saveMajor,
      addApi: api.saveMajor,
      detailApi: api.getMajorById,
      rules: {
        majorName: [{required: true, trigger: 'blur', message: '必填项'}],
        majorCode: [{required: true, trigger: 'blur', pattern: /^[0-9]{8}$/, message: '正确编码格式--例:320001xx'},
          {validator: isNum, trigger: 'blur'}],
        affiliatedCollegeCode: [{required: true, trigger: 'blur', message: '必填项'}]
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
            this.update(params, '/major-manage')
          } else {
            this.add(params, '/major-manage')
          }
        } else {
          this.$message.warning({message: '请查看信息是否填写完整！'})
        }
      })
    },
    getCollegeSelect () {
      api.getCollegeList({collegeName: '', page: 0, size: 100}).then(res => {
        this.collegeList = res.result.content
      })
    },
    getValue () {
      this.tableForm.majorCode = this.tableForm.affiliatedCollegeCode
    }
  },
  created () {
    this.getCollegeSelect()
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
