<template>
  <div class="layout-container">

    <!--查询表单-->
    <e-search :columns="columns" :loading="loading" @search="search"></e-search>

    <!--按钮-->
    <div class="layot-container-button">
      <el-button type="primary" :icon="Plus" @click="handleAdd">{{ $t('message.common.add') }}</el-button>
      <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel(chooseData)">
        <template #reference>
          <el-button type="danger" :icon="Delete" :disabled="chooseData.length === 0">{{ $t('message.common.delBat')
          }}</el-button>
        </template>
      </el-popconfirm>
    </div>


    <!--表格-->
    <div class="layout-container-table">
      <e-table ref="table" v-model:page="page" v-loading="loading" :showIndex="true" :showSelection="true"
        :data="tableData" @getTableData="getTableData" @selection-change="handleSelectionChange">

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


      </e-table>

    </div>



    <!--编辑-->
    <el-dialog v-model="editVisible" title="新建" width="70%" draggable destroy-on-close center
      :close-on-click-modal="false">

      <e-form :schemas="schemas" :rules="rules"></e-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">Cancel</el-button>
          <el-button type="primary">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>


  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import ESearch from '@/components/e-search/index.vue'
import ETable from '@/components/e-table/index.vue'
import EForm from '@/components/e-form/index.vue'

import { Page } from '@/components/table/type'
import { getData, del } from '@/api/table'

import {read,create,update,deleted } from '@/api/admin/user'
import { ElMessage, FormRules } from 'element-plus'

import { selectData, radioData } from './enum'
import { Plus, Search, Delete } from '@element-plus/icons'
import { StatusOptions } from '@/types/global'

// #region 查询

const loading = ref(true)
const tableData = ref([])
// 分页参数, 供table使用
const page: Page = reactive({
  index: 1,
  size: 20,
  total: 0
})
const columns = ref([
  {
    label: "采集名称",
    prop: "name",
    type: "input",
  },
  {
    label: "栏目",
    prop: "columnId",
    type: "select",
    options: []
  },
  {
    label: "采集地址",
    prop: "url",
    type: "input",
  },
  {
    label: "采集类型",
    prop: "type",
    type: "select",
    options: []
  },
  {
    label: "下次时间",
    prop: "nextTime",
    type: "date",
  },
]);

const search = async (rules:any[]) => {
  page.index = 1;
  await fetchData(rules);
};

const fetchData = (rules:any[]) => {
  loading.value = true
  let params = {
    page: page.index,
    pageSize: page.size,
    rules
  }
  getData(params)
    .then(res => {
      tableData.value = res.data.list
      page.total = Number(res.data.pager.total)
    })
    .finally(() => {
      loading.value = false
    })
}

fetchData([])
//选中数据
const chooseData = ref([])
const handleSelectionChange = (val: []) => {
  chooseData.value = val
}
// #endregion




// 新增弹窗功能
const handleAdd = () => {
  editVisible.value = true;
}
// 编辑弹窗功能
const handleEdit = (row: object) => {
  editVisible.value = true;
}




//编辑
const editVisible = ref(false)
const schemas = computed<any[]>(() => [
  { prop: "id", type: "hidden" },
  {
    label: "采集名称",
    prop: "name",
    type: "input",
    tooltip:'我是一个提示信息',
    span: 12,
  },
  {
    label: "采集方式",
    prop: "type",
    type: "select",
    span: 12,
  },
  {
    label: "采集类型",
    prop: "collectType",
    type: "select",
    span: 12,
  },
  {
    label: "栏目",
    prop: "columnId",
    type: "cascader",
    span: 12,
  },
  {
    label: "状态",
    prop: "status",
    type: "radio",
    span: 8,
    options: StatusOptions.value
  },
  {

    label: "发布状态",
    prop: "isPublish",
    type: "switch",
    span: 4,
  },
  {

    label: "执行间隔",
    prop: "interval",
    type: "number",
    help: "自动采集的间隔分钟数,为0则不自动执行",
    span: 6,
  },
  {
    field: "configList",
    label: "采集配置",
    type: "table",
    span: 24,
    addTemplate: {
      index: 0,
      filed: "",
      type: "",
      fromDetail: false,
      characterBegin: "",
      characterEnd: "",
      jsonKey: "",
      dataType: 0,
    },
    columns: [
      {
        dataIndex: "field",
        slotName: "field",
        titleSlotName: "field1",
        tooltip: "记录数和内容编号必须添加填写规则,如果是栏目采集 “标题” 字段会自动赋值栏目名称",
        title: "字段",
        align: "center",
        type: "select",
        width: "150",
        //options: fieldOptions,
        rules: [{ required: true, message: "请选择字段" }],
      },
      {
        dataIndex: "type",
        slotName: "type",
        titleSlotName: "type1",
        tooltip: "字段的匹配类型,可根据实际情况混合使用,正则内容需添加上面的列表开始结束匹配区域块",
        title: "类型",
        align: "center",
        type: "select",
        width: "120",
        //options: matchTypeOptions,
        rules: [{ required: true, message: "请选择字段匹配类型" }],
      },
      {
        dataIndex: "fromDetail",
        slotName: "fromDetail",
        titleSlotName: "fromDetail1",
        tooltip: "打开即从详情页面获取该字段内容,则必须填写采集 “详情地址” 字段规则",
        title: "详情",
        align: "center",
        type: "switch",
        width: "80",
      },
      {
        dataIndex: "characterBegin",
        slotName: "characterBegin",
        titleSlotName: "characterBegin1",
        tooltip: "匹配字段内容的开始规则,如果是选择器或Xpath,可全部填写在此,默认自动拼接 “结束” 内容,结束可放空",
        title: "开始",
        align: "center",
        type: "input",
      },
      {
        dataIndex: "characterEnd",
        slotName: "characterEnd",
        titleSlotName: "characterEnd1",
        tooltip: "匹配字段内容的结束规则,如果是选择器或Xpath,可全部填写在此,默认自动拼接 “开始” 内容,开始可放空",
        title: "结束",
        align: "center",
        type: "input",
      },
      {
        dataIndex: "jsonKey",
        slotName: "jsonKey",
        titleSlotName: "jsonKey1",
        tooltip: "类型为 “JSON” 或 Elements元素需要获取 content,src,id,href等属性值,填写对应的属性名称",
        title: "键名",
        align: "center",
        type: "input",
        width: '110'
      },
      {
        dataIndex: "slotIndex",
        slotName: "slotIndex",
        titleSlotName: "slotIndex1",
        tooltip: "类型为 “选择器” 可能获取到多个匹配元素,填写对应的索引从1开始",
        title: "索引",
        align: "center",
        type: "input",
        width: "50",
      },
      {
        dataIndex: "count",
        slotName: "count",
        titleSlotName: "count1",
        tooltip: "统计匹配到元素个数,如记录数,评论数等无直接数字可采集的内容",
        title: "统计",
        align: "center",
        type: "switch",
        width: "50",
      },
      {
        dataIndex: "innerHtml",
        slotName: "innerHtml",
        titleSlotName: "innerHtml1",
        tooltip: "如需获取匹配到元素的完整html内容,如内容,描述等,请打开此开关",
        title: "Html",
        align: "center",
        type: "switch",
        width: "50",
      },
      {
        dataIndex: "saveImg",
        slotName: "saveImg",
        titleSlotName: "saveImg1",
        tooltip: "采集到的图片地址将保存到本地,替换原有网站的图片地址",
        title: "图片",
        align: "center",
        type: "switch",
        width: "50",
      },
      {
        dataIndex: "isDisplace",
        slotName: "isDisplace",
        titleSlotName: "isDisplace1",
        tooltip: "采集到的内容字符串将会匹配系统替换管理中的原词汇经行替换操作",
        title: "替换",
        align: "center",
        type: "switch",
        width: "50",
      },
      {
        dataIndex: "stringFormat",
        slotName: "stringFormat",
        titleSlotName: "stringFormat1",
        tooltip: "采集的内容经行二次封装,“如详情地址” 可能不完整或只有详情编号,需要原网址拼接,采集内容将作为替换参数替换输入的字符串中 “{0}” 经行替换操作 ",
        title: "格式化",
        align: "center",
        type: "input",
        width: "120"
      },
      {
        dataIndex: "remark",
        slotName: "remark",
        titleSlotName: "remark1",
        tooltip: "扩展字段的说明描述",
        title: "备注",
        align: "center",
        type: "input",
        width: '100'
      },
    ],
  },
]);
const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入采集名称" }],
  collectType: [{ required: true, message: "请选择采集类型" }],
  columnId: [{ required: true, message: "请选择采集配置" }],
  url: [{ required: true, message: "请输入采集地址" }],
  type: [{ required: true, message: "请选择采集类型" }],
  status: [{ required: true, message: "请选择状态" }],
  interval: [{ required: true, message: "请输入执行间隔" }],
  count: [{ required: true, message: "请输入采集数量" }],
});

// 删除功能
const handleDel = (data: object[]) => {
  let params = {
    ids: data.map((e: any) => {
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
</script>

<style lang="scss" scoped></style>