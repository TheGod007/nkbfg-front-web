<template>
  <div class="myheader">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#05c160" text-color="#fff" active-text-color="#ffd04b" :ellipsis="false" router>
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/counter">难友统计</el-menu-item>
      <el-menu-item index="/friendsget">难友查询</el-menu-item>
      <el-menu-item index="/picture">图片资料</el-menu-item>
      <el-menu-item index="/movie">视频资料</el-menu-item>
      <el-menu-item index="/group">受害者群</el-menu-item>
      <el-menu-item index="/activity">组织活动</el-menu-item>
      <el-menu-item index="/crowdfunding">资金众筹</el-menu-item>
      <el-menu-item index="/notice">管理公告</el-menu-item>
      <!-- <el-menu-item index="/donate">捐赠</el-menu-item> -->
      <span class="avatar-span" v-click-outside="onClickOutside" v-show="userStore.token">
        <el-avatar v-popover="popoverRef" :src="avatarsrc" />
      </span>
      <span class="avatar-span2" v-show="!userStore.token">
        <span class="loginorregiser">
          <a @click="toRegister">注册</a>
          <span style="color: white">&nbsp;|&nbsp;</span>
          <a @click="toLogin">登陆</a>
        </span>
      </span>
    </el-menu>

    <el-popover
      ref="popoverRef"
      trigger="click"
      :title="'用户名：' + username"
      virtual-triggering
      width="150"
      placement="bottom-end"
      popper-style="background-color: #05c160"
      popper-class="custom-popover"
    >
      <div class="popover_item" @click="tousercenter">个人中心</div>
      <div class="popover_item" @click="toadmincenter" v-show="userStore.userInfo?.permissions.includes('admin')">管理中心</div>
      <!--TODO 后期上面的这个需要判断用户或者角色控制是否显示-->
      <div class="popover_item" @click="toacountseting">账号设置</div>
      <div class="popover_item" @click="tologinout">退出登陆</div>
    </el-popover>
  </div>
</template>
<!-- eslint-disable prefer-template -->
<script lang="ts" setup name="header">
import { ref, unref, watchEffect } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const route = useRoute()
const activeIndex = ref(route.path)
const router = useRouter()
const username = ref(userStore.userInfo?.username)
const avatarsrc = ref(userStore.userInfo?.avatar ? 'https://www.nkbfg.asia/api/media' + userStore.userInfo!.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

watchEffect(() => {
  avatarsrc.value = userStore.userInfo?.avatar ? 'https://www.nkbfg.asia/api/media' + userStore.userInfo!.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}

function tousercenter() {
  router.push({ path: '/usercenter' })
}
function toadmincenter() {
  router.push({ path: '/admincenter' })
}

function toacountseting() {
  router.push({ path: '/acountseting' })
}
function tologinout() {
  localStorage.removeItem('token')
  userStore.token = ''
  userStore.fetchprofile()
  router.push({ path: '/login' })
}
function toLogin() {
  router.push({ path: '/login' })
}
function toRegister() {
  router.push({ path: '/register' })
}
</script>
<style lang="scss" scoped>
.myheader {
  height: 60px;
  width: 100%;
  overflow: hidden;
  :deep(.el-menu-item) {
    user-select: none;
  }
  :global(.custom-popover.el-popper.is-light .el-popper__arrow::before) {
    background: #05c160;
  }
  :global(.el-popover__title) {
    color: #fff;
    font-weight: 900;
  }
  .avatar-span {
    flex: 1;
    display: inline-block;
    position: relative;
    :deep(.el-avatar) {
      position: absolute;
      cursor: pointer;
      right: 0.1rem;
      top: 0.1rem;
    }
  }
  .avatar-span2 {
    flex: 1;
    display: inline-block;
    position: relative;
    user-select: none;
    .loginorregiser {
      position: absolute;
      right: 0.2rem;
      font-size: 0.36rem;
      top: 50%;
      transform: translateY(-50%);
      a {
        cursor: pointer;
        color: #ffd04b;
      }
    }
  }
  :global(.popover_item) {
    cursor: pointer;
    width: 100%;
    height: 0.34rem;
    line-height: 0.34rem;
    font-size: 0.17rem;
    font-weight: 900;
    color: #fff;
    border-top: 0.02rem solid #fff;
  }
}
</style>
