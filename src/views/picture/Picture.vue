<!-- eslint-disable no-labels -->
<!-- eslint-disable no-extra-label -->
<script setup lang="ts" name="picture">
import { ref, reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { getPageAndCondition } from '@/api/media/picture'
import { Picture } from '@/api/media/type'
import { Page } from '@/api/type'
import { getByIds } from '@/api/user/user'
import { UserInfo } from '@/api/user/type'

const router = useRouter()
const page = reactive<Page>({
  pageNo: 1,
  pageSize: 24,
  uid: '',
  state: 2
})
const total = ref()
const tableData = ref<Picture[]>()
let users: UserInfo[] = []
async function pageQuery() {
  const picturePage = await getPageAndCondition(page)
  const uids = picturePage.records.map((picture) => {
    return picture.uid
  })
  if (uids && uids.length) {
    users = await getByIds(uids)
  }

  picturePage.records.forEach((picture) => {
    users.forEach((user) => {
      if (picture.uid === user.id) {
        picture.username = user.username
      }
    })
    picture.gmtmodified = picture.gmtmodified.substring(0, 10)
    picture.reason = ''
  })
  tableData.value = picturePage.records
  total.value = picturePage.total
}

onBeforeMount(() => {
  pageQuery()
})
function itemClick(picture: Picture) {
  router.push({ path: '/picturedetail', query: { ...picture } })
}
</script>

<template>
  <div class="picture">
    <el-row>
      <el-col :span="3" v-for="picture in tableData" :key="picture.id">
        <div class="item" @click="itemClick(picture)">
          <img class="itemSrc" :src="'https://www.nkbfg.asia/api/media' + picture.path" />
          <div v-text="picture.title"></div>
          <div class="authandtime">
            <span class="auth" v-text="picture.username"></span>
            <span class="time" v-text="picture.gmtmodified"></span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      v-model:current-page="page.pageNo"
      v-model:page-size="page.pageSize"
      :page-sizes="[24]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="pageQuery"
      @current-change="pageQuery"
    />
  </div>
</template>

<style lang="scss" scoped>
.picture {
  user-select: none;
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
  background-color: #f9faf9;
  .item {
    cursor: pointer;
    width: 100%;
    height: 100%;
    :deep(.itemSrc) {
      padding: 0.2rem;
      box-sizing: border-box;
      width: 100%;
      height: 3rem;
      display: block;
    }
  }
  :deep(.el-pagination) {
    position: absolute;
    bottom: 0rem;
  }
  .authandtime {
    width: 100%;
    position: relative;
    .time {
      position: absolute;
      right: 0.2rem;
    }
  }
}
</style>
