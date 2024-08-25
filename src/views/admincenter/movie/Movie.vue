<!-- eslint-disable no-undef -->
<script setup lang="ts" name="movie">
import { ref, reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { getPageAndCondition, update } from '@/api/media/movie'
import { Movie } from '@/api/media/type'
import { Page } from '@/api/type'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import { getByIds } from '@/api/user/user'
import { UserInfo } from '@/api/user/type'

const router = useRouter()
const page = reactive<Page>({
  pageNo: 1,
  pageSize: 10,
  uid: '',
  state: 1
})

const total = ref()
const movie = ref<Movie>()
const confirmDialongRef = ref<typeof ConfirmDialog>()
const tableData = ref<Movie[]>()
let users: UserInfo[] = []
async function pageQuery() {
  const moviePage = await getPageAndCondition(page)
  const uids = moviePage.records.map((movie) => {
    return movie.uid
  })
  if (uids && uids.length) {
    users = await getByIds(uids)
  }
  moviePage.records.forEach((movie) => {
    users.forEach((user) => {
      if (movie.uid === user.id) {
        movie.username = user.username
      }
    })
    movie.reason = ''
  })
  tableData.value = moviePage.records
  total.value = moviePage.total
}

onBeforeMount(() => {
  pageQuery()
})
function handleshow(movie: Movie) {
  router.push({ path: '/moviedetail', query: { ...movie } })
}

function handlePublic() {
  movie.value!.state = 2
  update(movie.value!).then(() => {
    ElMessage.success('审核已通过')
    pageQuery()
  })
}

function handleNotPubPic(reason: string) {
  movie.value!.state = 3
  movie.value!.reason = reason
  update(movie.value!).then(() => {
    ElMessage.success('审核不通过')
    pageQuery()
  })
}

function pubPic(row: Movie) {
  movie.value = JSON.parse(JSON.stringify(row))
  confirmDialongRef.value!.pubdialogVisible = true
}

function notPubPic(row: Movie) {
  movie.value = JSON.parse(JSON.stringify(row))
  confirmDialongRef.value!.deledialogVisible = true
}
</script>

<template>
  <div class="friendsget">
    <div class="fcontainer">
      <ConfirmDialog ref="confirmDialongRef" @public="handlePublic" @notpublic="handleNotPubPic" />
      <el-table :data="tableData" style="width: 100%" height="calc(100vh - 3rem)" show-overflow-tooltip>
        <el-table-column prop="title" label="标题" width="120" />
        <el-table-column prop="description" label="描述" width="180" />
        <el-table-column prop="username" label="上传人" width="80" />
        <el-table-column prop="gmtcreate" label="上传日期" width="165" />
        <el-table-column prop="gmtmodified" label="更新日期" width="165" />
        <!-- <el-table-column label="查看视频" width="100">
          <template #default="scope">
            <a :href="scope.row.path ? 'https://www.nkbfg.asia/api/media' + scope.row.path : 'https://www.nkbfg.asia/api/media/movie/default.png'" class="showImage" target="_blank">查看</a>
          </template>
        </el-table-column> -->
        <el-table-column fixed="right" label="操作" width="160">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleshow(scope.row)">查看</el-button>
            <el-button link type="primary" size="small" @click="pubPic(scope.row)">通过</el-button>
            <el-button link type="primary" size="small" @click="notPubPic(scope.row)">不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="page.pageNo"
        v-model:page-size="page.pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="pageQuery"
        @current-change="pageQuery"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.friendsget {
  width: 100%;
  .fcontainer {
    .uploadbutton {
      margin-bottom: 0.2rem;
    }
  }
}
</style>
