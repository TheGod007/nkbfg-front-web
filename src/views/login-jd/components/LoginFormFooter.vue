<script setup lang="ts" name="loginFormFooter">
function forgetPassword() {}
function toQQ() {}
function toWechat() {}
</script>

<template>
  <div class="loginFormFooter">
    <div class="footercontainer">
      <div class="qqandwechat">
        <div class="qqorwechatcotainer" style="cursor: pointer" @click="toQQ">
          <span>
            <img height="18" width="19" src="../png/qq.png" />
            &nbsp; QQ
          </span>
        </div>
        <div class="qqorwechatcotainer" style="cursor: pointer" @click="toWechat">
          <span>
            <img height="18" width="19" src="../png/wechat.png" />
            &nbsp; 微信
          </span>
        </div>
      </div>
      <a class="forgetPassword" style="cursor: pointer" @click="forgetPassword">立即注册</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loginFormFooter {
  line-height: 1rem;
  font-size: 0.24rem;
  color: #666666;
  .footercontainer {
    position: relative;
    width: 90%;
    margin: auto;
    .qqandwechat {
      position: absolute;
      left: 0;
      width: 60%;
      .qqorwechatcotainer {
        width: 50%;
        display: inline-block;
        span {
          display: flex;
          align-items: center;
        }
      }
    }
    .forgetPassword {
      position: absolute;
      right: 0;
    }
  }
}
</style>
