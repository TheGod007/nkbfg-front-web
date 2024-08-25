<script setup lang="ts" name="movieDetail">
import { toRefs } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { stateStr, path, title, description, username, gmtmodified } = toRefs(route.query)
</script>

<template>
  <div class="movieDetail">
    <el-row>
      <el-col :span="12">
        <div class="imagecontainer"><img :src="'https://www.nkbfg.asia/api/media' + path" style="cursor: pointer" class="imgdiv" /></div>
      </el-col>
      <el-col :span="12">
        {{ stateStr == 'QQ' ? 'QQ群号：' : '标题：' }}
        <div class="infor" v-text="title"></div>
        描述：
        <div class="infor" v-text="description"></div>
        上传人：
        <div class="infor" v-text="username"></div>
        更新日期：
        <div class="infor" v-text="gmtmodified"></div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.movieDetail {
  padding: 0.5rem;
  width: 100%;
  height: 100%;
  font-size: 0.38rem;
  font-weight: 900;
  box-sizing: border-box;
  .imagecontainer {
    position: relative;
    .imgdiv {
      max-width: 49vw;
      max-height: 97vh;
      position: absolute;
      right: 0.6rem;
    }
  }
  .infor {
    text-indent: 0.76rem;
  }
}
</style>
