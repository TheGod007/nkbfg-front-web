<!-- eslint-disable no-undef -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts" name="container">
import type { FormInstance, FormRules } from 'element-plus'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { RePassVo } from '@/api/user/type'
import { resetPassword } from '@/api/user/user'

const router = useRouter()
const rePassVo = reactive<RePassVo>({
  oldpass: '',
  newpass: '',
  renewpass: ''
})

const validatePass1 = (_rule: any, value: any, callback: any) => {
  if (value === rePassVo.oldpass) {
    callback(new Error('新密码和旧密码相同'))
  } else {
    callback()
  }
}

const validatePass2 = (_rule: any, value: any, callback: any) => {
  if (value !== rePassVo.newpass) {
    callback(new Error('两次密码不一致'))
  } else {
    callback()
  }
}

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<RePassVo>>({
  oldpass: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { min: 6, message: '密码最少6位字符', trigger: 'blur' },
    { max: 16, message: '密码最多16位字符', trigger: 'blur' }
  ],
  newpass: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码最少6位字符', trigger: 'blur' },
    { max: 16, message: '密码最多16位字符', trigger: 'blur' },
    { validator: validatePass1, trigger: 'blur' }
  ],
  renewpass: [
    { required: true, message: '请再输入新密码', trigger: 'blur' },
    { min: 6, message: '密码最少6位字符', trigger: 'blur' },
    { max: 16, message: '密码最多16位字符', trigger: 'blur' },
    { validator: validatePass2, trigger: 'blur' }
  ]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      resetPassword(rePassVo).then(() => {
        // formEl.resetFields()
        ElMessage.success('修改成功,三秒后退出，请重新登陆')
        localStorage.removeItem('token')
        localStorage.removeItem('userorphone')
        localStorage.removeItem('password')
        localStorage.removeItem('isrember')
        setTimeout(() => {
          router.push({ path: '/login' })
        }, 3000)
      })
    }
  })
}
</script>

<template>
  <div class="container">
    <el-form ref="ruleFormRef" width="100%" :model="rePassVo" :rules="rules" label-width="3rem" class="ruleForm" size="default" status-icon>
      <el-form-item prop="oldpass" label="请输入旧密码：">
        <el-input style="width: 6.66rem" v-model="rePassVo.oldpass" placeholder="请输入6-16位旧密码" type="password" clearable />
      </el-form-item>
      <el-form-item prop="newpass" label="请输入新密码：">
        <el-input style="width: 6.66rem" v-model="rePassVo.newpass" placeholder="请输入6-16位新密码" type="password" clearable />
      </el-form-item>
      <el-form-item prop="renewpass" label="请再次输入新密码：">
        <el-input style="width: 6.66rem" v-model="rePassVo.renewpass" type="password" placeholder="请再次输入新密码" autocomplete="off" clearable />
      </el-form-item>
      <el-form-item>
        <el-button style="width: 6.66rem" type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.container {
}
</style>
