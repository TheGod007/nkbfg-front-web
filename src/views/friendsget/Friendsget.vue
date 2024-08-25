<script setup lang="ts" name="friendsget">
import { ref, reactive, onBeforeMount, watchEffect } from 'vue'
import type { UserVo } from '@/api/user/type'
import { getAllProvince, getAllCityByProvince, getAllDistrictByCity, getPageAndCondition } from '@/api/user/user'

const userVo = reactive<UserVo>({
  pageNo: 1,
  pageSize: 10,
  sex: '',
  province: '',
  city: '',
  district: '',
  beginTime: '',
  endTime: ''
})

const sexs = [
  { id: 1, value: '男' },
  { id: 2, value: '女' }
]

const districts = ref()

const citys = ref()

const provinces = ref()

const total = ref()

const tableData = ref()

const isdisabled = ref<boolean>(false)

onBeforeMount(() => {
  getAllProvince().then((res) => {
    provinces.value = res
  })
  getPageAndCondition(userVo).then((res) => {
    res.records.forEach((u) => {
      if (!u.birthday) {
        u.birthday = '***'
      }
    })
    tableData.value = res.records
    total.value = res.total
  })
})

function userPageQuery() {
  setTimeout(() => {
    isdisabled.value = true
  }, 399)

  getPageAndCondition(userVo).then((res) => {
    res.records.forEach((u) => {
      if (!u.birthday) {
        u.birthday = '***'
      }
    })
    tableData.value = res.records
    total.value = res.total
  })
  setTimeout(() => {
    isdisabled.value = false
  }, 3000)
}

watchEffect(() => {
  if (userVo.province) {
    getAllCityByProvince(userVo.province).then((res) => {
      citys.value = res
    })
  } else {
    citys.value = null
  }
  districts.value = null
  userVo.city = ''
  userVo.district = ''
})

watchEffect(() => {
  if (userVo.city) {
    getAllDistrictByCity(userVo.city).then((res) => {
      districts.value = res
    })
  } else {
    districts.value = null
  }
  userVo.district = ''
})
</script>

<template>
  <div class="friendsget">
    <div class="fcontainer">
      <div class="selectcodition">
        <el-row :gutter="0">
          <el-col :span="8">
            所在省：
            <el-select v-model="userVo.province" class="m-2" placeholder="请选择省" clearable>
              <el-option v-for="item in provinces" :key="item" :label="item" :value="item" />
            </el-select>
          </el-col>
          <el-col :span="8">
            所在市：
            <el-select v-model="userVo.city" class="m-2" placeholder="请选择市" clearable>
              <el-option v-for="item in citys" :key="item" :label="item" :value="item" />
            </el-select>
          </el-col>
          <el-col :span="8">
            所在县：
            <el-select v-model="userVo.district" class="m-2" placeholder="请选择县" clearable>
              <el-option v-for="item in districts" :key="item" :label="item" :value="item" />
            </el-select>
          </el-col>
        </el-row>
        <div class="rowcotainer">
          <el-row :gutter="0">
            <el-col :span="5">
              性别：
              <el-select v-model="userVo.sex" class="m-3" placeholder="请选择性别" clearable>
                <el-option v-for="item in sexs" :key="item.id" :label="item.value" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="7">
              出生日期开始：
              <el-date-picker v-model="userVo.beginTime" type="date" placeholder="最早出生年" />
            </el-col>
            <el-col :span="7">
              出生日期结束：
              <el-date-picker v-model="userVo.endTime" type="date" placeholder="最晚出生年" />
            </el-col>
            <el-col :span="5">
              <el-button style="width: 50%" :disabled="isdisabled" type="primary" @click="userPageQuery">查询</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-table :data="tableData" class="my-el-table" show-overflow-tooltip>
        <el-table-column fixed prop="username" label="用户名" width="90" />
        <el-table-column fixed prop="realname" label="真实姓名" width="90" />
        <el-table-column prop="sex" label="性别" width="60" />
        <el-table-column prop="birthday" label="出生日期" width="120" />
        <el-table-column prop="phone" label="手机号" width="120" />
        <el-table-column prop="province" label="省" width="120" />
        <el-table-column prop="city" label="市" width="120" />
        <el-table-column prop="district" label="县" width="120" />
        <el-table-column prop="cardnum" label="身份证号码" width="200" />
      </el-table>
      <el-pagination
        v-model:current-page="userVo.pageNo"
        v-model:page-size="userVo.pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="userPageQuery"
        @current-change="userPageQuery"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.friendsget {
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #f9faf9;
  .fcontainer {
    padding: 0rem 0.2rem;
    .m-2 {
      width: 4.8rem;
    }
    .selectcodition {
      padding: 0.58rem 0rem;
      .rowcotainer {
        padding-top: 0.4rem;
      }
      .m-3 {
        width: 3.2rem;
      }
    }
    .my-el-table {
      width: 100%;
      height: calc(100vh - 8rem);
    }
  }
}
</style>
