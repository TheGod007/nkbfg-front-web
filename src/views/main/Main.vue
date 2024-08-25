<template>
  <div class="main">
    <div class="main-container">
      <div class="main-header"><Header /></div>
      <div class="main-main">
        <keep-alive>
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </keep-alive>
      </div>
      <div class="main-footer"><Footer /></div>
    </div>
  </div>
</template>

<script setup lang="ts" name="main">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<style lang="scss">
.main {
  width: 100%;
  height: 100vh;
  .main-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 24rem;
    margin: auto;
    .main-header {
      width: 100%;
      height: 60px;
    }
    .main-main {
      height: calc(100vh - 60px); /* 让main区域填充剩余的空间 */
      /* 主内容区域样式 */
    }
    .main-footer {
      height: 0.6rem; /* 设置固定高度 */
      line-height: 0.6rem;
      background-color: #05c160;
    }
  }
}
</style>
