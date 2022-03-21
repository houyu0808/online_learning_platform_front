<template>
  <div class="main-box">
    <div class="container">
      <el-tabs type="border-card" @tab-click="tabClick" value="name">
        <el-tab-pane v-for="(item,index) in tabList" :key="index" :label="item.label" :name="item.name">
          <el-row type="flex" class="main-body" justify="center">
            <el-col :span="24">
              <el-row class="left-box">
                <el-col :span="4" v-for="(item,index) in videoList" :key="index" :offset="index % 5 == 0 ? 0 : 1">
                  <el-card :body-style="{ padding: '0px' }" shadow="hover" @click.native="toVideoPage(item.id)">
                    <img :src="item.imageUrl" class="image-card">
                    <div class="title-author">
                      <span class="title">{{ item.name }}</span><br>
                      <span class="author">{{ item.belongTeacherName }}</span>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-footer class="page-footer">
        <div class="block">
          <el-pagination
            v-show="pageInfo.totalElements > 0"
            layout="prev, pager, next"
            :total="pageInfo.totalElements"
            :page-size="pageInfo.size"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </el-footer>
    </div>
  </div>

</template>

<script>
import api from "../../../service/mainPage";

export default {
  name: 'index',
  data () {
    return {
      searchInfo: '',
      videoList: [],
      pageInfo: {
        layout: 'total,prev,pager,next,sizes,jumper',
        pageSizes: [10, 20, 30, 40],
        page: 1,
        size: 20,
        totalElements: 0,
        totalPages: 0
      },
      tabList: [
        {
          label: '综合排序',
          name: 'name'
        },
        {
          label: '时间排序',
          name: 'created_time'
        },
        {
          label: '热度排序',
          name: 'click_times'
        }
      ]
    };
  },
  watch: {
    '$route' (to, from) {
      this.$router.go(0);
    }
  },
  methods: {
    searchVideo(){
      let params = {
        searchInfo: this.searchInfo,
        ...this.pageInfo
      };
      params.page = params.page - 1;
      delete params.totalElements;
      delete params.pageSizes;
      delete params.totalPages;
      delete params.layout;
      let that = this;
      api.searchVideo(params).then(res => {
        that.videoList = res.result.content;
      });
    },
    toVideoPage(id){
      this.$router.push({
        path: '/learning-platform/videoPlayPage',
        query: {
          id: id
        }
      });
    },
    handleCurrentChange(e) {
      this.pageInfo.page = e;
      this.getTaskList();
    },
    handleSizeChange(e) {
      this.pageInfo.size = e;
      this.getTaskList();
    },
    tabClick(e){
      let params = {
        searchInfo: this.searchInfo,
        ...this.pageInfo,
        sort: e.name === 'click_times' ? e.name + ',desc' : e.name
      };
      params.page = params.page - 1;
      delete params.totalElements;
      delete params.pageSizes;
      delete params.totalPages;
      delete params.layout;
      let that = this;
      api.searchVideo(params).then(res => {
        that.videoList = res.result.content;
      });
    }
  },
  created () {
    this.searchInfo = this.$route.query.searchInfo;
    this.searchVideo();
  }
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
