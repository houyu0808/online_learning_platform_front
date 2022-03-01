<template>
  <el-main class="main-box">
    <div class="operation-box">
      <el-button type="primary" @click="addOrEdit('/class-manage/class-manage-detail')"
        >新建</el-button
      >
      <el-button @click="batchDelete(selectedList, true, message)"
        >批量删除</el-button
      >
    </div>
    <div class="search-box">
      <el-input
        class="search-input"
        v-model="searchForm.className"
        placeholder="请输入学院名称"
      ></el-input>
      <el-button type="primary" @click="getList"
        ><i class="el-icon-search"></i>&nbsp;查询</el-button
      >
      <el-button @click="reset({ className: '' })">重置</el-button>
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
        prop="className"
        sortable="custom"
        label="班级名称"
      ></el-table-column>
      <el-table-column
        prop="classCode"
        sortable="custom"
        label="班级编号"
      ></el-table-column>
      <el-table-column
        prop="affiliatedCollegeName"
        sortable="custom"
        label="所属学院"
      ></el-table-column>
      <el-table-column
        prop="affiliatedMajorName"
        sortable="custom"
        label="所属专业"
      ></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template v-slot="{ row }">
          <el-button
            type="text"
            class="jh-button-wider"
            @click="addOrEdit('/class-manage/class-manage-detail', row.id)"
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
import api from "../../../../service/class";
const sortKeyMap = {};

export default {
  name: "index",
  mixins: [getListAndDelete],
  data() {
    return {
      tableData: [],
      searchForm: {
        className: "",
        sort: "",
      },
      message: "删除班级将会删除所有相关信息，确认删除吗？",
      getListApi: api.getClassPage,
      deleteApi: api.deleteClass,
      sortKeyMap: sortKeyMap,
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import "index";
</style>
