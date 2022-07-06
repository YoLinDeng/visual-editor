<script lang="ts">
export default {
  name: "ContentInput"
};
</script>

<script setup lang='ts'>
import { PropType } from 'vue';
import { useStyleFix } from '@/utils/hooks'

const props = defineProps({
  config: {
    type: Object as PropType<any>
  }
})
</script>

<template>
  <div 
    class="content-input"
    v-html="props.config.value"
    :style="[props.config.style, useStyleFix(props.config.style)]"
  >
  </div>
</template>

<style lang='scss' scoped>
.content-input {
  word-break: break-all;
  user-select: none;
}
</style>