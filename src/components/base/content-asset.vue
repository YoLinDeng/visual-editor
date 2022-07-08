<script lang="ts">
export default {
  name: "ContentAsset"
};
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
  <div class="content-asset" :style="props.config.style">
    <img :src="props.config.value">
  </div>
</template>

<style lang='scss' scoped>
img {
  width: 100%;
  height: 100%;
}
</style>