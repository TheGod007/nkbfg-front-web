<script setup lang="ts" name="login">
import { useRouter } from 'vue-router'
import LoginForm from './components/LoginForm.vue'

const router = useRouter()
function toHome() {
  router.push({ path: '/home' })
}

function toRegister() {
  router.push({ path: '/register' })
}
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
          <img src="/a.png" @click="toHome" style="cursor: pointer" />
        </div>
        <LoginForm class="loginform" />
        <div class="loginFromFooter">
          <div class="footercontainer">
            <a class="forgetPassword" @click="toRegister">立即注册</a>
          </div>
        </div>
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
      height: 6rem;
      width: 5rem;
      background-color: white;
      right: 3rem;
      top: 50%;
      transform: translateY(-50%);
      overflow: hidden;
      .header {
        text-align: center;
        height: 0.36rem;
        width: 100%;
        background-color: #fff8f0;
        color: #ff860d;
        line-height: 0.36rem;
        font-size: 0.16rem;
        // .icon-tips {
        //   background: url(//storage.jd.com/retail-mall/jdc_user_passport/pc/user/passport/1.0.16/widget/login-form-2018-0827/i/icon-tips.png) no-repeat;
        //   display: inline-block;
        //   width: 0.36rem;
        //   height: 0.36rem;
        //   line-height: 0.36rem;
        //   vertical-align: middle;
        // }
      }
      .choose {
        height: 1.1rem;
        width: 100%;
        line-height: 1.1rem;
        text-align: center;
        img {
          width: 50%;
          height: 100%;
        }
      }
      .loginform {
        width: 90%;
        height: 3.82rem;
      }
      .loginFromFooter {
        background-color: #f6f6f6;
        height: 0.72rem;
        line-height: 0.72rem;
        width: 100%;
        font-size: 0.32rem;
        color: #666666;
        .footercontainer {
          position: relative;
          width: 90%;
          margin: auto;
          .forgetPassword {
            cursor: pointer;
            color: #05c160;
            position: absolute;
            right: 0;
          }
        }
      }
    }
  }
}
.red {
  color: red;
}
</style>
