<script setup lang="ts" name="group">
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Qqgroup from './components/Qqgroup.vue'
import Wegruop from './components/Wegruop.vue'

const activeName = ref('qqgruop')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<template>
  <div class="group">
    <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="QQ群" name="qqgruop"><Qqgroup /></el-tab-pane>
      <el-tab-pane label="微信群" name="wegroup"><Wegruop /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.group {
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
  background-color: #f9faf9;

  .demo-tabs {
    .el-tabs__content {
      padding: 0.64rem;
      color: #ffd04b;
      font-size: 0.64rem;
      font-weight: 600;
    }
  }
}
</style>
