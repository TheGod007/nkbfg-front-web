<!-- eslint-disable no-undef -->
<!-- eslint-disable prefer-template -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { reactive, ref, onBeforeMount } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { register, getUserByNameOrPhone, getCode } from '@/api/user/user.ts'
import type { IAccount2, UserInfo } from '@/api/user/type.ts'

const router = useRouter()

const verifyCode = ref('')

const ruleFormRef = ref<FormInstance>()
const iAccount2 = reactive<IAccount2>({
  username: '',
  phone: '',
  password: '',
  repassword: '',
  verifyCode: ''
})
const disabledRegister = ref<boolean>(false)
const validateUserName = (_rule: any, value: any, callback: any) => {
  const reg = /^[a-zA-Z]{1}[a-zA-Z0-9]{3,15}$/g
  const result = reg.exec(value)
  if (result == null) {
    callback(new Error('以字母开头,4-16位的数字和字母的组成'))
  } else {
    callback()
  }
}

async function validateUserName2(_rule: any, value: any, callback: any) {
  const userInfo: UserInfo = await getUserByNameOrPhone(value)
  if (userInfo != null) {
    callback(new Error('用户名已被注册'))
  } else {
    callback()
  }
}
const validatePhone = (_rule: any, value: any, callback: any) => {
  const reg = /^1\d{10}$/g
  const result = reg.exec(value)
  if (result == null) {
    callback(new Error('手机格式错误,请重新输入'))
  } else {
    callback()
  }
}

async function validatePhone2(_rule: any, value: any, callback: any) {
  const userInfo: UserInfo = await getUserByNameOrPhone(value)
  if (userInfo != null) {
    callback(new Error('手机号已被注册'))
  } else {
    callback()
  }
}

const validatePass2 = (_rule: any, value: any, callback: any) => {
  if (value !== iAccount2.password) {
    callback(new Error('两次密码不一致'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<IAccount2>>({
  username: [
    { validator: validateUserName, trigger: 'blur' },
    { validator: validateUserName2, trigger: 'blur' },
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, message: '用户名最少4位字符', trigger: 'blur' },
    { max: 16, message: '用户名最多16位字符', trigger: 'blur' }
  ],
  phone: [
    { validator: validatePhone, trigger: 'blur' },
    { validator: validatePhone2, trigger: 'blur' },
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { len: 11, message: '请输入11位数的手机号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码最少6位字符', trigger: 'blur' },
    { max: 16, message: '密码最多16位字符', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码最少6位字符', trigger: 'blur' },
    { max: 16, message: '密码最多16位字符', trigger: 'blur' },
    { validator: validatePass2, trigger: 'blur' }
  ],
  verifyCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 4, message: '请输入4位数的验证码', trigger: 'blur' }
  ]
})

const submitForm = (formEl: FormInstance | undefined) => {
  getUserByNameOrPhone(iAccount2.username)
  getUserByNameOrPhone(iAccount2.phone)
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      disabledRegister.value = true
      register(iAccount2).then(() => {
        ElMessage.success('注册成功，三秒后跳转到登陆页，请登陆')
        setTimeout(() => {
          router.push({ path: '/login' })
        }, 3000)
      })
      setTimeout(() => {
        disabledRegister.value = false
      }, 3000)
    }
  })
}
function verifyCodeClick() {
  getCode().then((res) => {
    verifyCode.value = res
  })
}
function toLogin() {
  router.push({ path: '/login' })
}

function toHome() {
  router.push({ path: '/home' })
}
onBeforeMount(() => {
  getCode().then((res) => {
    verifyCode.value = res
  })
})
</script>
<template>
  <div class="formContainer">
    <div class="form">
      <div class="imgContainer">
        <img src="/a.png" style="cursor: pointer" @click="toHome" />
        <span class="textContainer">
          已有账号？
          <a @click="toLogin">请登陆></a>
        </span>
      </div>

      <el-form ref="ruleFormRef" width="100%" :model="iAccount2" :rules="rules" label-width="3rem" class="ruleForm" size="default" status-icon>
        <el-form-item prop="username" label="请输入用户名：">
          <el-input v-model="iAccount2.username" placeholder="以字母开头,4-16位的数字和字母组成" clearable />
        </el-form-item>
        <el-form-item prop="phone" label="请输入手机号：">
          <el-input v-model="iAccount2.phone" placeholder="请输入11位手机号" clearable />
        </el-form-item>
        <el-form-item prop="password" label="请输入密码：">
          <el-input v-model="iAccount2.password" placeholder="请输入6-16位密码" type="password" clearable />
        </el-form-item>
        <el-form-item prop="repassword" label="请再次输入密码：">
          <el-input v-model="iAccount2.repassword" type="password" placeholder="请再次输入密码" autocomplete="off" clearable />
        </el-form-item>
        <el-form-item prop="verifyCode" label="请输入图形验证码：">
          <el-input v-model="iAccount2.verifyCode" type="verifyCode" placeholder="图形验证码一分钟内有效,填写验证码前最好先换一张" clearable />

          <img width="200" height="80" :src="verifyCode" style="cursor: pointer" @click="verifyCodeClick" />
          <a @click="verifyCodeClick">看不清？换一张</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" :disabled="disabledRegister" @click="submitForm(ruleFormRef)">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.formContainer {
  width: 100vw;
  height: 100vh;
  position: relative;
  .form {
    position: absolute;
    width: 50%;
    height: 10.8rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .imgContainer {
      width: 100%;
      height: 3.52rem;
      position: relative;
      img {
        position: absolute;
        width: 3.52remrem;
        height: 3.52rem;
        top: 0;
        left: 0;
      }
      .textContainer {
        font-size: 0.32rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
      }
    }
    a {
      user-select: none;
      cursor: pointer;
      color: #05c160;
    }
  }
}
</style>
