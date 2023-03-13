<!--通用查询表单-->

<template>
  <div style="padding: 15px;">
    <!--表单-->
    <el-form v-bind="$attrs" ref="searchRef" :model="formModel" :label-width="'90px'" :label-position="'right'">
      <el-row :gutter="6">
        <template v-for="(item, i) in columnList" :key="i">
          <el-col :span="6" v-show="i < showCount || expand">
            <el-form-item :label="item.label" :prop="item.prop">

              <!--input-->
              <el-input v-if="item.type === 'input'" v-model="formModel[item.prop]" />

              <!--select-->
              <el-select v-if="item.type === 'select'" v-model="formModel[item.prop]" clearable filterable
                placeholder="Select">
                <el-option v-for="option in item.options" :key="option.value" :label="option.label"
                  :value="option.value" />
              </el-select>

              <!--cascader-->
              <el-cascader v-if="item.type === 'cascader'" v-model="formModel[item.prop]" :options="item.options" />

              <!--date-->
              <el-date-picker v-if="item.type === 'date'" v-model="formModel[item.prop]" type="daterange" unlink-panels
                range-separator="~" :shortcuts="shortcuts" start-placeholder="开始时间" end-placeholder="结束时间" />

            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!--按钮-->
    <div class="search-btn">
      <el-button :loading="loading" :icon="Search" type="primary" @click="search">查询</el-button>
      <el-button :icon="RefreshLeft" @click="reset(searchRef)">重置</el-button>
      <el-button v-if="expand" :icon="ArrowUp" link @click="expand = !expand"></el-button>
      <el-button v-else :icon="ArrowDown" link @click="expand = !expand"></el-button>
    </div>
    <el-divider class="divider" />
  </div>
</template>
  
<script lang="ts" setup>
import { ref, watch } from "vue";
import { Search, RefreshLeft, ArrowDown, ArrowUp } from "@element-plus/icons";
import { FormInstance, ElMessage } from "element-plus";
import dayjs from "dayjs";
const shortcuts = [
  {
    text: '最近三天',
    value: () => [dayjs().subtract(2, 'day'), dayjs()],
  },
  {
    text: '最近七天',
    value: () => [dayjs().subtract(1, 'week'), dayjs()],
  },
  {
    text: '最近一个月',
    value: () => [dayjs().subtract(1, 'month'), dayjs()],
  },
];

const emits = defineEmits(["search"]);
//查询表单
const searchRef = ref<FormInstance>()
const expand = ref(false);
const formModel: any = ref();
const columnList: any = ref([]);

//传参
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  showCount: {
    type: Number,
    default: 4,
  },
  columns: {
    type: Array<any>,
    default: [],
    required: true,
  },
});

watch(
  () => props.columns,
  (array: any[]) => {
    let model: any = {};
    let filterList: any = [];
    array.forEach((item: any) => {
      filterList.push(item);
      switch (item.type) {
        case "date":
          model[item.prop] = [];
          break;
        default:
          model[item.prop] = "";
          break;
      }
    });
    formModel.value = model;
    columnList.value = filterList;
  },
  {
    immediate: true, // 这个属性是重点啦
    deep: true, // 深度监听的参数
  }
);


const search = () => {
  let rules: any[] = [];
  for (const item in formModel.value) {
    let column = columnList.value.find((m: any) => m.prop === item)
    if (!column) {
      ElMessage({
        type: 'warning',
        message: `指定属性${item}不存在`
      })
      return;
    }
    const itemValue = formModel.value[item];

    if (
      !itemValue ||
      itemValue == 0 ||
      itemValue.length == 0
    )
      continue;

    if (column.type === "date") {
      rules.push({
        Field: item,
        Value: itemValue[0].toLocaleDateString(),
        Operate: 8,
      });
      rules.push({
        Field: item,
        Value: itemValue[1].toLocaleDateString() + " 23:59:59",
        Operate: 6,
      });
    } else {
      rules.push({
        Field: item,
        Value: `${itemValue}`.trim(),
        Operate: column.type === "input" ? 11 : 3
      });
    }
  }
  emits("search", rules);
}



const reset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()

};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 10px;
}

.el-select {
  width: 100%;
}

.search-btn {
  margin: 0 auto;
}

.divider {
  margin: 10px 0 0;
}
</style>
  