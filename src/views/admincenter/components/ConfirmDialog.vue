<script setup lang="ts" name="confirmDialog">
import { ref, defineEmits } from 'vue'

const $emit = defineEmits(['notpublic', 'public'])
const deledialogVisible = ref<boolean>(false)
const pubdialogVisible = ref<boolean>(false)
const reason = ref<string>('')

function confirmNotPub() {
  deledialogVisible.value = false
  $emit('notpublic', reason.value)
}

function confirmPub() {
  pubdialogVisible.value = false
  $emit('public')
}

defineExpose({ deledialogVisible, pubdialogVisible })
</script>

<template>
  <div class="confirmDialog">
    <el-dialog v-model="deledialogVisible" title="填写不通过理由" width="500">
      <el-input v-model="reason" type="textarea" rows="2" />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="deledialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmNotPub">确定</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="pubdialogVisible" title="你确定通过审核吗？" width="500">
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
