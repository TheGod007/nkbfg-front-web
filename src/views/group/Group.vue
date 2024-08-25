<script setup lang="ts" name="group">
import Qqgroup from './components/Qqgroup.vue'
import Wegruop from './components/Wegroup.vue'
</script>

<template>
  <div class="group">
    <el-tabs tab-position="left" style="height: 100%" class="demo-tabs">
      <el-tab-pane label="QQ群"><Qqgroup /></el-tab-pane>
      <el-tab-pane label="微信群"><Wegruop /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.group {
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
  background-color: #f9faf9;
}
</style>
