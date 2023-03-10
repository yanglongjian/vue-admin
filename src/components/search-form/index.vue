<!--通用查询表单-->

<template>
    <div>
      <el-row style="padding: 10px" v-if="list.length > 0">
        <el-col :flex="1">
          <el-form
          v-bind="$attrs"
            ref="formRef"
            :model="formModel"
            :label-width="'110px'"
            :label-position="'right'"
            label-align="right"
          >
            <!--字段类型判断-->
            <el-row :gutter="6">
              <template v-for="(item, i) in list" :key="i">
                <el-col :span="6" v-show="i < showCount || expand">
                  <el-form-item :field="item.dataIndex" :label="item.title">
                    <!--输入框-->
                    <el-input
                      v-if="item.type == 'input'"
                      v-model="formModel[item.dataIndex]"
                      :placeholder="`请输入${item.title}`"
                    />
  
                    <!--number-->
                    <el-input-number
                      v-if="item.type == 'number'"
                      v-model="formModel[item.dataIndex]"
                      :placeholder="`请输入${item.title}`"
                    />
  
                    <!--下拉框-->
                    <el-select
                      v-if="item.type == 'select'"
                      v-model="formModel[item.dataIndex]"
                      :options="item.options"
                      :placeholder="`请输入${item.title}`"
                      allow-clear
                      allow-search
                    />
  
  
                     <!--tree-->
                        <el-tree-select
                          v-if="item.type == 'tree' && item.options"
                          v-model="formModel[item.dataIndex]"
                          :data="item.options"
                          :placeholder="`请选择${item.title}`"
                          :allow-search="true"
                        >
                          <template #tree-slot-icon>
                            <icon-calendar />
                          </template>
                        </el-tree-select>
  
                    <!--日期选择框-->
                    <el-range-picker
                      v-if="item.type == 'date'"
                      v-model="formModel[item.dataIndex]"
                      :shortcuts="rangeShortcuts as unknown as ShortcutType[]"
                      :disabledDate="(current) => dayjs(current).isAfter(dayjs())"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
              </template>
            </el-row>
  
            
            <el-row :gutter="6">
              <el-col :span="12" :offset="10">
                <el-button type="primary" :loading="props.loading" @click="search">
                  <template #icon>
                    <icon-search />
                  </template>
                  {{ $t("searchTable.form.search") }}
                </el-button>
                &nbsp;
                <el-button @click="reset">
                  <template #icon>
                    <icon-refresh />
                  </template>
                  {{ $t("searchTable.form.reset") }}
                </el-button>
                &nbsp;
                <a v-if="list.length > showCount" @click="expand = !expand">
                  <template v-if="expand">
                    <icon-double-up style="font-size: 16px" />
                  </template>
                  <template v-else>
                    <icon-double-down style="font-size: 16px" />
                  </template>
                  展开
                </a>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
  
      <el-row style="padding: 10px">
        <el-form-item>
            <el-button type="primary" @click="search" :loading="loading">查询</el-button>
            <el-button>重置</el-button>
            </el-form-item>
      </el-row>
      <el-divider style="margin-top: 0" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick, onMounted } from "vue";
  import dayjs from "dayjs";

  
  const emits = defineEmits(["search"]);
  const formRef = ref();
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
  
  onMounted(() => {
    if (props.columns.length == 0) return;
    let model: any = {};
    props.columns.forEach((item: any) => {
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
    () => props.columns,
    (array) => {
      let model: any = {};
      let filterList: any = [];
  
      array.forEach((item: any) => {
        if (item.type && item.type !== "image") {
          filterList.push(item);
          switch (item.type) {
            case "date":
              model[item.dataIndex] = [];
              break;
            default:
              model[item.dataIndex] = "";
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
  };
  
  const reset = () => {
    formRef.value.resetFields();
  };
  </script>
  <style lang="less" scoped>
  </style>
  