<!-- eslint-disable no-labels -->
<!-- eslint-disable no-extra-label -->
<script setup lang="ts" name="wegroup">
import { ref, reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { getPageAndCondition } from '@/api/media/wegroup'
import { Wegroup } from '@/api/media/type'
import { Page } from '@/api/type'
import { getByIds } from '@/api/user/user'
import { UserInfo } from '@/api/user/type'

let users: UserInfo[] = []
const router = useRouter()
const page = reactive<Page>({
  pageNo: 1,
  pageSize: 24,
  uid: '',
  state: 2
})
const total = ref()
const tableData = ref<Wegroup[]>()

async function pageQuery() {
  const wegroupPage = await getPageAndCondition(page)
  const uids = wegroupPage.records.map((wegroup) => {
    return wegroup.uid
  })
  if (uids && uids.length) {
    users = await getByIds(uids)
  }
  wegroupPage.records.forEach((wegroup) => {
    users.forEach((user) => {
      if (wegroup.uid === user.id) {
        wegroup.username = user.username
      }
    })
    wegroup.gmtmodified = wegroup.gmtmodified.substring(0, 10)
    wegroup.reason = ''
  })
  tableData.value = wegroupPage.records
  total.value = wegroupPage.total
}

onBeforeMount(() => {
  pageQuery()
})

function itemClick(wegroup: Wegroup) {
  router.push({ path: '/picturedetail', query: { ...wegroup } })
}
</script>

<template>
  <div class="wegroup">
    <el-row>
      <el-col :span="3" v-for="wegroup in tableData" :key="wegroup.id">
        <div class="item" @click="itemClick(wegroup)">
          <img class="itemSrc" :src="'https://www.nkbfg.asia/api/media' + wegroup.path" />
          <div v-text="wegroup.title"></div>
          <div class="authandtime">
            <span class="auth" v-text="wegroup.username"></span>
            <span class="time" v-text="wegroup.gmtmodified"></span>
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
.wegroup {
  user-select: none;
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
  background-color: #f9faf9;
  .item {
    cursor: pointer;
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
    bottom: 0.2rem;
  }
  .authandtime {
    width: 100%;
    position: relative;
    .time {
      position: absolute;
      right: 0.5rem;
    }
  }
}
</style>
