<template>
  <el-main class="main-box">
    <div class="operation-box">
      <el-button type="primary" @click="addOrEdit('/teacher-manage/teacher-manage-detail')"
        >新建</el-button
      >
      <el-button @click="batchDelete(selectedList, true, message)"
        >批量删除</el-button
      >
    </div>
    <div class="search-box">
      <el-input
        class="search-input"
        v-model="searchForm.username"
        placeholder="请输入教师姓名"
      ></el-input>
      <el-button type="primary" @click="getList"
        ><i class="el-icon-search"></i>&nbsp;查询</el-button
      >
      <el-button @click="reset({ username: '' })">重置</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      show-overflow-tooltip
      highlight-current-row
      @sort-change="sortChange"
      @selection-change="handleSelect"
      tooltip-effect="light"
      stripe
      fit
      style="width: 100%; height: auto; overflow: auto"
    >
      <el-table-column
        width="60"
        type="selection"
        align="center"
      ></el-table-column>
      <el-table-column
        width="60"
        prop="id"
        sortable="custom"
        label="id"
      ></el-table-column>
      <el-table-column
        prop="username"
        sortable="custom"
        label="姓名"
      ></el-table-column>
      <el-table-column
        prop="sex"
        sortable="custom"
        label="性别"
      ></el-table-column>
      <el-table-column
        prop="employeeNumber"
        sortable="custom"
        label="工号"
      ></el-table-column>
      <el-table-column
        prop="phoneNumber"
        sortable="custom"
        label="电话号码"
      ></el-table-column>
      <el-table-column
        prop="affiliatedCollegeName"
        sortable="custom"
        label="所属学院"
      ></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template v-slot="{ row }">
          <el-button
            type="text"
            class="jh-button-wider"
            @click="addOrEdit('/teacher-manage/teacher-manage-detail', row.id)"
            >修改</el-button
          >
          <el-button
            type="text"
            class="jh-button-wider"
            @click="batchDelete([row], false, message)"
            >删除</el-button
          >
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
  </el-main>
</template>

<script>
import getListAndDelete from "../../../../components/getListAndDelete";
import api from "../../../../service/teacher";
const sortKeyMap = {};

export default {
  name: 'index',
  mixins: [getListAndDelete],
  data() {
    return {
      tableData: [],
      searchForm: {
        username: '',
        sort: ""
      },
      message: "删除教师将会删除所有相关信息，确认删除吗？",
      getListApi: api.getTeacherPage,
      deleteApi: api.deleteTeacher,
      sortKeyMap: sortKeyMap
    };
  },
  methods: {}
};
</script>

<style scoped lang="scss">
@import "index";
</style>
