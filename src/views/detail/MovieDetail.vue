<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts" name="movieDetail">
import { VideoPlayer } from '@videojs-player/vue'
import { ref, toRefs } from 'vue'
import 'video.js/dist/video-js.css'
import { useRoute } from 'vue-router'

const route = useRoute()
const { path, title, description, username, gmtmodified } = toRefs(route.query)
const playerOptions = ref<any>({
  // width: document.documentElement.clientWidth, //播放器宽度
  playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
  autoplay: true, // 如果true,浏览器准备好时开始回放。
  muted: false, // 默认情况下将会消除任何音频。
  loop: false, // 导致视频一结束就重新开始。
  preload: 'metadata', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
  language: 'zh-CN',
  ASPectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
  fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
  notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
  controls: true,
  controlBar: {
    timeDivider: true,
    durationDisplay: true,
    remainingTimeDisplay: false,
    fullscreenToggle: true // 全屏按钮
  }
})
</script>

<template>
  <div class="movieDetail">
    <div class="mycontainer">
      <div class="mytitle" v-text="title"></div>
      <div class="video_div">
        <video-player :src="'https://www.nkbfg.asia/api/media' + path" :options="playerOptions" :volume="0.6" />
      </div>
      <div class="authtime">
        <span class="auth" v-text="username"></span>
        <span class="time" v-text="gmtmodified"></span>
      </div>
      <div class="description" v-text="description"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movieDetail {
  padding: 0.2rem;
  width: 100%;
  height: 100%;
  .mycontainer {
    font-size: 0.4rem;
    .video_div {
      width: 19.2rem;
      cursor: pointer;
      margin-bottom: 0.2rem;
    }
    .mytitle {
      margin-bottom: 0.2rem;
    }
    .authtime {
      width: 19.2rem;
      position: relative;
      margin-bottom: 0.2rem;
      .time {
        position: absolute;
        right: 0.1rem;
      }
    }
    .description {
      width: 19.2rem;
    }
  }
}
</style>
