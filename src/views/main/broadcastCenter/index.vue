<template>
  <div class="center">
    <div class="live">
      <div id="dplayer"></div>
    </div>
  </div>
</template>

<script>
import DPlayer from 'dplayer';
import Hls from 'hls.js';

export default {
  name: 'index',
  data () {
    return {
      dp: null
    };
  },
  methods: {
    live(){
      this.dp = new DPlayer({
        live: true,
        container: document.getElementById('dplayer'),
        video: {
          url: 'rtmp://160319.livepush.myqcloud.com/live/live?txSecret=72bbe0f58fe217966f7f8fe201d4cbcb&txTime=621F21B1', // 示例地址
          type: 'rtmp',
          customType: {
            customHls: function (video, player) {
              const hls = new Hls();
              hls.loadSource(video.src);
              hls.attachMedia(video);
            },
          },
        },
      });
    }
  },
  mounted () {
    this.live();
  }
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
