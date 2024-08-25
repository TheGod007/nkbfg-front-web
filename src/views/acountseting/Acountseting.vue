<!-- eslint-disable prefer-template -->
<script setup lang="ts" name="acountseting">
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const activeIndex = ref(route.path)
const avatarsrc = ref(userStore.userInfo!.avatar ? 'https://www.nkbfg.asia/api/media' + userStore.userInfo!.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
watchEffect(() => {
  avatarsrc.value = userStore.userInfo!.avatar ? 'https://www.nkbfg.asia/api/media' + userStore.userInfo!.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})
function goHome() {
  router.push({ path: '/home' })
}
</script>

<template>
  <div class="acountseting">
    <el-row :gutter="0">
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
            <span class="router_personal">账号设置</span>
          </div>
          <div class="menuconta">
            <el-menu :default-active="activeIndex" active-text-color="#ffd04b" background-color="#05c160" class="el-menu-vertical-demo" text-color="#fff" router>
              <el-menu-item index="/acountseting/userinf">
                <el-icon><icon-ep-grid /></el-icon>
                <span>基本信息</span>
              </el-menu-item>
              <el-menu-item index="/acountseting/upavatar">
                <el-icon><icon-ep-picture-filled /></el-icon>
                <span>上传头像</span>
              </el-menu-item>
              <el-menu-item index="/acountseting/restpass">
                <el-icon><icon-ep-key /></el-icon>
                <span>重置密码</span>
              </el-menu-item>
              <el-menu-item index="/acountseting/verify">
                <el-icon><icon-ep-user /></el-icon>
                <span>实名认证</span>
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
.acountseting {
  width: 100%;
  min-height: 100vh;
  .card_left {
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
