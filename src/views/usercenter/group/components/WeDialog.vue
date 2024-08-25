<!-- eslint-disable prefer-template -->
<!-- eslint-disable no-else-return -->
<!-- eslint-disable no-undef -->
<script setup lang="ts" name="myDialog">
import { ref, reactive, defineEmits, computed } from 'vue'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { Picture } from '@/api/media/type'
import { useUserStore } from '@/store/user'
import { deleteFile } from '@/api/upFile/upFile'
import { save, update } from '@/api/media/wegroup'

const $emit = defineEmits(['save'])

function initPicture() {
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

const wegroup = ref<Picture>(initPicture())
const dialogVisible = ref(false)
const title = computed({
  set() {},
  get() {
    return wegroup.value.id ? '修改微信群' : '上传微信群'
  }
})
const formInstance = ref<FormInstance>()
const rules = reactive<FormRules<Picture>>({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 3, message: '标题最少3位字符', trigger: 'blur' },
    { max: 64, message: '标题最多64位字符', trigger: 'blur' }
  ],
  description: [{ max: 256, message: '描述最多256位字符', trigger: 'blur' }],
  path: [{ required: true, message: '上传群二维码', trigger: 'blur' }]
})

function cacel() {
  wegroup.value.path = '' // 避免资源使用中，后端删除文件报错
  const path = localStorage.getItem('wegroupUplodTemp')
  if (path) {
    deleteFile(path)
    localStorage.removeItem('wegroupUplodTemp')
  }
  if (wegroup.value.id) {
    wegroup.value = initPicture()
  }

  dialogVisible.value = false
}

function confrim() {
  if (!formInstance.value) return
  formInstance.value.validate((valid) => {
    if (valid) {
      dialogVisible.value = false
      if (wegroup.value.id) {
        // 修改微信群
        wegroup.value.state = 0 // 修改后需要重新审核
        update(wegroup.value).then(() => {
          $emit('save')
          ElMessage.success('修改成功')
          wegroup.value = initPicture()
        })
      } else {
        // 新建微信群
        save(wegroup.value).then(() => {
          $emit('save')
          ElMessage.success('保存成功')
          // 删除零时文件和清空缓存
          localStorage.removeItem('wegroupUplodTemp')
          wegroup.value = initPicture()
        })
      }
    }
  })
}

function setDialogVisible(visible: boolean) {
  dialogVisible.value = visible
}
const userStore = useUserStore()

const imageSrc = computed({
  set() {},
  get() {
    return wegroup.value.path ? 'https://www.nkbfg.asia/api/media' + wegroup.value.path : ''
  }
})

const headers = {
  Authorization: 'Bearer ' + userStore.token
}

const handleAvatarSuccess: UploadProps['onSuccess'] = async (response) => {
  if (response.code === 200) {
    wegroup.value.path && (await deleteFile(wegroup.value.path))
    wegroup.value.path = response.data
    ElMessage.success('微信群上传成功')
    if (wegroup.value.id) {
      // 修改文件 // 修改后需要重新审核
      wegroup.value.state = 0
      update(wegroup.value)
    } else {
      // 将零时文件记录，刷新或取消时删除
      localStorage.setItem('wegroupUplodTemp', response.data)
    }
  } else {
    ElMessage.error(response.message)
  }
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type === 'image/jpeg' || rawFile.type === 'image/png' || rawFile.type === 'image/gif') {
    if (rawFile.size / 1024 / 1024 > 5) {
      ElMessage.error('微信群最大支持5M!')
      return false
    }
    return true
  } else {
    ElMessage.error('只支持jpg、png、gif类型的微信群')
    return false
  }
}

const handleAvatarError: UploadProps['onError'] = () => {
  ElMessage.error('服务器出错')
}
defineExpose({ setDialogVisible, wegroup })
</script>

<template>
  <div class="myDialog">
    <el-dialog v-model="dialogVisible" :show-close="false" :title="title" :close-on-click-modal="false" width="16rem">
      <span>
        <el-form ref="formInstance" width="100%" :model="wegroup" :rules="rules" label-width="3rem" class="ruleForm" size="default" status-icon>
          <el-form-item prop="title" label="请输入标题：">
            <el-input v-model="wegroup.title" style="width: 13.32rem" placeholder="请输入3-64位字符的标题" clearable />
          </el-form-item>
          <el-form-item prop="description" label="请输入描述：">
            <el-input v-model="wegroup.description" style="width: 13.32rem" type="textarea" rows="5" placeholder="可选：请输描述，最多能输入256个字符" clearable />
          </el-form-item>
          <el-form-item prop="path" label="上传群二维码：">
            <el-upload
              class="avatar-uploader"
              action="https://www.nkbfg.asia/api/media/upFile/uploadPicture"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarError"
              :before-upload="beforeAvatarUpload"
              :headers="headers"
            >
              <img v-show="imageSrc" :src="imageSrc" class="avatar" />
              <el-icon v-show="!imageSrc" class="avatar-uploader-icon">
                <icon-ep-plus />
              </el-icon>
            </el-upload>
            <span class="uploader-warrn">
              <div>请上传清晰的微信群二维码，</div>
              <div>由于微信群二维码有效期是</div>
              <div>7天，网站将在7天后删除此</div>
              <div>条上传记录。若不想被删除，</div>
              <div>记得更新群二维码</div>
            </span>
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
  .uploader-warrn {
    margin-left: 0.4rem;
    color: #ffd04b;
    font-size: 0.32rem;
  }
}
</style>
