<template>
  <el-main class="main-box">
    <div class="operation-box">
      <el-button type="primary" @click="addOrEdit('/video-manage/video-manage-detail')"
        >新建</el-button
      >
      <el-button @click="batchDelete(selectedList, true, message)"
        >批量删除</el-button
      >
    </div>
    <div class="search-box">
      <el-input
        class="search-input"
        v-model="searchForm.name"
        placeholder="请输入视频名称"
      ></el-input>
      <el-button type="primary" @click="getList"
        ><i class="el-icon-search"></i>&nbsp;查询</el-button
      >
      <el-button @click="reset({ name: '' })">重置</el-button>
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
        prop="name"
        sortable="custom"
        label="视频名称"
      ></el-table-column>
      <el-table-column
        prop="videoCode"
        sortable="custom"
        label="视频编码"
      ></el-table-column>
      <el-table-column
        prop="imageUrl"
        sortable="custom"
        width="125px"
        label="课程视频"
      >
        <template v-slot="{ row }">
          <img
            :src="row.imageUrl"
            :alt="row.name"
            style="width: 100px; height: auto"
            @click="showVideo(row.imageUrl, row.videoUrl)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="belongCourseName"
        sortable="custom"
        label="所属课程"
      ></el-table-column>
      <el-table-column
        prop="belongTeacherName"
        sortable="custom"
        label="任课教师"
      ></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template v-slot="{ row }">
          <el-button
            type="text"
            class="jh-button-wider"
            @click="addOrEdit('/video-manage/video-manage-detail', row.id)"
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
    <el-dialog title="提示" :visible.sync="dialogVisible">
      <videoPlayer :image-url="imageUrl" :video-url="videoUrl"></videoPlayer>
    </el-dialog>
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
import getListAndDelete from '../../../../components/getListAndDelete';
import api from '../../../../service/video';
import videoPlayer from '../../../../components/video-player';
const sortKeyMap = {};

export default {
  name: 'index',
  mixins: [getListAndDelete],
  components: {
    videoPlayer
  },
  data() {
    return {
      tableData: [],
      searchForm: {
        name: '',
        sort: ''
      },
      message: '删除视频将会删除所有相关信息，确认删除吗？',
      getListApi: api.getVideoPage,
      deleteApi: api.deleteVideo,
      sortKeyMap: sortKeyMap,
      imageUrl: '',
      videoUrl: '',
      dialogVisible: false
    };
  },
  methods: {
    showVideo(imageUrl, videoUrl) {
      this.imageUrl = imageUrl;
      this.videoUrl = videoUrl;
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped lang="scss">
@import "index";
</style>
