<template>
  <vue3-tinymce v-model="state.content" :setting="state.setting" />
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';
// 引入组件
import Vue3Tinymce from '@jsdawn/vue3-tinymce'
import { useTemplateStore } from '@/stores/template'
import { findConfig } from '@/utils'

const template = useTemplateStore()
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const state = reactive({
  content: '',
  setting: {
    height: 300,
    language: 'zh-Hans',
    language_url: '/tinymce/langs/zh-Hans.js'
  }
})

watch(() => props.modelValue, () => {
  props.modelValue && (state.content = findConfig(template.config, props.modelValue)?.value)
})

watch(() => state.content, () => {
  const config = findConfig(template.config, props.modelValue)
  config && (config.value = state.content)
})
</script>