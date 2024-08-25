<!-- eslint-disable prefer-template -->
<script setup lang="ts" name="admincenter">
import { onBeforeMount, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const activeIndex = ref(route.path)

const avatarsrc = ref(userStore.userInfo!.avatar ? 'https://www.nkbfg.asia/api/media' + userStore.userInfo!.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

watchEffect(() => {
  avatarsrc.value = userStore.userInfo!.avatar ? 'https://www.nkbfg.asia/api/media' + userStore.userInfo!.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

function goHome() {
  router.push({ path: '/home' })
}

onBeforeMount(() => {
  router.beforeEach((to, _from, next) => {
    if (to.path.startsWith('/admincenter') && !userStore.userInfo!.permissions.includes('admin')) {
      next('/home')
    }
    next()
  })
})
</script>

<template>
  <div class="admincenter">
    <el-row :gutter="20">
      <el-col :span="3"></el-col>
      <el-col :span="3">
        <el-card class="card_left">
          <div class="avatarconta">
            <el-avatar :size="120" :src="avatarsrc" />
          </div>
          <div class="router">
            <span class="router_home" @click="goHome">
              <el-icon color="#ffd04b" :size="20" style="vertical-align: text-bottom">
                <icon-ep-home-filled />
              </el-icon>
              主页
            </span>
            /
            <span class="router_personal">管理中心</span>
          </div>
          <div class="menuconta">
            <el-menu :default-active="activeIndex" active-text-color="#ffd04b" background-color="#05c160" class="el-menu-vertical-demo" text-color="#fff" router>
              <el-menu-item index="/admincenter/picture">
                <el-icon><icon-ep-picture-filled /></el-icon>
                <span>图片资料</span>
              </el-menu-item>
              <el-menu-item index="/admincenter/movie">
                <el-icon><icon-ep-video-camera-filled /></el-icon>
                <span>视频资料</span>
              </el-menu-item>
              <el-menu-item index="/admincenter/group">
                <el-icon><icon-ep-user /></el-icon>
                <span>受害者群</span>
              </el-menu-item>
              <el-menu-item index="/admincenter/activity">
                <el-icon><icon-ep-bicycle /></el-icon>
                <span>组织活动</span>
              </el-menu-item>
              <el-menu-item index="/admincenter/crowdfunding">
                <el-icon><icon-ep-ticket /></el-icon>
                <span>资金众筹</span>
              </el-menu-item>
              <el-menu-item index="/admincenter/notice">
                <el-icon><icon-ep-list /></el-icon>
                <span>管理公告</span>
              </el-menu-item>
              <el-menu-item index="/admincenter/usermanage">
                <el-icon><icon-ep-coordinate /></el-icon>
                <span>用户管理</span>
              </el-menu-item>
              <el-menu-item index="/admincenter/rolemanage">
                <el-icon><icon-ep-flag /></el-icon>
                <span>角色管理</span>
              </el-menu-item>
              <el-menu-item index="/admincenter/promissionmanage">
                <el-icon><icon-ep-goods-filled /></el-icon>
                <span>权限管理</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-card>
      </el-col>
      <el-col :span="15">
        <el-card class="card_right">
          <keep-alive>
            <router-view v-slot="{ Component }">
              <component :is="Component" />
            </router-view>
          </keep-alive>
        </el-card>
      </el-col>
      <el-col :span="3"></el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.admincenter {
  width: 100%;
  min-height: 100vh;
  .card_left {
    width: 100%;
    min-height: 100vh;
    background-color: #05c160;

    .router {
      color: #ffd04b;
      font-weight: 900;
      user-select: none;
      margin-bottom: 0.4rem;
      .router_home {
        cursor: pointer;
      }
      .router_personal {
        cursor: pointer;
      }
    }
    .avatarconta {
      margin: auto;
      height: 2.4rem;
      width: 2.4rem;
      margin-bottom: 0.4rem;
    }
    .menuconta {
      width: 100%;
      :deep(.el-menu) {
        border-right: #05c160 !important;
      }
      .el-menu-vertical-demo {
        width: 100%;
      }
    }
  }
  .card_right {
    min-height: 100vh;
    background-color: #f9faf9;
  }
}
</style>
