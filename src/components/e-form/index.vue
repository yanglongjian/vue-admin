<!--编辑表单-->
<template>
  <div>
    <el-form v-bind="$attrs" ref="editRef" :model="formModel" :rules="rules" :label-width="'120px'" status-icon>

      <el-row :gutter="6">
        <template v-for="(item, i) in schemas" :key="i">
          <el-col :span="item.span">
            <el-form-item :label="item.label" :prop="item.prop">

              <!--label提示信息-->
              <template #label>
                <el-tooltip v-if="item.tooltip"
                    effect="dark"
                    :content="item.tooltip"
                    placement="top"
                  >
                 <span> <el-icon><InfoFilled /></el-icon>{{ item.label }}</span>
                  </el-tooltip>
              </template>

              <!--hidden-->
              <el-input v-if="item.type === 'hidden'" v-show="false" v-model="formModel[item.prop]" />

              <!--input-->
              <el-input v-if="item.type === 'input'" v-model="formModel[item.prop]" />

              <!--number-->
              <el-input-number v-if="item.type === 'number'" v-model="formModel[item.prop]" />


              <!--select-->
              <el-select v-if="item.type === 'select'" v-model="formModel[item.prop]" clearable filterable
                placeholder="Select">
                <el-option v-for="option in item.options" :key="option.value" :label="option.label"
                  :value="option.value" />
              </el-select>

              <!--multiple-->
              <el-select v-if="item.type === 'multiple'" v-model="formModel[item.prop]" clearable filterable multiple
                placeholder="Select">
                <el-option v-for="option in item.options" :key="option.value" :label="option.label"
                  :value="option.value" />
              </el-select>



              <!--cascader-->
              <el-cascader v-if="item.type === 'cascader'" v-model="formModel[item.prop]" :options="item.options" />

              <!--checkbox-->
              <el-checkbox-group v-if="item.type === 'checkbox'" v-model="formModel[item.prop]">
                <el-checkbox v-for="option in item.options" :key="option.value" :label="option.label">{{ option.label
                }}</el-checkbox>
              </el-checkbox-group>

              <!--radio-->
              <el-radio-group v-if="item.type === 'radio'" v-model="formModel[item.prop]">
                <el-radio :label="option.value" v-for="option in item.options">{{ option.label }}</el-radio>
              </el-radio-group>

              <!--rate-->
              <el-rate v-if="item.type === 'rate'" v-model="formModel[item.prop]" />


              <!--switch-->
              <el-switch v-if="item.type === 'switch'" v-model="formModel[item.prop]" />


              <!--date-->
              <el-date-picker v-if="item.type === 'date'" v-model="formModel[item.prop]" type="date"
                :shortcuts="shortcuts" />

              <!--time-->
              <el-time-picker v-if="item.type === 'time'" v-model="formModel[item.prop]" arrow-control />


              <!--editor-->
              <tinymce v-if="item.type === 'editor'" v-model="formModel[item.prop]" />



              <!--table-->
              <eformtable  v-if="item.type == 'table'"
                v-model="formModel[item.field]"
                :columns="item.columns"
                :addTemplate="item.addTemplate"
                @update:model-errors="tableUpdate"
                ></eformtable>


            </el-form-item>
          </el-col>
        </template>
      </el-row>


    </el-form>
  </div>
</template>
  
<script lang="ts" setup>
import { computed, ref, reactive, watch, nextTick, onMounted } from "vue";
import tinymce from '@/components/tinymce/index.vue'
import eformtable from '@/components/e-form-table/index.vue'
import { InfoFilled} from '@element-plus/icons'
import dayjs from "dayjs";
const shortcuts = [
  {
    label: '昨日',
    value: () => dayjs().subtract(1, 'day')
  },
  {
    label: '今日',
    value: () => dayjs(),
  },
  {
    label: '前日',
    value: () => dayjs().subtract(2, 'day')
  },
  {
    label: '上周',
    value: () => dayjs().add(1, 'week'),
  },
  {
    label: '上个月',
    value: () => dayjs().add(1, 'month'),
  },
];
const emits = defineEmits(["close", "submit"]);

//编辑表单
const formRef = ref();
const formModel: any = ref();

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  labelCol: {
    type: String,
    default: "80px",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  schemas: {
    type: Array<any>,
    default: [],
  },
  rules: {
    type: Object,
    default:{},
  },
  btnTxt: {
    type: String,
    default: "关闭",
  },
});

onMounted(() => {
  if (props.schemas.length == 0) return;
  let model: any = {};
  props.schemas.forEach((item: any) => {
    switch (item.type) {
      case "hidden":
        model[item.field] = "0";
        break;
      case "multiple":
      case "checkbox":
      case "table":
        model[item.field] = [];
        break;
      case "switch":
        model[item.field] = false;
        break;
      default:
        model[item.field] = "";
        break;
    }
  });
  //如果没有传值用
  if (!formModel.value) {
    formModel.value = model;
  }
});

watch(
  () => props.schemas,
  (array) => {
    let model: any = {};
    if (array.length == 0) return;
    array.forEach((item: any) => {
      switch (item.type) {
        case "hidden":
          model[item.field] = "0";
          break;
        case "multiple":
        case "checkbox":
        case "table":
        case "tag":
          model[item.field] = [];
          break;
        case "switch":
          model[item.field] = false;
          break;
        case "number":
          model[item.field] = 0;
          break;
        default:
          model[item.field] = "";
          break;
      }
    });
    //如果没有传值用
    if (!formModel.value) {
      formModel.value = model;
    }
  },
  { immediate: true, deep: true }
);

const setData = (data: any) => {
  if (data) {
    //清空校验状态
    formRef.value.clearValidate();
    //直接合并进去
    Object.assign(formModel.value, data);
  } else {
    formRef.value.resetFields();

    props.schemas.forEach((item: any) => {
      if (item.default) {
        formModel.value[item.field] = item.default;
      }
    });


  }
};

//导出给父组件使用
defineExpose({
  setData,
});

const tableErrors = ref<Array<any>>();
const tableUpdate = (errors: any) => {
  tableErrors.value = errors;
};

//关闭
const handleClose = () => {
  emits("close");
};
//提交
const handleSubmit = ({ values, errors }: { values: any; errors: any }) => {
  if (tableErrors.value) {
    return;
  }
  if (!errors) {
    emits("submit", values);
  }
};
</script>
<style lang="scss" scoped>

::v-deep .el-select{
  width: 100%;
}
::v-deep .el-cascader{
  width: 100%;
}
</style>
  