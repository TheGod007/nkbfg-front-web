<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable import/no-extraneous-dependencies -->
<!-- eslint-disable no-else-return -->
<!-- eslint-disable no-undef -->
<!-- eslint-disable prefer-template -->
<script setup lang="ts" name="myDialog">
import { ref, reactive, defineEmits, computed } from 'vue'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { VideoPlayer } from '@videojs-player/vue'
import { Movie } from '@/api/media/type'
import { useUserStore } from '@/store/user'
import { deleteFile } from '@/api/upFile/upFile'
import { save, update } from '@/api/media/movie'

import 'video.js/dist/video-js.css'

// 视频播放器配置
const playerOptions = ref<any>({
  width: 320,
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

const $emit = defineEmits(['save'])

function initMovie() {
  return {
    title: '',
    description: '',
    path: '',
    id: '',
    uid: '',
    reason: '',
    state: 0,
    stateStr: '',
    gmtmodified: '',
    gmtcreate: '',
    username: ''
  }
}
const userStore = useUserStore()
const movie = ref<Movie>(initMovie())
const uploadisDisabled = ref<boolean>(false)
const dialogVisible = ref(false)
const title = computed({
  set() {},
  get() {
    return movie.value.id ? '修改视频' : '上传视频'
  }
})
const movieSrc = computed({
  set() {},
  get() {
    return movie.value.path ? 'https://www.nkbfg.asia/api/media' + movie.value.path : ''
  }
})

const headers = {
  Authorization: 'Bearer ' + userStore.token
}

const formInstance = ref<FormInstance>()
const rules = reactive<FormRules<Movie>>({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 3, message: '标题最少3位字符', trigger: 'blur' },
    { max: 64, message: '标题最多64位字符', trigger: 'blur' }
  ],
  description: [{ max: 256, message: '描述最多256位字符', trigger: 'blur' }],
  path: [{ required: true, message: '请上传视频', trigger: 'blur' }]
})

function cacel() {
  movie.value.path = '' // 避免资源使用中，后端删除文件报错
  const path = localStorage.getItem('movieUplodTemp')
  if (path) {
    deleteFile(path)
    localStorage.removeItem('movieUplodTemp')
  }
  if (movie.value.id) {
    movie.value = initMovie()
  }

  dialogVisible.value = false
}

function confrim() {
  if (!formInstance.value) return
  formInstance.value.validate((valid) => {
    if (valid) {
      dialogVisible.value = false
      if (movie.value.id) {
        // 修改视频
        movie.value.state = 0 // 修改后需要重新审核
        update(movie.value).then(() => {
          $emit('save')
          ElMessage.success('修改成功')
          movie.value = initMovie()
        })
      } else {
        // 新建视频
        save(movie.value).then(() => {
          $emit('save')
          ElMessage.success('保存成功')
          // 删除零时文件和清空缓存
          localStorage.removeItem('movieUplodTemp')
          movie.value = initMovie()
        })
      }
    }
  })
}

function setDialogVisible(visible: boolean) {
  dialogVisible.value = visible
}
const handleAvatarSuccess: UploadProps['onSuccess'] = async (response) => {
  if (response.code === 200) {
    movie.value.path && (await deleteFile(movie.value.path))
    movie.value.path = response.data
    ElMessage.success('视频上传成功')
    if (movie.value.id) {
      // 修改文件 // 修改后需要重新审核
      movie.value.state = 0
      update(movie.value)
    } else {
      // 将零时文件记录，刷新或取消时删除
      localStorage.setItem('movieUplodTemp', response.data)
    }
  } else {
    ElMessage.error(response.message)
  }
  uploadisDisabled.value = false // 上传成功让上传组件可使用
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // - MP4：video/mp4
  // - FLV：video/x-flv
  // - M3U8：application/x-mpegURL
  // - RTMP：rtmp/flv
  // - MP3：audio/mpeg
  // - OGG：audio/ogg
  // - WebM：video/webm
  if (
    rawFile.type === 'video/mp4' ||
    rawFile.type === 'video/x-flv' ||
    rawFile.type === 'application/x-mpegURL' ||
    rawFile.type === 'rtmp/flv' ||
    rawFile.type === 'audio/mpeg' ||
    rawFile.type === 'audio/ogg' ||
    rawFile.type === 'video/webm'
  ) {
    if (rawFile.size / 1024 / 1024 > 1024) {
      ElMessage.error('视频最大支持1G!')
      return false
    }
    ElMessage.success('上传中，请稍等')
    uploadisDisabled.value = true // 上传中上上传组件不可使用
    return true
  } else {
    ElMessage.error('只支持mp4、flv、m3u8、rtmp、mp3、ogg、webm类型的视频')
    return false
  }
}

const handleAvatarError: UploadProps['onError'] = () => {
  uploadisDisabled.value = false // 上传失败也让上传组件可使用
  ElMessage.error('服务器出错')
}
defineExpose({ setDialogVisible, movie })
</script>

<template>
  <div class="myDialog">
    <el-dialog v-model="dialogVisible" :show-close="false" :title="title" :close-on-click-modal="false" width="16rem">
      <span>
        <el-form ref="formInstance" width="100%" :model="movie" :rules="rules" label-width="3rem" class="ruleForm" size="default" status-icon>
          <el-form-item prop="title" label="请输入标题：">
            <el-input v-model="movie.title" style="width: 13.32rem" placeholder="请输入3-64位字符的标题" clearable />
          </el-form-item>
          <el-form-item prop="description" label="请输入描述：">
            <el-input v-model="movie.description" style="width: 13.32rem" type="textarea" rows="5" placeholder="可选：请输描述，最多能输入256个字符" clearable />
          </el-form-item>
          <el-form-item prop="path" label="请上传视频：">
            <el-upload
              class="avatar-uploader"
              action="https://www.nkbfg.asia/api/media/upFile/uploadMovie"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarError"
              :before-upload="beforeAvatarUpload"
              :headers="headers"
              :disabled="uploadisDisabled"
            >
              <div v-show="movieSrc" class="avatar">
                <video-player :src="movieSrc" :options="playerOptions" :volume="0.6" />
              </div>
              <el-icon v-show="!movieSrc" class="avatar-uploader-icon">
                <icon-ep-plus />
              </el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
      </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cacel">取消</el-button>
          <el-button type="primary" @click="confrim">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.myDialog {
  .avatar-uploader {
    border: 0.02rem dashed var(l-border-color);
    border-radius: 0.12rem;
    cursor: pointer;
    border-color: #8c939d;
    background-color: #f9faf9;
    width: 6.4rem;
    .avatar {
      width: 6.4rem;
      height: 3.6rem;
      display: block;
    }
    .avatar-uploader-icon {
      font-size: 0.56rem;
      color: #8c939d;
      width: 6.4rem;
      height: 3.6rem;
      text-align: center;
    }
  }
}
</style>
