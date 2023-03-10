<!--编辑表单-->
<template>
    <div>
      <el-form
       
        ref="formRef"
        :model="formModel"
        :rules="props.rules"
        :disabled="props.disabled"
        @submit="handleSubmit"
      >
        <el-row :gutter="16">
          <template v-for="item in props.schemas" :key="item.field">
            <!--hidden-->
            <el-form-item
              v-if="item.type == 'hidden'"
              :field="item.field"
              v-show="false"
              :label="item.label"
            >
              <el-input v-model="formModel[item.field]" />
            </el-form-item>
  
            <el-col v-else :span="item.span">
              <el-form-item
                :field="item.field"
                :label="item.label"
                :label-col-flex="props.labelCol"
                :help="item.help"
              >
                <!--input-->
                <el-input
                  v-if="item.type == 'input'"
                  v-model="formModel[item.field]"
                  :placeholder="`请输入${item.label}`"
                  :readonly="item.readonly"
                />
  
                <!---password-->
                <el-input-password
                  v-if="item.type == 'password'"
                  v-model="formModel[item.field]"
                  :placeholder="`请输入${item.label}`"
                  :readonly="item.readonly"
                  allow-clear
                />
  
                <!--number-->
                <el-input-number
                  v-if="item.type == 'number'"
                  v-model="formModel[item.field]"
                  :placeholder="`请输入${item.label}`"
                />
  
                <!--inputtag-->
                <el-input-tag  v-if="item.type == 'tag'"
                  v-model="formModel[item.field]"
                   allow-clear/>
  
                   <!--textareel-->
                <el-textarea
                  v-if="item.type == 'textarea'"
                  v-model="formModel[item.field]"
                  :placeholder="`请输入${item.label}`"
                  :auto-size="{
                    minRows:5
                  }"
                />
  
  
                <!--select-->
                <el-select
                  v-if="
                    item.type == 'select' &&
                    item.options &&
                    item.options.length > 0
                  "
                  v-model="formModel[item.field]"
                  :placeholder="`请选择${item.label}`"
                  allow-clear
                  allow-search
                >
                  <el-option
                    v-for="option of item.options"
                    :value="option.value"
                    :label="option.label"
                  />
                </el-select>
  
                <!--multiple-->
                <el-select
                  v-if="item.type == 'multiple' && item.options"
                  v-model="formModel[item.field]"
                  :placeholder="`请选择${item.label}`"
                  multiple
                  allow-clear
                  allow-search
                >
                  <el-option
                    :value="tag.value"
                    v-for="tag in item.options"
                    :key="tag.value"
                    >{{ tag.label }}</el-option
                  >
                </el-select>
  
                <!--cascader级联选择-->
                <el-cascader
                  v-if="item.type == 'cascader' && item.options"
                  v-model="formModel[item.field]"
                  :options="item.options"
                  :placeholder="`请选择${item.label}`"
                  allow-clear
                  allow-search
                />
  
                <!--tree-->
                <el-tree-select
                  v-if="item.type == 'tree' && item.options"
                  v-model="formModel[item.field]"
                  :data="item.options"
                  :placeholder="`请选择${item.label}`"
                  :allow-search="true"
                >
                  <template #tree-slot-icon>
                    <icon-calendar />
                  </template>
                </el-tree-select>
  
                <!--date-->
                <el-date-picker
                  v-if="item.type == 'date'"
                  v-model="formModel[item.field]"
                  :placeholder="`请选择${item.label}`"
                />
                <!--time-->
                <el-time-picker
                  v-if="item.type == 'time'"
                  v-model="formModel[item.field]"
                  :placeholder="`请选择${item.label}`"
                />
  
                <!--radio-->
                <el-radio-group
                  v-if="item.type == 'radio' && item.options"
                  v-model="formModel[item.field]"
                >
                  <el-radio
                    :value="tag.value"
                    v-for="tag in item.options"
                    :key="tag.value"
                    >{{ tag.label }}</el-radio
                  >
                </el-radio-group>
  
                <!--checkbox-->
                <el-checkbox-group
                  v-if="item.type == 'checkbox' && item.options"
                  v-model="formModel[item.field]"
                >
                  <el-checkbox
                    :value="tag.value"
                    v-for="tag in item.options"
                    :key="tag.value"
                    >{{ tag.label }}</el-checkbox
                  >
                </el-checkbox-group>
  
                <!--slider滑块-->
                <el-slider
                  v-if="item.type == 'slider'"
                  v-model="formModel[item.field]"
                />
  
                <!--rate 评分-->
                <el-rate
                  v-if="item.type == 'rate'"
                  v-model="formModel[item.field]"
                  allow-clear
                />
  
                <!--switch-->
                <el-switch
                  v-if="item.type == 'switch'"
                  v-model="formModel[item.field]"
                />
  
                <!--image-->
                <upload-image
                  v-if="item.type == 'image'"
                  v-model="formModel[item.field]"
                  :limit="item.limit || 1"
                  :multiple="item.multiple || false"
                ></upload-image>
  
                <!--file-->
                <upload-file
                  v-if="item.type == 'file'"
                  v-model="formModel[item.field]"
                  :limit="item.limit || 1"
                  :multiple="item.multiple || false"
                ></upload-file>
  
  
                  <!--file-->
                  <upload-directory
                  v-if="item.type == 'directory'"
                  v-model="formModel[item.field]"
                ></upload-directory>
  
  
  
                <!--editor-->
                <editor
                  v-if="item.type == 'editor'"
                  v-model="formModel[item.field]"
                  :height="400"
                >
                </editor>
  
                <!--table-->
                <form-table
                  v-if="item.type == 'table'"
                  v-model="formModel[item.field]"
                  :columns="item.columns"
                  :addTemplate="item.addTemplate"
                  @update:model-errors="tableUpdate"
                >
                </form-table>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
  
        <!--按钮begin-->
        <el-row :gutter="16">
          <el-col :span="24">
            <el-form-item :label="''" :label-col-flex="props.labelCol">
              <el-button @click="handleClose">
                <template #icon>
                  <icon-close />
                </template>
                {{ btnTxt }}</el-button
              >
              &nbsp;
              <el-button
                type="primary"
                html-type="submit"
                :loading="props.loading"
              >
                <template #icon>
                  <icon-check-circle />
                </template>
                提交</el-button
              >
  
              &nbsp;
               <!--按钮插槽-->
            <slot name="edit-buttons" :values="formModel"></slot>
  
  
            </el-form-item>
          </el-col>
        </el-row>
        <!--按钮end-->
      </el-form>
      <!-- {{ formModel }} -->
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick, onMounted } from "vue"
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
      default: [],
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
        if(item.default){
          formModel.value[item.field]=item.default;
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
  <style lang="less" scoped>
  /deep/.arco-form-item-message-help {
    color: #ff7d00;
  }
  </style>
  