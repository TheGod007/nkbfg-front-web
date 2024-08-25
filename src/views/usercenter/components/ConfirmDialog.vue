<script setup lang="ts" name="confirmDialog">
import { ref, defineEmits } from 'vue'

const $emit = defineEmits(['delete', 'public'])
const deledialogVisible = ref<boolean>(false)
const pubdialogVisible = ref<boolean>(false)

function confirmDele() {
  deledialogVisible.value = false
  $emit('delete')
}

function confirmPub() {
  pubdialogVisible.value = false
  $emit('public')
}

defineExpose({ deledialogVisible, pubdialogVisible })
</script>

<template>
  <div class="confirmDialog">
    <el-dialog v-model="deledialogVisible" title="你确定要删除吗？" width="500">
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="deledialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmDele">确定</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="pubdialogVisible" title="你确定要发布吗？" width="500">
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="pubdialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmPub">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.confirmDialog {
}
</style>
