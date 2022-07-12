<script lang="ts">
export default {
  name: "ContentBox"
}
</script>

<script setup lang='ts'>
import { PropType } from 'vue'
const props = defineProps({
    config: {
    type: Object as PropType<any>
  }
})
</script>
<template>
  <div :class="['content-box', { 'no-drag': props.config.noDrag }]" :style="props.config.style">
    <component v-for="item in props.config.slot" :key="item.id" :is="item.name" :config="item" :id="item.id"></component>
  </div>
</template>

<style lang='scss' scoped>
</style>