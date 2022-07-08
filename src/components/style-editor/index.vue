
<script lang="ts">
export default {
  name: "StyleEditor"
}
</script>

<script setup lang='ts'>
import { ref, reactive, watch } from 'vue'
import { useTemplateStore } from '@/stores/template'
import TinymceEditor from '@/components/tinymce-editor/index.vue'
import MarginEditor from '@/components/margin-editor/index.vue'
import { findConfig } from '@/utils'

const template = useTemplateStore()
const activeNames = ref(['1', '2'])
const bg = reactive({
  color: '',
  image: ''
})
let borderRadius = ref<string>('0px')
const editorTitle = ref<string>('')
let border = reactive({
  style: 'none',
  width: '1px',
  color: '#000'
})
const borderOptions = reactive([
  {
    value: 'none',
    label: '无边框'
  },
  {
    value: 'solid',
    label: '实线'
  },
  {
    value: 'dashed',
    label: '虚线'
  },
  {
    value: 'dotted',
    label: '点线'
  }
])
const boxShadow = reactive({
  h: '0px', // 水平阴影的位置。允许负值
  v: '0px', // 垂直阴影的位置。允许负值
  blur: '0px', // 模糊距离
  spread: '0px', // 阴影的大小
  color: '#000'
})
const location = reactive({
  position: 'static',
  top: '',
  right: '',
  bottom: '',
  left: '',
  zIndex: 1,
  display: 'block'
})
const positionOptions = reactive([
  {
    value: 'static',
    label: '没有定位'
  },
  {
    value: 'relative',
    label: '相对定位'
  },
  {
    value: 'absolute',
    label: '绝对定位'
  },
  {
    value: 'fixed',
    label: '固定定位'
  },
  {
    value: 'sticky',
    label: '粘性定位'
  }
])
const displayOptions = reactive([
  {
    value: 'block',
    label: '块级'
  },
  {
    value: 'inline',
    label: '行内'
  },
  {
    value: 'inline-block',
    label: '行内块级'
  },
  {
    value: 'flex',
    label: '弹性布局'
  },
  {
    value: 'none',
    label: '隐藏'
  }
])

watch(() => template.activeElemId, () => {
  const activeElem = findConfig(template.config, template.activeElemId)
  if (activeElem) {
    const {
      position,
      top,
      bottom,
      left,
      right,
      display,
      backgroundColor,
      backgroundImage,
      border: borderData,
      borderStyle,
      borderWidth,
      borderColor,
      borderRadius: borderRadiusData,
      boxShadow: boxShadowData
    } = activeElem?.style || {}
    if (borderData === 'none') {
      border.style = 'none'
    } else {
      border.style = borderStyle || 'none'
      border.width = borderWidth || '1px'
      border.color = borderColor || '#000'
    }
    borderRadius.value = borderRadiusData || '0px'
    const boxShadowArr = boxShadowData?.split(' ') || []
    boxShadow.h = boxShadowArr[0] || '0px'
    boxShadow.v = boxShadowArr[1] || '0px'
    boxShadow.blur = boxShadowArr[2] || '0px'
    boxShadow.spread = boxShadowArr[3] || '0px'
    boxShadow.color = boxShadowArr[4] || '#000'
    bg.color = backgroundColor || ''
    bg.image = backgroundImage || ''
    location.position = position || 'static'
    location.top = top || ''
    location.bottom = bottom || ''
    location.left = left || ''
    location.right = right || ''
    location.display = display || 'block'
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
  }
})

watch(border, () => {
  const activeElem = findConfig(template.config, template.activeElemId)
  activeElem.style = {
    ...activeElem.style,
    borderStyle: border.style,
    borderWidth: border.width,
    borderColor: border.color
  }
})

watch(boxShadow, () => {
  const activeElem = findConfig(template.config, template.activeElemId)
  const { h, v, blur, spread, color } = boxShadow
  activeElem.style.boxShadow = `${h} ${v} ${blur} ${spread} ${color}`
})

watch(bg, () => {
  const activeElem = findConfig(template.config, template.activeElemId)
  activeElem.style.backgroundColor = bg.color
  activeElem.style.backgroundImage = bg.image
})

watch(location, () => {
  const activeElem = findConfig(template.config, template.activeElemId)
  activeElem.style = {
    ...activeElem.style,
    ...location
  }
})

const inputBorderRadius = (value: string | number) => {
  const activeElem = findConfig(template.config, template.activeElemId)
  value && (activeElem.style.borderRadius = value)
}
</script>

<template>
  <div class="ele-editor-container">
    <div class="element-title">{{editorTitle}}</div>
    <div class="editor-config">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="字体" name="1"  v-show="editorTitle === '文字'">
          <tinymce-editor v-model="template.activeElemId"></tinymce-editor>
        </el-collapse-item>
        <el-collapse-item title="位置布局" name="2">
          <margin-editor></margin-editor>
           <el-row justify="space-between">
              <el-col :span="6">
                布局类型
              </el-col>
              <el-col :span="10">
                <el-select v-model="location.display" class="m-2">
                  <el-option
                    v-for="item in displayOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          <el-row justify="space-between">
            <el-col :span="8">
              定位类型
              <el-tooltip content="如为绝对定位，请开启父级的相对定位，否则将以有相对定位的顶级为定位。注：盒子组件已自动开启" placement="top">
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </el-col>
            <el-col :span="10">
              <el-select v-model="location.position" class="m-2">
                <el-option
                  v-for="item in positionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
          </el-row>
          <div class="position-conifg" v-if="location.position &&  location.position !== 'static'">
            <el-row justify="space-between">
              <el-col :span="6">
                位置
              </el-col>
              <el-col :span="10">
              <div class="flex">
                <el-input v-model="location.top" size="small" placeholder="上"></el-input>
                <el-input v-model="location.right" size="small" placeholder="右"></el-input>
                <el-input v-model="location.bottom" size="small" placeholder="下"></el-input>
                <el-input v-model="location.left" size="small" placeholder="左"></el-input>
              </div>
              </el-col>
            </el-row>
            <el-row justify="space-between">
              <el-col :span="6">
                层级
              </el-col>
              <el-col :span="10">
                <el-input v-model="location.zIndex" size="small"></el-input>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="背景" name="3">
          <el-row justify="space-between">
            <el-col :span="6">
              颜色
            </el-col>
            <el-col :span="6">
              <el-color-picker v-model="bg.color" show-alpha />
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
           <el-row justify="space-between">
            <el-col :span="6">
              渐变 
              <el-tooltip content="格式：linear-gradient(方向/角度(可选), 颜色1, 颜色2)，示例：linear-gradient(blue, pink)" placement="top">
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </el-col>
            <el-col :span="10">
              <el-input v-model="bg.image" size="small"></el-input>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="边框" name="4">
          <el-row justify="space-between">
            <el-col :span="6">
              边框类型
            </el-col>
            <el-col :span="10">
              <el-select v-model="border.style" class="m-2">
                <el-option
                  v-for="item in borderOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
          </el-row>
          <div class="border-config" v-if="border.style !== 'none'">
            <el-row justify="space-between">
              <el-col :span="6">
                宽度
              </el-col>
              <el-col :span="10">
                <el-input v-model="border.width" size="small"></el-input>
              </el-col>
            </el-row>
            <el-row justify="space-between">
              <el-col :span="6">
                边框颜色
              </el-col>
              <el-col :span="6">
                <el-color-picker v-model="border.color" show-alpha />
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="阴影" name="5">
          <el-row justify="space-between">
            <el-col :span="6">
              颜色
            </el-col>
            <el-col :span="6">
              <el-color-picker v-model="boxShadow.color" show-alpha/>
            </el-col>
          </el-row>
          <el-row justify="space-between">
            <el-col :span="4">
              参数
            </el-col>
            <el-col :span="20">
              <div class="box-shadow-config">
                <div class="config-item">
                  <el-input v-model="boxShadow.h"></el-input>
                  <p>X</p>
                </div>
                <div class="config-item">
                  <el-input v-model="boxShadow.v"></el-input>
                  <p>Y</p>
                </div>
                <div class="config-item">
                  <el-input v-model="boxShadow.blur"></el-input>
                  <p>距离</p>
                </div>
                <div class="config-item">
                  <el-input v-model="boxShadow.spread"></el-input>
                  <p>大小</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<style lang='scss'>
.flex {
  display: flex;
}
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
.box-shadow-config {
  display: flex;
  .config-item {
    margin: 0 3px;
  }
}

</style>