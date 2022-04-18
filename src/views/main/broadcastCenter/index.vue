<template>
  <div class="container">
    <div v-for="(item,index) in broadcastList" :key="index" :class="'card-item broad-item' + (index % 5)" v-if="broadcastList.length !== 0" @click="enterBroad(item.id)">
      <div class="head-image"><img :src="item.headImgUrl" alt=""></div>
      <div class="introduce">
        <div class="broad-title">{{item.broadcastTitle}}</div>
        <div class="broad-name">{{item.username}}的直播间</div>
        <div class="room-num">房间号：<span>{{item.broadcastNumber}}</span></div>
      </div>
    </div>
    <div class="notice" v-if="broadcastList.length === 0">
      暂时没有老师在进行直播哦,请刷新页面重试
    </div>
  </div>
</template>

<script>
import api from '../../../service/broadcast';

export default {
  name: 'index',
  data () {
    return {
      broadcastList: []
    };
  },
  methods: {
    getBroadcastList(){
      api.getBroadcastList().then(res => {
        this.broadcastList = res.result;
      });
    },
    enterBroad(id){
      this.$router.push({ path: '/learning-platform/broadcast-page', query: { id: id } });
    }
  },
  created () {
    this.getBroadcastList();
  }
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
