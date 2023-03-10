<template>
  <div class="box">
    <Card />
    <Charts />
    <!-- <Communication /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Communication from './components/communication.vue'
import Card from './components/card/index.vue'
import Charts from './components/charts/index.vue'
export default defineComponent({
  components: {
    Card,
    Charts,
    Communication,
  }
})
</script>

<style lang="scss" scoped>
  .box {
    padding: 15px;
  }
</style>