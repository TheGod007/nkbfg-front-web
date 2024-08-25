<!-- eslint-disable object-shorthand -->
<!-- eslint-disable prefer-template -->
<script setup lang="ts" name="counter">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as echarts from 'echarts/core'
import { BarChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import type { CountMap } from '@/api/user/type'
import { getCountMap } from '@/api/user/user'
// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
// 注册必须的组件
echarts.use([TitleComponent, LegendComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, BarChart, PieChart, LabelLayout, UniversalTransition, CanvasRenderer])
const countMap = ref<CountMap>({
  yearCountList: [],
  sexCountList: [],
  provinceCountList: []
})
const provinceCountEchart = ref<HTMLElement | null>(null)
const yearCountEchart = ref<HTMLElement | null>(null)
const sexCountEchart = ref<HTMLElement | null>(null)

function fetchData() {
  getCountMap().then((res) => {
    countMap.value = res
    if (provinceCountEchart.value && countMap.value) {
      const myChart = echarts.init(provinceCountEchart.value)
      const option = {
        title: {
          text: '脑控受害者地区分布柱状图',
          left: 'center' // 标题水平居中
        },
        tooltip: {},
        dataset: {
          // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
          // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
          // 如果不指定 dimensions，也可以通过指定 series.encode
          // 完成映射，参见后文。
          dimensions: ['province', 'num'],
          source: countMap.value.provinceCountList
        },
        grid: {
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            formatter: function (value: string) {
              return '{a|' + value.split('').join('\n') + '}'
            },
            rich: {
              a: {
                lineHeight: 16, // 控制行高，根据实际情况调整
                align: 'center'
              }
            }
          }
        },
        yAxis: {
          name: '人数',
          type: 'value',
          axisLine: {
            show: true,
            symbol: 'line',
            lineStyle: {
              type: 'solid'
            }
          }
        },
        series: [
          {
            name: '人数',
            type: 'bar',
            label: {
              show: true, // 显示数据标签
              position: 'top' // 数据标签显示在柱状图顶部
            }
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
    if (yearCountEchart.value && countMap.value) {
      const myChart = echarts.init(yearCountEchart.value)
      const option = {
        title: {
          text: '脑控受害者年龄分布柱状图',
          left: 'center' // 标题水平居中
        },
        tooltip: {},
        dataset: {
          // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
          // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
          // 如果不指定 dimensions，也可以通过指定 series.encode
          // 完成映射，参见后文。
          dimensions: ['year', 'num'],
          source: countMap.value.yearCountList
        },
        grid: {
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            formatter: function (value: string) {
              return '{a|' + value.split('').join('\n') + '}'
            },
            rich: {
              a: {
                lineHeight: 16, // 控制行高，根据实际情况调整
                align: 'center'
              }
            }
          }
        },
        yAxis: {
          name: '人数',
          type: 'value',
          axisLine: {
            show: true,
            symbol: 'line',
            lineStyle: {
              type: 'solid'
            }
          }
        },
        series: [
          {
            name: '人数',
            type: 'bar',
            label: {
              show: true, // 显示数据标签
              position: 'top' // 数据标签显示在柱状图顶部
            }
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
    if (sexCountEchart.value && countMap.value) {
      const myChart = echarts.init(sexCountEchart.value)
      const option = {
        title: {
          text: '脑控受害者性别分布饼状图',
          right: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '人数',
            type: 'pie',
            radius: '50%',
            data: countMap.value.sexCountList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  })
}
onMounted(() => {
  fetchData()
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    console.log('You are nice')
  })
})
</script>

<template>
  <div class="counter">
    <el-row class="el-row-1">
      <el-col :span="24">
        <div ref="provinceCountEchart" class="grid-content1" style="height: 100%; width: 100%"></div>
      </el-col>
    </el-row>
    <el-row class="el-row-2">
      <el-col :span="15">
        <div ref="yearCountEchart" class="grid-content1 el-col-2-1"></div>
      </el-col>
      <el-col :span="9">
        <div ref="sexCountEchart" class="grid-content1 el-col-2-2"></div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.counter {
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
  background-color: #f9faf9;
  :deep(.el-row-1) {
    height: 60%;
    .el-col {
      height: 100%;
      width: 100%;
    }
  }
  :deep(.el-row-2) {
    width: 100%;
    height: 40%;
    .el-col {
      height: 100%;
      width: 100%;
      .el-col-2-1 {
        height: 100%;
        width: 100%;
      }
      .el-col-2-2 {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
