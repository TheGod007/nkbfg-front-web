<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable no-undef -->
<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user.ts'
import type { IAccount } from '@/api/user/type.ts'

const router = useRouter()

const userStore = useUserStore()

const isrember = ref<boolean>(!!localStorage.getItem('isrember'))

const ruleFormRef = ref<FormInstance>()
const iAccount = reactive<IAccount>({
  password: localStorage.getItem('password') ?? '',
  username: localStorage.getItem('userorphone') ?? ''
})

watchEffect(() => {
  if (isrember.value) {
    localStorage.setItem('isrember', '1')
    isrember.value = !!localStorage.getItem('isrember')
  } else {
    localStorage.removeItem('isrember')
    isrember.value = !!localStorage.getItem('isrember')
    iAccount.password = localStorage.getItem('password') ?? ''
    iAccount.username = localStorage.getItem('userorphone') ?? ''
  }
})

const validateUserNameOrPhone = (_rule: any, value: any, callback: any) => {
  const reg = /^[a-zA-Z]{1}[a-zA-Z0-9]{3,15}$/g
  const reg2 = /^1\d{10}$/g
  const result = reg.exec(value)
  const result2 = reg2.exec(value)
  if (result == null && result2 == null) {
    callback(new Error('请输入正确的手机或用户名'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<IAccount>>({
  username: [{ validator: validateUserNameOrPhone, trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码最少6位字符', trigger: 'blur' },
    { max: 16, message: '密码最多16位字符', trigger: 'blur' }
  ]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的帐号和密码
      const { username, password } = iAccount
      // 2.向服务器发送网络请求(携带账号和密码)
      userStore
        .login(iAccount)
        .then(() => {
          if (userStore.token) {
            // 4.判断是否需要记住密码
            if (isrember.value) {
              localStorage.setItem('userorphone', username)
              localStorage.setItem('password', password)
            } else {
              localStorage.removeItem('userorphone')
              localStorage.removeItem('password')
            }
            // 4.页面跳转(main页面)
            router.push({ path: '/home' })
          }
        })
        .catch(() => {})
      // 3.判断是否登陆成功
    }
  })
}

function forgetPass() {
  router.push({ path: '/forgetPass' })
}
</script>
<template>
  <div class="formContainer">
    <el-form ref="ruleFormRef" :model="iAccount" :rules="rules" label-width="0rem" class="demo-ruleForm" size="default" status-icon>
      <el-form-item prop="username">
        <el-input v-model="iAccount.username" placeholder="用户名/手机号" clearable />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="iAccount.password" placeholder="密码" type="password" clearable />
      </el-form-item>
      <el-form-item>
        <div class="fullitme">
          <div class="remberpassword">
            记住密码 &nbsp;
            <el-switch v-model="isrember" />
          </div>
          <a class="forgetPassword" @click="forgetPass">忘记密码</a>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="submitForm(ruleFormRef)">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.formContainer {
  width: 90%;
  margin: auto;
  font-size: 0.3rem;
  :deep(.demo-ruleForm) {
    height: 100%;
    width: 100%;
    .fullitme {
      width: 100%;
      height: 0.3rem;
      position: relative;
      .remberpassword {
        position: absolute;
        left: 0;
      }
      .forgetPassword {
        cursor: pointer;
        position: absolute;
        color: #05c160;
        right: 0rem;
      }
    }
  }
}
</style>
