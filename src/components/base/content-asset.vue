<script lang="ts">
export default {
  name: "ContentAsset"
};
</script>

<script setup lang='ts'>
const props = defineProps({
  modelValue: {
    type: String
  }
})
</script>
<template>
  <div class="content-asset">
    <img :src="props.modelValue">
  </div>
</template>

<style lang='scss' scoped>
</style>