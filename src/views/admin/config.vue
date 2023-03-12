<template>
  <div class="layout-container">
    <el-card>
  
    <el-tabs v-bind="$attrs"  v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="系统配置" name="first">User</el-tab-pane>
      <el-tab-pane label="用户配置" name="second">Config</el-tab-pane>
      <el-tab-pane label="权限配置" name="third">Role</el-tab-pane>
      <el-tab-pane label="任务" name="fourth">Task</el-tab-pane>
    </el-tabs>
  </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<style>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
