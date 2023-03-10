<template>
  <div class="layout-container">

    <search-from :columns="columns"></search-from>


    <!-- <div class="layout-container-form flex space-between">
      <div class="layout-container-form-handle">
        <el-button type="primary" :icon="Plus" @click="handleAdd">{{ $t('message.common.add') }}</el-button>
        <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel(chooseData)">
          <template #reference>
            <el-button type="danger" :icon="Delete" :disabled="chooseData.length === 0">{{ $t('message.common.delBat') }}</el-button>
          </template>
        </el-popconfirm>
      </div>
      <div class="layout-container-form-search">
        <el-input v-model="query.input" :placeholder="$t('message.common.searchTip')" @change="getTableData(true)"></el-input>
        <el-button type="primary" :icon="Search" class="search-btn" @click="getTableData(true)">{{ $t('message.common.search') }}</el-button>
      </div>
    </div> -->





    <!--表格-->
    <div class="layout-container-table">
      <Table
        ref="table"
        v-model:page="page"
        v-loading="loading"
        :showIndex="true"
        :showSelection="true"
        :data="tableData"
        @getTableData="getTableData"
        @selection-change="handleSelectionChange"
      >
        
      <!--字段栏目-->
      
        <el-table-column prop="name" label="名称" sortable align="center" />
        <el-table-column prop="number" label="数字" sortable align="center" />
        <el-table-column prop="chooseName" label="选择器" sortable align="center" />
        <el-table-column prop="radioName" label="单选框" sortable align="center" />
        <el-table-column :label="$t('message.common.handle')" align="center" fixed="right" width="200">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)">{{ $t('message.common.update') }}</el-button>
            <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel([scope.row])">
              <template #reference>
                <el-button type="danger">{{ $t('message.common.del') }}</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>


      </Table>
    
      <Layer :layer="layer" @getTableData="getTableData" v-if="layer.show" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import SearchFrom from '@/components/search-form/index.vue'
import Table from '@/components/el-table/index.vue'
import { Page } from '@/components/table/type'
import { getData, del } from '@/api/table'
import Layer from './layer.vue'
import { ElMessage } from 'element-plus'
import type { LayerInterface } from '@/components/layer/index.vue'
import { selectData, radioData } from './enum'
import { Plus, Search, Delete } from '@element-plus/icons'

const columns = ref(() => [
  {
    title: "采集名称",
    dataIndex: "name",
    type: "input",
  },
  {
    title: "栏目",
    dataIndex: "columnId",
    type: "tree",
    slotName: "columnId",
  },
  {
    title: "采集地址",
    dataIndex: "url",
    slotName: "url",
    type: "input",
  },
  {
    title: "采集类型",
    dataIndex: "type",
    type: "select",
    slotName: "type",
    width: 100,
  },
  {
    title: "状态",
    dataIndex: "status",
    type: "select",
    slotName: "status",
    width: 100,
  },
  {
    title: "发布状态",
    dataIndex: "isPublish",
    slotName: "isPublish",
    width: 100,
  },
  {
    title: "参数",
    dataIndex: "parameter",
    width: 100,
  },
  {
    title: "采集页数",
    dataIndex: "count",
    width: 100,
  },
  {
    title: "执行间隔(m)",
    dataIndex: "interval",
    width: 100,
  },
  {
    title: "下次执行时间",
    dataIndex: "nextTime",
    type: "date",
  },
]);




// 存储搜索用的数据
const query = reactive({
      input: ''
    })
    // 弹窗控制器
    const layer: LayerInterface = reactive({
      show: false,
      title: '新增',
      showButton: true
    })
    // 分页参数, 供table使用
    const page: Page = reactive({
      index: 1,
      size: 20,
      total: 0
    })
    const loading = ref(true)
    const tableData = ref([])
    const chooseData = ref([])
    const handleSelectionChange = (val: []) => {
      chooseData.value = val
    }
    // 获取表格数据
    // params <init> Boolean ，默认为false，用于判断是否需要初始化分页
    const getTableData = (init: boolean) => {
      loading.value = true
      if (init) {
        page.index = 1
      }
      let params = {
        page: page.index,
        pageSize: page.size,
        ...query
      }
      getData(params)
      .then(res => {
        let data = res.data.list
        if (Array.isArray(data)) {
          data.forEach(d => {
            const select = selectData.find(select => select.value === d.choose)
            select ? d.chooseName = select.label : d.chooseName = d.choose
            const radio = radioData.find(select => select.value === d.radio)
            radio ? d.radioName = radio.label : d.radio
          })
        }
        tableData.value = res.data.list
        page.total = Number(res.data.pager.total)
      })
      .catch(error => {
        tableData.value = []
        page.index = 1
        page.total = 0
      })
      .finally(() => {
        loading.value = false
      })
    }
    // 删除功能
    const handleDel = (data: object[]) => {
      let params = {
        ids: data.map((e:any)=> {
          return e.id
        }).join(',')
      }
      del(params)
      .then(res => {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        getTableData(tableData.value.length === 1 ? true : false)
      })
    }
    // 新增弹窗功能
    const handleAdd = () => {
      layer.title = '新增数据'
      layer.show = true
      delete layer.row
    }
    // 编辑弹窗功能
    const handleEdit = (row: object) => {
      layer.title = '编辑数据'
      layer.row = row
      layer.show = true
    }
    getTableData(true)

</script>

<style lang="scss" scoped>
  
</style>