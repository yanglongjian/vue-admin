<template>
  <div :title="isFullscreen ? $t('message.system.fullScreenBack') : $t('message.system.fullScreen')">
    <el-icon @click="toggle"><FullScreen /></el-icon>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useFullscreen } from '@vueuse/core'

export default defineComponent({
  name: 'fullscreen',
  setup() {
    const { isFullscreen, toggle } = useFullscreen()
    return {
      isFullscreen,
      toggle
    }
  }
})
</script>

<style lang="scss" scoped>
  i {
    cursor: pointer;
    font-size: 18px;
    &:focus {
      outline: none;
    }
  }
</style>
