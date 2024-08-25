<!-- eslint-disable no-undef -->
<script setup lang="ts" name="picture">
import { ref, reactive, onBeforeMount } from 'vue'
import { getPageAndCondition, deleteById, update } from '@/api/media/picture'
import { Picture, PicturePage } from '@/api/media/type'
import { Page } from '@/api/type'
import MyDialog from './components/MyDialog.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const page = reactive<Page>({
  pageNo: 1,
  pageSize: 10,
  uid: userStore.userInfo!.id,
  state: undefined
})
const pId = ref<string>()
const picture = ref<Picture>()
const total = ref()
const myDialogRef = ref<typeof MyDialog>()
const confirmDialongRef = ref<typeof ConfirmDialog>()
const tableData = ref<Picture[]>()

function handlerResult(res: PicturePage) {
  res.records.forEach((pic) => {
    switch (pic.state) {
      case 0:
        pic.stateStr = '待发布'
        break
      case 1:
        pic.stateStr = '审核中'
        break
      case 2:
        pic.stateStr = '审核通过'
        break
      case 3:
        pic.stateStr = '审核未过'
        break
      default:
        pic.stateStr = '待发布'
        break
    }
  })
}

onBeforeMount(() => {
  getPageAndCondition(page).then((res) => {
    tableData.value = res.records
    handlerResult(res)
    total.value = res.total
  })
})

function pageQuery() {
  getPageAndCondition(page).then((res) => {
    handlerResult(res)
    tableData.value = res.records
    total.value = res.total
  })
}

function handleModify(row: Picture) {
  myDialogRef.value!.picture = JSON.parse(JSON.stringify(row))
  myDialogRef.value!.setDialogVisible(true)
}
function handlePublic() {
  picture.value!.state = 1
  update(picture.value!).then(() => {
    ElMessage.success('你的申请以提交')
    pageQuery()
  })
}

function handleDelete() {
  deleteById(pId.value!).then(() => {
    ElMessage.success('删除成功')
    pageQuery()
  })
}

function uploadImage() {
  myDialogRef.value!.setDialogVisible(true)
}

function deletePic(id: string) {
  pId.value = id
  confirmDialongRef.value!.deledialogVisible = true
}

function pubPic(row: Picture) {
  picture.value = JSON.parse(JSON.stringify(row))
  confirmDialongRef.value!.pubdialogVisible = true
}
</script>

<template>
  <div class="friendsget">
    <div class="fcontainer">
      <el-row :gutter="0">
        <el-col :span="4">
          <el-button class="uploadbutton" @click="uploadImage">上传</el-button>
          <MyDialog ref="myDialogRef" @save="pageQuery" />
          <ConfirmDialog ref="confirmDialongRef" @public="handlePublic" @delete="handleDelete" />
        </el-col>
      </el-row>

      <el-table :data="tableData" style="width: 100%" height="calc(100vh - 2rem)" show-overflow-tooltip>
        <el-table-column prop="title" label="标题" width="120" />
        <el-table-column prop="description" label="描述" width="180" />
        <el-table-column prop="gmtcreate" label="上传日期" width="165" />
        <el-table-column prop="gmtmodified" label="更新日期" width="165" />
        <el-table-column prop="stateStr" label="状态" width="85" />
        <!-- <el-table-column label="查看图片" width="100">
          <template #default="scope">
            <a
              :href="
                scope.row.path
                  ? 'https://www.nkbfg.asia/api/media' + scope.row.path
                  : 'https://www.nkbfg.asia/api/media/picture/default.png'
              "
              class="showImage"
              target="_blank"
            >
              查看
            </a>
          </template>
        </el-table-column> -->
        <el-table-column fixed="right" label="操作" width="160">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleModify(scope.row)">修改</el-button>
            <el-button link type="primary" size="small" @click="deletePic(scope.row.id)">删除</el-button>
            <el-button v-show="scope.row.state == 0" link type="primary" size="small" @click="pubPic(scope.row)">发布</el-button>
            <el-popover placement="top-start" title="原因：" :width="200" trigger="hover" :content="scope.row.reason">
              <template #reference>
                <el-button v-show="scope.row.state == 3" link type="primary" size="small">查看</el-button>
              </template>
            </el-popover>
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
