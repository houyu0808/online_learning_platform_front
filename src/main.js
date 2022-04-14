// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VideoPlayer from 'vue-video-player';
import 'videojs-contrib-hls'; // 单是 RTMP 的话不需要第三方库，如果是 HLS 的话需要引入videojs-contrib-hls，看具体情况而定。
require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');

Vue.config.productionTip = false;
Vue.use(elementUI);
Vue.use(VideoPlayer);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
