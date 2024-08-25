<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user.ts'
import type { IAccount } from '@/api/user/type.ts'

const router = useRouter()

const userStore = useUserStore()

const isrember = ref<boolean>(!!localStorage.getItem('isrember'))

watchEffect(() => {
  if (isrember.value) {
    localStorage.setItem('isrember', '1')
  } else {
    localStorage.removeItem('isrember')
  }
})
const ruleFormRef = ref<FormInstance>()
const iAccount = reactive<IAccount>({
  username: localStorage.getItem('username') ?? '',
  password: localStorage.getItem('password') ?? ''
})

const rules = reactive<FormRules<IAccount>>({
  username: [{ required: true, message: '请输入用户名或手机号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的帐号和密码
      const { username, password } = iAccount
      // 2.向服务器发送网络请求(携带账号和密码)
      userStore.login(iAccount).then(() => {
        // 3.判断是否需要记住密码
        if (isrember.value) {
          localStorage.setItem('username', username)
          localStorage.setItem('password', password)
        } else {
          localStorage.removeItem('username')
          localStorage.removeItem('password')
        }
        // 4.页面跳转(main页面)
        router.push('/home')
      })
    }
  })
}

function forgetPassword() {}
</script>
<template>
  <div class="formContainer">
    <el-form ref="ruleFormRef" :model="iAccount" :rules="rules" label-width="0rem" class="demo-ruleForm" size="default" status-icon>
      <el-form-item prop="username">
        <el-input v-model="iAccount.username" placeholder="用户名/手机号" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="iAccount.password" placeholder="密码" type="password" />
      </el-form-item>
      <el-form-item>
        <div class="fullitme">
          <div class="* 1.455 remberpassword">
            记住密码 &nbsp;
            <el-switch v-model="isrember" />
          </div>
          <a class="forgetPassword" style="cursor: pointer" @click="forgetPassword">忘记密码</a>
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
  padding-top: 0.2rem;
  .fullitme {
    width: 100%;
    height: 0.56rem;
    position: relative;
    .remberpassword {
      position: absolute;
      left: 0;
    }
    .forgetPassword {
      position: absolute;
      right: 0rem;
    }
  }
}
</style>
