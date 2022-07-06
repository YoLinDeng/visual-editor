<script lang="ts">
export default {
  name: "MouseCatcher"
}
</script>

<script setup lang='ts'>
import { computed, nextTick, PropType } from 'vue'
import { useTemplateStore } from '@/stores/template'
import { useLoopChangeId } from '@/utils/hooks'
import * as utils from '@/utils'

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>
  }
})

const emit = defineEmits(['resetSelectRect'])
const template = useTemplateStore()

const hoverRect = computed(() => {
  return utils.transform(props.modelValue.hover.rect, (result: any, value: number, key: string) => {
    result[key] = `${value}px`
  })
})
const selectRect = computed(() => {
  return utils.transform(props.modelValue.select.rect, (result: any, value: number, key: string) => {
    result[key] = `${value}px`
  })
})

let visibleMove = computed(() => {
  return !props.modelValue.select.id.includes('block-slot')
})

const move = (type: string, id: string): void => {
  const currIndex = template.config.findIndex((x: any) => x.id === id)
  const excIndex = type === 'top' ? currIndex - 1 : currIndex + 1
  if (template.config[excIndex]) {
    const currItem = utils.cloneDeep(template.config[currIndex])
    const excItem = utils.cloneDeep(template.config[excIndex])
    utils.fill(template.config, excItem, currIndex, currIndex + 1)
    utils.fill(template.config, currItem, excIndex, excIndex + 1)
    nextTick(() => {
      emit('resetSelectRect', id)
    })
  }
}

const queryDelete = (id: string, config: any): void => {
  config.forEach((x: any, i: number) => {
    if (x.id === id) {
      config.splice(i, 1)
    }
    if (x.slot && x.slot.length > 0) {
      queryDelete(id, x.slot)
    }
    if (x.slot && x.slot.length === 0) {
      config.splice(i, 1)
    }
  })
}


const queryCopy = (id: string, config: any): void => {
  console.log(config)
  config.forEach((x: any) => {
    if (x.id === id) {
      const cloneX = utils.cloneDeep(x)
      cloneX.id = utils.nanoid()
      cloneX.slot && useLoopChangeId(cloneX.slot)
      config.push(cloneX)
    } else {
      if (x.slot && x.slot.length > 0) {
        queryCopy(id, x.slot)
      }
    }
  })
}

const deleteItem = (id: string): void => {
  queryDelete(id, template.config)
  nextTick(() => {
    emit('resetSelectRect')
  })
}

const copy = (id: string): void => {
  queryCopy(id, template.config)
  nextTick(() => {
    emit('resetSelectRect')
  })
}

</script>

<template>
  <div class="mouse-catcher">
    <div :class="['hover', {'block-hover': props.modelValue.hover.eleName === 'content-box'}]"
      :style="hoverRect" 
      v-show="props.modelValue.hover.id && props.modelValue.hover.id !== props.modelValue.select.id">
    </div>
    <div
      :class="['select', {'block-select': props.modelValue.select.eleName === 'content-box'}]"
      :style="selectRect"
      v-show="props.modelValue.select.id">
      <div class="toolbar">
        <template class="move-box" v-if="visibleMove">
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
        </template>
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
    border: 1px solid #358FFF;
    &.block-hover {
      border: 1px solid #f67161;
    }
  }
  .select {
    position: absolute;
    border: 2px solid #358FFF;
    &.block-select {
       border: 2px solid #f67161;
       .toolbar {
          background: #f67161;
          button {
            &:hover{
              background:#c7412b;
            }
          }
       }
    }
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