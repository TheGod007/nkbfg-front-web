<!-- eslint-disable no-undef -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts" name="container">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/store/user'
import { UserInfo } from '@/api/user/type'
import { getUserByNameOrPhone, update } from '@/api/user/user'

const userStore = useUserStore()
const isdisabled = ref<boolean>(false)
const ruleFormRef = ref<FormInstance>()

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
  if (userStore.username === value) {
    callback()
    console.log('aaaaaaaaaaaaaaaaaaaaaaaa')
    return
  }
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
  if (userStore.phone === value) {
    callback()
    console.log('bbbbbbbbbbbbbbbbbbbbbbb')
    return
  }
  const userInfo: UserInfo = await getUserByNameOrPhone(value)
  if (userInfo != null) {
    callback(new Error('手机号已被注册'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<UserInfo>>({
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
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  isdisabled.value = true
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      update(userStore.userInfo!).then(() => {
        ElMessage.success('保存成功')
        userStore.fetchprofile()
      })
    }
  })
  setTimeout(() => {
    isdisabled.value = false
  }, 3000)
}
</script>

<template>
  <div class="container">
    <el-form ref="ruleFormRef" style="max-width: 600rem" :model="userStore.userInfo" :rules="rules" label-width="auto" class="demo-ruleForm" status-icon>
      <el-form-item label="用户名：" prop="username">
        <div>
          <el-input class="my-el-input" v-model="userStore.userInfo!.username" />
          <span style="user-select: none">
            <span>
              <el-icon :size="22" color="green" class="my-icon">
                <icon-ep-circle-check-filled />
              </el-icon>
              必须公开
            </span>
          </span>
        </div>
      </el-form-item>
      <el-form-item label="手机号：" prop="phone">
        <div>
          <el-input class="my-el-input" v-model="userStore.userInfo!.phone" />
          <span style="user-select: none">
            <span v-show="userStore.userInfo!.ophone">
              <el-icon @click="userStore.userInfo!.ophone = false" :size="22" color="green" class="my-icon">
                <icon-ep-circle-check-filled />
              </el-icon>
              以公开
            </span>
            <span v-show="!userStore.userInfo!.ophone">
              <el-icon @click="userStore.userInfo!.ophone = true" :size="22" color="red" class="my-icon">
                <icon-ep-circle-close-filled />
              </el-icon>
              不公开
            </span>
          </span>
        </div>
      </el-form-item>
      <el-form-item label="姓名：">
        <div>
          <el-input class="my-el-input" v-model="userStore.userInfo!.realname" disabled />
          <span style="user-select: none">
            <span v-show="userStore.userInfo!.orealname">
              <el-icon @click="userStore.userInfo!.orealname = false" :size="22" color="green" class="my-icon">
                <icon-ep-circle-check-filled />
              </el-icon>
              以公开
            </span>
            <span v-show="!userStore.userInfo!.orealname">
              <el-icon @click="userStore.userInfo!.orealname = true" :size="22" color="red" class="my-icon">
                <icon-ep-circle-close-filled />
              </el-icon>
              不公开
            </span>
          </span>
        </div>
      </el-form-item>
      <el-form-item label="性别：">
        <div>
          <el-input class="my-el-input" v-model="userStore.userInfo!.sex" disabled />
          <span style="user-select: none">
            <span v-show="userStore.userInfo!.osex">
              <el-icon @click="userStore.userInfo!.osex = false" :size="22" color="green" class="my-icon">
                <icon-ep-circle-check-filled />
              </el-icon>
              以公开
            </span>
            <span v-show="!userStore.userInfo!.osex">
              <el-icon @click="userStore.userInfo!.osex = true" :size="22" color="red" class="my-icon">
                <icon-ep-circle-close-filled />
              </el-icon>
              不公开
            </span>
          </span>
        </div>
      </el-form-item>
      <el-form-item label="身份证号：">
        <div>
          <el-input class="my-el-input" v-model="userStore.userInfo!.cardnum" disabled />
          <span style="user-select: none">
            <span v-show="userStore.userInfo!.ocardnum">
              <el-icon @click="userStore.userInfo!.ocardnum = false" :size="22" color="green" class="my-icon">
                <icon-ep-circle-check-filled />
              </el-icon>
              以公开
            </span>
            <span v-show="!userStore.userInfo!.ocardnum">
              <el-icon @click="userStore.userInfo!.ocardnum = true" :size="22" color="red" class="my-icon">
                <icon-ep-circle-close-filled />
              </el-icon>
              不公开
            </span>
          </span>
        </div>
      </el-form-item>
      <el-form-item label="出生日期：">
        <div>
          <el-input class="my-el-input" v-model="userStore.userInfo!.birthday" disabled />
          <span style="user-select: none">
            <span v-show="userStore.userInfo!.obirthday">
              <el-icon @click="userStore.userInfo!.obirthday = false" :size="22" color="green" class="my-icon">
                <icon-ep-circle-check-filled />
              </el-icon>
              以公开
            </span>
            <span v-show="!userStore.userInfo!.obirthday">
              <el-icon @click="userStore.userInfo!.obirthday = true" :size="22" color="red" class="my-icon">
                <icon-ep-circle-close-filled />
              </el-icon>
              不公开
            </span>
          </span>
        </div>
      </el-form-item>
      <el-form-item label="所在省：">
        <div>
          <el-input class="my-el-input" v-model="userStore.userInfo!.province" disabled />
          <span style="user-select: none">
            <span v-show="userStore.userInfo!.oprovince">
              <el-icon @click="userStore.userInfo!.oprovince = false" :size="22" color="green" class="my-icon">
                <icon-ep-circle-check-filled />
              </el-icon>
              以公开
            </span>
            <span v-show="!userStore.userInfo!.oprovince">
              <el-icon @click="userStore.userInfo!.oprovince = true" :size="22" color="red" class="my-icon">
                <icon-ep-circle-close-filled />
              </el-icon>
              不公开
            </span>
          </span>
        </div>
      </el-form-item>
      <el-form-item label="所在市：">
        <div>
          <el-input class="my-el-input" v-model="userStore.userInfo!.city" disabled />
          <span style="user-select: none">
            <span v-show="userStore.userInfo!.ocity">
              <el-icon @click="userStore.userInfo!.ocity = false" :size="22" color="green" class="my-icon">
                <icon-ep-circle-check-filled />
              </el-icon>
              以公开
            </span>
            <span v-show="!userStore.userInfo!.ocity">
              <el-icon @click="userStore.userInfo!.ocity = true" :size="22" color="red" class="my-icon">
                <icon-ep-circle-close-filled />
              </el-icon>
              不公开
            </span>
          </span>
        </div>
      </el-form-item>
      <el-form-item label="所在县：">
        <div>
          <el-input class="my-el-input" v-model="userStore.userInfo!.district" disabled />
          <span style="user-select: none">
            <span v-show="userStore.userInfo!.odistrict">
              <el-icon @click="userStore.userInfo!.odistrict = false" :size="22" color="green" class="my-icon">
                <icon-ep-circle-check-filled />
              </el-icon>
              以公开
            </span>
            <span v-show="!userStore.userInfo!.odistrict">
              <el-icon @click="userStore.userInfo!.odistrict = true" :size="22" color="red" class="my-icon">
                <icon-ep-circle-close-filled />
              </el-icon>
              不公开
            </span>
          </span>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)" :disabled="isdisabled">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.container {
  .my-el-input {
    width: 6rem;
    margin-right: 0.4rem;
  }
  .my-icon {
    vertical-align: middle;
    cursor: pointer;
  }
}
</style>
