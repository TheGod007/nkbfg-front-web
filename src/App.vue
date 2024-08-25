<script setup lang="ts" name="app">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <keep-alive>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </keep-alive>
  </el-config-provider>
</template>

<style scoped lang="scss">
html,
body,
#apps {
  height: 100vh;
  width: 100%;
  user-select: none;
}
</style>
