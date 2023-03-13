<template>
  <div class="components">
    <el-collapse v-model="componentKeys" accordion :bordered="false" expandIconPosition="right">
      <el-collapse-item v-for="group in components" :name="group.key" :title="group.name">
        <div class="module-list">
          <div v-for="(item, index) in group.data" :key="index" class="module-item" @click="handleClickItem(item.type)">
            <component class="module-icon" :is="item.icon"></component>
            <span class="module-title">{{ item.name }}</span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
const components = ref([
  {
    name: '媒体组件',
    key: 'media',
    data: [
      {
        name: '轮播图',
        type: 'banner',
        icon: 'Picture'
      },
      {
        name: '图片',
        type: 'image',
        icon: 'Picture'
      },
      {
        name: '图片橱窗',
        type: 'window',
        icon: 'PictureRounded'
      },
      {
        name: '视频',
        type: 'video',
        icon: 'VideoPlay'
      },
      {
        name: '文章',
        type: 'article',
        icon: 'Document'
      }
    ]
  },
  {
    name: '商城组件',
    key: 'store',
    data: [
      {
        name: '搜索框',
        type: 'search',
        icon: 'Search'
      },
      {
        name: '店铺公告',
        type: 'notice',
        icon: 'BellFilled'
      },
      {
        name: '导航',
        type: 'navBar',
        icon: 'Grid'
      },
      {
        name: '商品',
        type: 'goods',
        icon: 'Goods'
      },
      {
        name: '在线客服',
        type: 'service',
        icon: 'Service'
      }
    ]
  },
  {
    name: '其他组件',
    key: 'other',
    data: [
      {
        name: '富文本',
        type: 'richText',
        icon: 'DocumentAdd'
      },
      {
        name: '辅助空白',
        type: 'blank',
        icon: 'Folder'
      },
      {
        name: '辅助线',
        type: 'guide',
        icon: 'SemiSelect'
      }
    ]
  }
])

const componentKeys = computed(() => {
  return components.value.map(item => item.key)
});


const emits = defineEmits(["handleClickItem"]);
const handleClickItem = (type: any) => {
  emits("handleClickItem", type);
}

</script>
<style lang="scss" scoped>
// 组件库
.components {
  width: 310px;
  background: #f8f9fa;

  ::v-deep .el-collapse-item__header {
    padding: 0 0 0 15px;
    font-size: 13px;
    font-weight: 700;
    color: #595961;
  }

  ::v-deep .el-collapse-item__content {
    padding-top: 0 !important;
  }

  ::v-deep.el-collapse>.el-collapse-item {
    border-bottom: none;
  }

  .module-list {
    display: flex;
    flex-wrap: wrap;
  }

  .module-item {
    width: 80px;
    height: 80px;
    text-align: center;
    font-size: 12px;
    color: #595961;
    line-height: 20px;
    position: relative;
    user-select: none;

    &:hover {
      background: #fff;
      border-radius: 4px;
    }

    .module-icon {
      display: block;
      width: 74px;
      height: 45px;
      line-height: 45px;
      margin: 0 auto;
      font-size: 26px;
      color: #9797a1;
    }
  }
}
</style>
