<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable prefer-template -->
<!-- eslint-disable no-else-return -->
<!-- eslint-disable no-undef -->
<script setup lang="ts" name="myDialog">
import { ref, reactive, defineEmits, computed } from 'vue'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { Picture } from '@/api/media/type'
import { useUserStore } from '@/store/user'
import { deleteFile } from '@/api/upFile/upFile'
import { save, update } from '@/api/media/qqgroup'

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

const qqgroup = ref<Picture>(initPicture())
const dialogVisible = ref(false)
const title = computed({
  set() {},
  get() {
    return qqgroup.value.id ? '修改QQ群' : '上传QQ群'
  }
})

const validateQQ = (_rule: any, value: any, callback: any) => {
  const reg = /^[1-9]\d{4,11}$/g
  const result = reg.exec(value)
  if (result == null) {
    callback(new Error('QQ群号格式错误,请重新输入'))
  } else {
    callback()
  }
}
const formInstance = ref<FormInstance>()
const rules = reactive<FormRules<Picture>>({
  title: [
    { required: true, message: '请输入QQ群号', trigger: 'blur' },
    { min: 5, message: 'QQ群最少5位数字', trigger: 'blur' },
    { max: 12, message: 'QQ群最多12位数字', trigger: 'blur' },
    { validator: validateQQ, trigger: 'blur' }
  ],
  description: [{ max: 256, message: '描述最多256位字符', trigger: 'blur' }],
  path: [{ required: true, message: '上传QQ群', trigger: 'blur' }]
})

function cacel() {
  qqgroup.value.path = '' // 避免资源使用中，后端删除文件报错
  const path = localStorage.getItem('qqgroupUplodTemp')
  if (path) {
    deleteFile(path)
    localStorage.removeItem('qqgroupUplodTemp')
  }
  if (qqgroup.value.id) {
    qqgroup.value = initPicture()
  }

  dialogVisible.value = false
}

function confrim() {
  if (!formInstance.value) return
  formInstance.value.validate((valid) => {
    if (valid) {
      dialogVisible.value = false
      if (qqgroup.value.id) {
        // 修改QQ群
        qqgroup.value.state = 0 // 修改后需要重新审核
        update(qqgroup.value).then(() => {
          $emit('save')
          ElMessage.success('修改成功')
          qqgroup.value = initPicture()
        })
      } else {
        // 新建QQ群
        save(qqgroup.value).then(() => {
          $emit('save')
          ElMessage.success('保存成功')
          // 删除零时文件和清空缓存
          localStorage.removeItem('qqgroupUplodTemp')
          qqgroup.value = initPicture()
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
    return qqgroup.value.path ? 'https://www.nkbfg.asia/api/media' + qqgroup.value.path : ''
  }
})

const headers = {
  Authorization: 'Bearer ' + userStore.token
}

const handleAvatarSuccess: UploadProps['onSuccess'] = async (response) => {
  if (response.code === 200) {
    qqgroup.value.path && (await deleteFile(qqgroup.value.path))
    qqgroup.value.path = response.data
    ElMessage.success('QQ群上传成功')
    if (qqgroup.value.id) {
      // 修改文件 // 修改后需要重新审核
      qqgroup.value.state = 0
      update(qqgroup.value)
    } else {
      // 将零时文件记录，刷新或取消时删除
      localStorage.setItem('qqgroupUplodTemp', response.data)
    }
  } else {
    ElMessage.error(response.message)
  }
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type === 'image/jpeg' || rawFile.type === 'image/png' || rawFile.type === 'image/gif') {
    if (rawFile.size / 1024 / 1024 > 5) {
      ElMessage.error('QQ群最大支持5M!')
      return false
    }
    return true
  } else {
    ElMessage.error('只支持jpg、png、gif类型的QQ群')
    return false
  }
}

const handleAvatarError: UploadProps['onError'] = () => {
  ElMessage.error('服务器出错')
}
defineExpose({ setDialogVisible, qqgroup })
</script>

<template>
  <div class="myDialog">
    <el-dialog v-model="dialogVisible" :show-close="false" :title="title" :close-on-click-modal="false" width="16rem">
      <span>
        <el-form ref="formInstance" width="100%" :model="qqgroup" :rules="rules" label-width="3rem" class="ruleForm" size="default" status-icon>
          <el-form-item prop="title" label="请输入QQ群号：">
            <el-input v-model="qqgroup.title" style="width: 13.32rem" placeholder="请输入5-12位数字的QQ群号" clearable />
          </el-form-item>
          <el-form-item prop="description" label="请输入描述：">
            <el-input v-model="qqgroup.description" style="width: 13.32rem" type="textarea" rows="5" placeholder="可选：请输描述，最多能输入256个字符" clearable />
          </el-form-item>
          <el-form-item prop="path" label="请上传群截图：">
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
            <span class="uploader-warrn">图片用于审核，请上传清晰的QQ群→查看群资料</span>
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
