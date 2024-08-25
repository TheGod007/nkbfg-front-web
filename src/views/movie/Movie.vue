<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable no-labels -->
<!-- eslint-disable no-extra-label -->
<script setup lang="ts" name="movie">
import { ref, reactive, onBeforeMount } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import { useRouter } from 'vue-router'
import { getPageAndCondition } from '@/api/media/movie'
import { Movie } from '@/api/media/type'
import { Page } from '@/api/type'
import { getByIds } from '@/api/user/user'
import 'video.js/dist/video-js.css'
import { UserInfo } from '@/api/user/type'

let users: UserInfo[] = []
const router = useRouter()
const playerOptions = ref<any>({
  // width: document.documentElement.clientWidth, //播放器宽度
  playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
  autoplay: false, // 如果true,浏览器准备好时开始回放。
  muted: false, // 默认情况下将会消除任何音频。
  loop: false, // 导致视频一结束就重新开始。
  preload: 'metadata', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
  language: 'zh-CN',
  ASPectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
  fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
  notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
  controls: false,
  controlBar: {
    timeDivider: false,
    durationDisplay: false,
    remainingTimeDisplay: false,
    fullscreenToggle: false // 全屏按钮
  }
})

const page = reactive<Page>({
  pageNo: 1,
  pageSize: 18,
  uid: '',
  state: 2
})
const total = ref()
const tableData = ref<Movie[]>()

async function pageQuery() {
  const moviePage = await getPageAndCondition(page)
  const uids = moviePage.records.map((movie) => {
    return movie.uid
  })
  if (uids && uids.length) {
    users = await getByIds(uids)
  }
  moviePage.records.forEach((movie) => {
    users.forEach((user) => {
      if (movie.uid === user.id) {
        movie.username = user.username
      }
    })
    movie.reason = ''
  })
  tableData.value = moviePage.records
  total.value = moviePage.total
}

onBeforeMount(() => {
  pageQuery()
})

function itemClick(movie: Movie) {
  router.push({ path: '/moviedetail', query: { ...movie } })
}
</script>

<template>
  <div class="movie">
    <el-row>
      <el-col :span="4" v-for="movie in tableData" :key="movie.id" style="margin-bottom: 0.2rem">
        <div class="item" @click="itemClick(movie)">
          <video-player class="itemSrc" :src="'https://www.nkbfg.asia/api/media' + movie.path" :options="playerOptions" :volume="0.6" />
          <div class="title" v-text="movie.title"></div>
          <div class="authandtime">
            <span class="auth" v-text="movie.username"></span>
            <span class="time" v-text="movie.gmtmodified"></span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      v-model:current-page="page.pageNo"
      v-model:page-size="page.pageSize"
      :page-sizes="[18]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="pageQuery"
      @current-change="pageQuery"
    />
  </div>
</template>

<style lang="scss" scoped>
.movie {
  user-select: none;
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #f9faf9;

  .item {
    cursor: pointer;
    width: 100%;
    text-align: center;
    .title {
      text-align: left;
      margin-left: 0.2rem;
    }
    :deep(.itemSrc) {
      background-color: #f9faf9;
      box-sizing: border-box;
      width: 97%;
    }
    .authandtime {
      width: 100%;
      position: relative;
      text-align: start;
      .auth {
        margin-left: 0.2rem;
      }
      .time {
        right: 0.5rem;
        position: absolute;
      }
    }
  }

  :deep(.el-pagination) {
    position: absolute;
    bottom: 0rem;
  }
}
</style>
