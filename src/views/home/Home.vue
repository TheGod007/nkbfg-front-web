<script setup lang="ts" name="home"></script>

<template>
  <div class="home1">
    <div class="content1">
      <div class="contenttitle">友情提示</div>
      <div class="content2">
        本站内容均来至于实名用户,注册用户实名认证后可在
        <span class="personalcenter">个人中心</span>
        进行各个模块的内容发布、编辑、删除等功能。访客与普通(未实名认证)用户可浏览本站所有内容。
        <span class="redspan">请大家遵纪守法,共同维护网络和谐。</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home1 {
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
  background-color: #f9faf9;
  .content1 {
    top: 39%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    font-weight: 900;
    width: 78%;
    margin: 0 auto;
    .contenttitle {
      width: 100%;
      font-size: 1.16rem;
      margin-bottom: 1.16rem;
      text-align: center;
    }
    .content2 {
      text-indent: 1.16rem;
      font-size: 0.58rem;
      line-height: 1.5;
      .personalcenter {
        color: #f3b60e;
      }
      .redspan {
        color: red;
      }
    }
  }
}
</style>
