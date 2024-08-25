<!-- eslint-disable prefer-template -->
<!-- eslint-disable no-else-return -->
<script setup lang="ts" name="upAvatar">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { useUserStore } from '@/store/user'
import { deleteFile } from '@/api/upFile/upFile'
import { saveAvatar } from '@/api/user/user'

const userStore = useUserStore()

const imageSrc = ref(userStore.userInfo!.avatar ? 'https://www.nkbfg.asia/api/media' + userStore.userInfo!.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

const headers = {
  Authorization: 'Bearer ' + userStore.token
}

const handleAvatarSuccess: UploadProps['onSuccess'] = async (response) => {
  if (response.code === 200) {
    userStore.userInfo!.avatar && (await deleteFile(userStore.userInfo!.avatar))
    userStore.userInfo!.avatar = response.data
    imageSrc.value = 'https://www.nkbfg.asia/api/media' + response.data
    await saveAvatar(response.data)
    // userStore.fetchprofile()  不用刷新，因为修改的数据都是双向绑定的
    ElMessage.success('头像上传成功')
  } else {
    ElMessage.error(response.message)
  }
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type === 'image/jpeg' || rawFile.type === 'image/png' || rawFile.type === 'image/gif') {
    if (rawFile.size / 1024 / 1024 > 5) {
      ElMessage.error('图片最大支持5M!')
      return false
    }
    return true
  } else {
    ElMessage.error('只支持jpg、png、gif类型的图片')
    return false
  }
}

const handleAvatarError: UploadProps['onError'] = () => {
  ElMessage.error('服务器出错')
}
</script>

<template>
  <div class="container">
    <el-upload
      class="avatar-uploader"
      action="https://www.nkbfg.asia/api/media/upFile/uploadAvatar"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :on-error="handleAvatarError"
      :before-upload="beforeAvatarUpload"
      :headers="headers"
    >
      <img v-show="userStore.userInfo!.avatar" :src="imageSrc" class="avatar" />
      <el-icon v-show="!userStore.userInfo!.avatar" class="avatar-uploader-icon">
        <icon-ep-plus />
      </el-icon>
    </el-upload>
    <div v-show="userStore.userInfo!.avatar">点击上图可更换头像</div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100vh;

  .avatar-uploader {
    border: 0.02rem dashed var(l-border-color);
    border-radius: 0.12rem;
    cursor: pointer;
    border-color: #8c939d;
    background-color: #fff;
    width: 3.56rem;
    .avatar {
      width: 3.56rem;
      height: 3.56rem;
      display: block;
    }
    .avatar-uploader-icon {
      font-size: 0.56rem;
      color: #8c939d;
      width: 3.56rem;
      height: 3.56rem;
      text-align: center;
    }
  }
}
</style>
