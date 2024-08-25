<script setup lang="ts" name="aboutsite"></script>

<template>
  <div class="aboutsite">
    <div class="wechatpayc">
      <img class="wechatpay" src="/wechatpay.jpg" />
      <div class="pay_text">请支持一下站长反脑控 ~~~^_^~~~</div>
      <div class="pay_text">可提供付款记录，方便站长统计。</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.aboutsite {
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
  background-color: #f9faf9;
  .wechatpayc {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .wechatpay {
      height: 8.1rem;
      width: 6rem;
    }
    .pay_text {
      margin-top: 0.2rem;
      font-size: 0.24;
      font-weight: 900;
      color: #05c160;
    }
  }
}
</style>
