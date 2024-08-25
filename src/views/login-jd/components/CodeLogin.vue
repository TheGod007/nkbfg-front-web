<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface LoginForm {
  phonenumber: string
  verifyCode: string
}
const ruleFormRef = ref<FormInstance>()
const loginForm = reactive<LoginForm>({
  phonenumber: '',
  verifyCode: ''
})

const rules = reactive<FormRules<LoginForm>>({
  phonenumber: [
    {
      required: true,
      message: '亲输入手机号码',
      trigger: 'blur'
    }
  ],
  verifyCode: [
    {
      required: true,
      message: '请输入短信验证码',
      trigger: 'blur'
    }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

function getVerifyCode() {}
</script>
<template>
  <div class="formContainer">
    <el-form ref="ruleFormRef" :model="loginForm" :rules="rules" label-width="0rem" class="demo-ruleForm" size="default" status-icon>
      <el-form-item prop="phonenumber">
        <el-input v-model="loginForm.phonenumber" type="tel" placeholder="请输入手机号" class="input-with-select">
          <template #prepend>
            <el-select placeholder="请选择" style="width: 90rem">
              <el-option label="中国" value="0086" />
            </el-select>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <el-input v-model="loginForm.verifyCode" placeholder="请输入验证码">
          <template #append>
            <div :style="!loginForm.phonenumber ? 'cursor: not-allowed' : 'cursor: pointer'" @click="getVerifyCode">获取验证码</div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%; margin-top: 0.32rem" @click="submitForm(ruleFormRef)">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.formContainer {
  width: 90%;
  margin: auto;
  padding-top: 0.2rem;
}
</style>
