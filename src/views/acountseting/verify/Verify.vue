<!-- eslint-disable no-undef -->
<script setup lang="ts" name="container">
import { reactive } from 'vue'
import { VerifyVo } from '@/api/user/type'
import { cardVerify } from '@/api/user/user'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const verifyVo = reactive<VerifyVo>({
  realName: userStore.userInfo!.realname,
  cardNo: userStore.userInfo!.cardnum
})

function submitForm() {
  if (verifyVo.realName && verifyVo.realName.length > 0) {
    if (verifyVo.cardNo && verifyVo.cardNo.length === 18) {
      cardVerify(verifyVo).then(() => {
        ElMessage.success('身份实名认证成功')
        userStore.fetchprofile()
      })
    } else {
      ElMessage.error('请输入18位身份证号码')
    }
  } else {
    ElMessage.error('请输入真实姓名')
  }
}
</script>

<template>
  <div class="container">
    <el-form ref="ruleFormRef" width="100%" :model="verifyVo" label-width="3rem" class="ruleForm" size="default" status-icon>
      <el-form-item label="请输入真实姓名:">
        <el-input v-model="verifyVo.realName" style="width: 6.66rem" placeholder="请输入真实姓名" clearable :disabled="!!userStore.userInfo!.realname" />
        <span v-show="!!userStore.userInfo!.realname">
          <el-icon :size="22" color="green" class="my-icon">
            <icon-ep-circle-check-filled />
          </el-icon>
          以认证
        </span>
      </el-form-item>
      <el-form-item label="请输入身份证号码：">
        <el-input v-model="verifyVo.cardNo" style="width: 6.66rem" placeholder="请输入身份证号码" clearable :disabled="!!userStore.userInfo!.realname" />
        <span v-show="!!userStore.userInfo!.realname" style="vertical-align: middle">
          <el-icon :size="22" color="green" class="my-icon">
            <icon-ep-circle-check-filled />
          </el-icon>
          以认证
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="!!userStore.userInfo!.realname" style="width: 6.66rem" type="primary" @click="submitForm">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.container {
  .my-icon {
    vertical-align: middle;
    margin-left: 0.4rem;
  }
}
</style>
