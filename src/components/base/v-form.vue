<script lang="ts">
export default {
  name: "VForm"
}
</script>

<script setup lang='ts'>
import { reactive } from 'vue'

const props = defineProps({
  config: {
    type: Object
  }
})
let formData = reactive({}) as any
const onSubmit = (values: any) => {
  console.log('submit', values)
}
</script>
<template>
  <div class="v-form" :style="props.config?.style">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-for="item in props.config?.fields"
          :key="item.id"
          v-model="formData[item.prop]"
          :name="item.label"
          :label="item.label"
          :placeholder="item.other.placeholder || `请输入您的${item.label}`"
          :rules="[{ required: true, message: `请填写${item.label}` }]"
        />
      </van-cell-group>
    <div style="margin: 10px;">
      <van-button round block type="primary" native-type="submit" :style="props.config?.submitBtnOpts.style">
        {{ props.config?.submitBtnOpts.text || '提交' }}
      </van-button>
    </div>
  </van-form>
  </div>
</template>

<style lang='scss' scoped>
</style>