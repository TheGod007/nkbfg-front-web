<script setup lang="ts" name="footer"></script>

<template>
  <div class="footer">
    <el-row :gutter="40" class="content">
      <el-col :span="2"></el-col>
      <el-col :span="6">
        <span>
          <a class="beian" href="https://beian.miit.gov.cn/" target="_blank">
            <img class="beianimg" src="/beian.png" />
            渝ICP备2024022994号-2
          </a>
        </span>
      </el-col>
      <el-col :span="5"><span>Copyright © 2024</span></el-col>
      <el-col :span="5"><span>站长QQ：1279946204</span></el-col>
      <el-col :span="5"><span>站长QQ群：760514094</span></el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  height: 0.6rem;
  width: 100%;
  position: relative;
  .beian {
    color: #fff;
    font-weight: 900;
    text-align: center;
    .beianimg {
      vertical-align: middle;
      height: 0.4rem;
      width: 0.4rem;
    }
  }
  .content {
    :deep(span) {
      color: #fff;
      height: 0.6rem;
      width: 100%;
      font-size: 0.32rem;
      font-weight: 700;
      line-height: 0.6rem;
    }
  }
}
</style>
