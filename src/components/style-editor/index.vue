
<script lang="ts">
export default {
  name: "StyleEditor"
}
</script>

<script setup lang='ts'>
import { ref, watch } from 'vue'
import { useTemplateStore } from '@/stores/template'
import TinymceEditor from '@/components/tinymce-editor/index.vue'
import MarginEditor from '@/components/margin-editor/index.vue'
import { findConfig } from '@/utils'

const template = useTemplateStore()
const activeNames = ref(['1', '2'])
let elemBgColor = ref<string>('#fff')
let borderRadius = ref<string>('0px')
const editorTitle = ref<string>('')

watch(() => template.activeElemId, () => {
  const activeElem = findConfig(template.config, template.activeElemId)
  elemBgColor.value = activeElem?.style?.background || '#fff'
  borderRadius.value = activeElem?.style?.borderRadius || '0px'
  switch(activeElem?.name) {
    case 'content-input': 
      editorTitle.value = '文字'
      break
    case 'content-asset': 
      editorTitle.value = '图片'
      break
    case 'content-box': 
      editorTitle.value = '盒子'
      break
    default:
      editorTitle.value = ''
  }
})

const changeColor = (e: any) => {
  const activeElem = findConfig(template.config, template.activeElemId)
  activeElem.style.background = e
}
const inputBorderRadius = (value: string | number) => {
  const activeElem = findConfig(template.config, template.activeElemId)
  value && (activeElem.style.borderRadius = value)
}
</script>

<template>
  <div class="ele-editor-container">
    <div class="element-title">{{editorTitle}}</div>
    <div class="editor-config">
      <el-collapse v-model="activeNames" v-show="editorTitle === '文字'">
        <el-collapse-item title="字体" name="1">
          <tinymce-editor v-model="template.activeElemId"></tinymce-editor>
        </el-collapse-item>
      </el-collapse>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="背景&位置" name="2">
          <el-row justify="space-between">
            <el-col :span="6">
              颜色
            </el-col>
            <el-col :span="6">
              <el-color-picker v-model="elemBgColor" show-alpha @change="changeColor"/>
            </el-col>
          </el-row>
          <el-row justify="space-between">
            <el-col :span="6">
              圆角
            </el-col>
            <el-col :span="10">
              <el-input v-model="borderRadius" size="small" @input="inputBorderRadius"></el-input>
            </el-col>
          </el-row>
          <margin-editor></margin-editor>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<style lang='scss'>
.ele-editor-container {
  background: #fff;
  padding: 20px;
  .element-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
  }
}
.el-row {
  margin: 10px 0 !important;
}

</style>