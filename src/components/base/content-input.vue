<script lang="ts">
export default {
  name: "ContentInput"
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
  <div 
    class="content-input"
    v-html="props.modelValue"
  >
  </div>
</template>

<style lang='scss' scoped>
.content-input {
  word-break: break-all;
  user-select: none;
}
</style>