<template>
  <div class="player">
    <video-player class="video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  style="object-fit:fill"
                  :options="playerOptions"
                  :x5-video-player-fullscreen="true"
                  @pause="onPlayerPause($event)"
                  @play="onPlayerPlay($event)"
                  @click="fullScreen"
    >
    </video-player>
  </div>
</template>

<script>
import VideoPlayer from 'vue-video-player';
import Vue from 'vue';
require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');
Vue.use(VideoPlayer);

export default {
  name: 'index',
  props: {
    videoUrl: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: this.videoUrl // url地址
        }],
        hls: true,
        poster: this.imageUrl, // 你的封面地址
        width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 时间分割线
          durationDisplay: true, // 总时间
          remainingTimeDisplay: false, // 剩余播放时间
          progressControl: true, // 进度条
          fullscreenToggle: true // 全屏按钮
        }
      }
    };
  },
  methods: {
    fullScreen () {
      const player = this.$refs.videoPlayer.player;
      player.requestFullscreen(); // 调用全屏api方法
      player.isFullscreen(true);
      player.play();
    },
    onPlayerPlay (player) {
      player.play();
    },
    onPlayerPause (player) {
      // alert("pause");
    }
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player; // 自定义播放
    }
  }
};
</script>

<style scoped lang="scss">
@import "index";
</style>
