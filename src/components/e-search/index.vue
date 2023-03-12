<!--通用查询表单-->

<template>
  <div style="padding: 15px;">
    <!--表单-->
    <el-form v-bind="$attrs" ref="searchRef" :model="formModel" :label-width="'90px'" :label-position="'right'">
      <el-row :gutter="6">
        <template v-for="(item, i) in list" :key="i">
          <el-col :span="6" v-show="i < showCount || expand">
            <el-form-item :label="item.label">

              <!--input-->
              <el-input v-if="item.type === 'input'" v-model="formModel[item.prop]" />

              <!--select-->
              <el-select v-if="item.type === 'select'" v-model="formModel[item.prop]" clearable filterable
                placeholder="Select">
                <el-option v-for="option in item.options" :key="option.value" :label="option.label"
                  :value="option.value" />
              </el-select>

              <!--date-->
              <el-date-picker v-if="item.type === 'date'" v-model="formModel[item.prop]" type="daterange" unlink-panels
                range-separator="~" :shortcuts="shortcuts" start-placeholder="开始时间" end-placeholder="结束时间" />

            <!--tree-->
              <!-- <el-tree-select v-if="item.type === 'tree'" v-model="formModel[item.prop]" :data="item.options || []"
                      :render-after-expand="false" /> -->



            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!--按钮-->
    <div class="search-btn">
      <el-button :icon="Search" type="primary" @click="search">查询</el-button>
      <el-button :icon="RefreshLeft" @click="reset(searchRef)">重置</el-button>
      <el-button v-if="expand" :icon="ArrowUp" link @click="expand = !expand"></el-button>
      <el-button v-else :icon="ArrowDown" link @click="expand = !expand"></el-button>
    </div>
    <el-divider class="divider" />
  </div>
</template>
  
<script lang="ts" setup>
import { computed, ref, reactive, watch, nextTick, onMounted } from "vue";

import { Search, RefreshLeft, ArrowDown, ArrowUp } from "@element-plus/icons";
import { FormInstance } from "element-plus";
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
const searchRef = ref<FormInstance>()
//查询表单
const expand = ref(false);
const formModel: any = ref();
const list: any = ref([]);

//Prop输入监听
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
      if (item.type && item.type !== "image") {
        filterList.push(item);
        switch (item.type) {
          case "date":
            model[item.prop] = [];
            break;
          default:
            model[item.prop] = "";
            break;
        }
      }
    });
    formModel.value = model;
    list.value = filterList;
  },
  {
    immediate: true, // 这个属性是重点啦
    deep: true, // 深度监听的参数
  }
);


const search = () => {
  //console.log(formModel.value);
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
.el-select{
  width: 100%;
}

.search-btn {
  margin: 0 auto;
}

.divider {
  margin: 10px 0 0;
}
</style>
  