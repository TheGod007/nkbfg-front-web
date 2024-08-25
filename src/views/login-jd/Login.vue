<script setup lang="ts" name="login">
import { ref } from 'vue'
import PasswordLogin from './components/PasswordLogin.vue'
import CodeLogin from './components/CodeLogin.vue'
import LoginFormFooter from './components/LoginFormFooter.vue'

const showComputer = ref(false)
const choosePassword = ref(true)
</script>

<template>
  <div class="login">
    <div class="mblzz">
      <div class="login-container">
        <div class="header">
          <i class="icon-tips"></i>
          请记住自己的账号和密码，切勿泄露。
        </div>
        <div class="choose">
          <div v-show="!showComputer" class="choosetext">
            <a style="cursor: pointer" :class="choosePassword ? 'red' : ''" @click="choosePassword = true">密码登陆</a>
            &nbsp;&nbsp;

            <a style="cursor: pointer" :class="!choosePassword ? 'red' : ''" @click="choosePassword = false">短信登陆</a>
          </div>
          <img v-show="showComputer" src="./png/computer.png" height="49" width="49" style="cursor: pointer" @click="showComputer = false" />
          <img v-show="!showComputer" src="./png/qr-code.png" height="49" width="49" style="cursor: pointer" @click="showComputer = true" />
        </div>
        <PasswordLogin v-show="choosePassword && !showComputer" />
        <CodeLogin v-show="!choosePassword && !showComputer" />
        <LoginFormFooter class="loginFromFooter" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  background: url(@/assets/a.jpg) no-repeat center;
  background-size: cover;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  .mblzz {
    position: relative;
    height: 100%;
    width: 100%;
    backdrop-filter: blur(0.14rem);
    background-color: rgba($color: #000000, $alpha: 0.4);
    .login-container {
      border-radius: 0.14rem;
      position: absolute;
      height: 330.1rem;
      width: 6rem;
      background-color: white;
      right: 6rem;
      top: 50%;
      transform: translateY(-50%);
      overflow: hidden;
      .header {
        text-align: center;
        height: 0.56rem;
        width: 100%;
        background-color: #fff8f0;
        color: #ff860d;
        line-height: 0.56rem;
        font-size: 0.24rem;
        .icon-tips {
          background: url(//storage.jd.com/retail-mall/jdc_user_passport/pc/user/passport/1.0.16/widget/login-form-2018-0827/i/icon-tips.png);
          display: inline-block;
          width: 0.32rem;
          height: 0.32rem;
          vertical-align: middle;
          margin-right: 0.1rem;
        }
      }
      .choose {
        height: 1.1rem;
        width: 100%;
        position: relative;
        .choosetext {
          position: absolute;
          bottom: 0.06rem;
          left: 10.06rem;
        }
        img {
          position: absolute;
          right: 0.06rem;
          top: 0.06rem;
        }
      }
      .loginFromFooter {
        position: absolute;
        bottom: 0rem;
        background-color: #f6f6f6;
        width: 100%;
        height: 1rem;
      }
    }
  }
}
.red {
  color: red;
}
</style>
