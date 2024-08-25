<!-- eslint-disable no-labels -->
<!-- eslint-disable no-extra-label -->
<script setup lang="ts" name="qqgroup">
import { ref, reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { getPageAndCondition } from '@/api/media/qqgroup'
import { Qqgroup } from '@/api/media/type'
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
const tableData = ref<Qqgroup[]>()

async function pageQuery() {
  const qqgroupPage = await getPageAndCondition(page)
  const uids = qqgroupPage.records.map((qqgroup) => {
    return qqgroup.uid
  })
  if (uids && uids.length) {
    users = await getByIds(uids)
  }
  qqgroupPage.records.forEach((qqgroup) => {
    users.forEach((user) => {
      if (qqgroup.uid === user.id) {
        qqgroup.username = user.username
      }
    })
    qqgroup.gmtmodified = qqgroup.gmtmodified.substring(0, 10)
    qqgroup.reason = ''
  })
  tableData.value = qqgroupPage.records
  total.value = qqgroupPage.total
}

onBeforeMount(() => {
  pageQuery()
})

function itemClick(qqgroup: Qqgroup) {
  qqgroup.stateStr = 'QQ'
  router.push({ path: '/picturedetail', query: { ...qqgroup } })
}
</script>

<template>
  <div class="qqgroup">
    <el-row>
      <el-col :span="3" v-for="qqgroup in tableData" :key="qqgroup.id">
        <div class="item" @click="itemClick(qqgroup)">
          <img class="itemSrc" :src="'https://www.nkbfg.asia/api/media' + qqgroup.path" />
          <div v-text="qqgroup.title"></div>
          <div class="authandtime">
            <span class="auth" v-text="qqgroup.username"></span>
            <span class="time" v-text="qqgroup.gmtmodified"></span>
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
.qqgroup {
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
