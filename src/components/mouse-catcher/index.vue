<script lang="ts">
export default {
  name: "MouseCatcher"
}
</script>

<script setup lang='ts'>
import { computed, nextTick } from 'vue'
import { useTemplateStore } from '@/stores/template'
import * as utils from '@/utils'

const props = defineProps({
  modelValue: {
    type: Object
  }
})

const emit = defineEmits(['resetSelectRect'])
const template = useTemplateStore()

const hoverRect = computed(() => {
  return utils.transform(props.modelValue.hover.rect, (result, value, key) => {
    result[key] = `${value}px`
  })
})
const selectRect = computed(() => {
  return utils.transform(props.modelValue.select.rect, (result, value, key) => {
    result[key] = `${value}px`
  })
})

const move = (type: string, id: string): void => {
  const currIndex = template.config.findIndex(x => x.id === id)
  const excIndex = type === 'top' ? currIndex - 1 : currIndex + 1
  if (template.config[excIndex]) {
    const currItem = template.config[currIndex]
    const excItem = template.config[excIndex]
    utils.fill(template.config, excItem, currIndex, currIndex + 1)
    utils.fill(template.config, currItem, excIndex, excIndex + 1)
    nextTick(() => {
      emit('resetSelectRect', id)
    })
  }
}

const deleteItem = (id: string): void => {
  const currIndex = template.config.findIndex(x => x.id === id)
  template.config.splice(currIndex, 1)
  nextTick(() => {
    emit('resetSelectRect')
  })
}

const copy = (id: string): void => {
  const curr = template.config.find(x => x.id === id)
  curr.id = `${curr.id.split('-')[0]}-${new Date().getTime()}`
  template.config.push(curr)
}

</script>
<template>
  <div class="mouse-catcher">
    <div class="hover"
      :style="hoverRect" 
      v-show="props.modelValue.hover.id && props.modelValue.hover.id !== props.modelValue.select.id">
    </div>
    <div class="select"
      :style="selectRect"
      v-show="props.modelValue.select.id">
      <div class="toolbar">
        <button @click.stop="move('top', props.modelValue.select.id)">
          <el-tooltip class="item" effect="dark" content="上移" placement="top">
            <el-icon :size="20">
              <Top />
            </el-icon>
          </el-tooltip>
        </button>
        <button @click.stop="move('up', props.modelValue.select.id)">
          <el-tooltip class="item" effect="dark" content="下移" placement="top">
            <el-icon :size="20">
              <Bottom />
            </el-icon>
          </el-tooltip>
        </button>
        <button @click.stop="deleteItem(props.modelValue.select.id)">
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-icon :size="20">
              <Delete />
            </el-icon>
          </el-tooltip>
        </button>
        <button @click.stop="copy(props.modelValue.select.id)">
          <el-tooltip class="item" effect="dark" content="复制" placement="top">
            <el-icon :size="20">
              <DocumentCopy />
            </el-icon>
          </el-tooltip>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.mouse-catcher {
  position: absolute;
  bottom: 0;
  top: 0;
  z-index: 100;
  pointer-events: none;
  .hover {
    position: absolute;
    background: rgba(53,143,255,.2);
  }
  .select {
    position: absolute;
    border: 2px solid #358FFF;
    .toolbar {
      background: #358FFF;
      position: absolute;
      transform: translateY(-100%);
      right: 0;
      z-index: 2;
      display: flex;
      button {
        flex: 1;
        font-size: 14px;
        background: transparent;
        border: none;
        color: #fff;
        pointer-events: all;
        z-index: 1;
        padding: 5px 10px;
        cursor: pointer;
        outline: none;
          &:hover{
            background:#005ED6;
          }
        i{
          padding: 2px;
          border-radius:2px;
          font-size: 18px;
        }
      }
    }
  }
}
</style>