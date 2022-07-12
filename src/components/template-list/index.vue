<script setup lang='ts'>
import { Sortable } from 'sortablejs/modular/sortable.core.esm'
import { onMounted, ref, getCurrentInstance, watch, PropType } from 'vue'
import { useTemplateStore } from '@/stores/template'
import { useLoopChangeId } from '@/utils/hooks'
import { Base } from '@/config'
import { Template } from '@/config'
import * as utils from '@/utils'

const instance = getCurrentInstance() as any
const mainBox = ref()
let key = ref()
const templateStore = useTemplateStore()
let activeType = ref<string>('text')
const props = defineProps({
  tabConfig: {
    type: Array as PropType<any>,
    default: () => []
  }
})

const configItemAddId = (slot: any): any => {
  if (slot && slot.length > 0) {
    const cloneSlot = utils.cloneDeep(slot)
    return cloneSlot.map((x: any) => {
      if (x.slot && x.slot.length > 0) {
        configItemAddId(x.slot)
      }
      return {
        ...x,
        id: `${utils.nanoid()}-block-slot`
      }
    })
  } else {
    return slot
  }
}

const initSortableSide = (): void => {
  Array.from(mainBox.value).forEach(($box, index) => {
    instance[`_sortable_${index}`] && instance[`_sortable_${index}`].destroy()
    instance[`_sortable_${index}`] = Sortable.create($box, {
      filter: 'h1,.ignore',
      sort: false,
      group: {
        name: 'shared',
        pull: 'clone',
        put: false // Do not allow items to be put into this list
      },
      onStart: () => {
       (document.querySelector('.subpage') as HTMLElement).classList.add('active')
      },
      onEnd: ({ item, originalEvent }: any) => {
        // console.log(newIndex, oldIndex, item, originalEvent)
        const { pageX, pageY } = originalEvent
        const { left, right, top, bottom } = (document.querySelector('.subpage') as HTMLElement).getBoundingClientRect()
        const { dataset } = item
        if ((document.querySelector('.subpage') as HTMLElement).contains(item)) {
          item.remove()
        }
        if (pageX > left && pageX  < right && pageY > top && pageY < bottom) {
          const { name, type, index } = dataset
          console.log(dataset, index)
          let currConfigItem = {} as any
          if (type) {
            currConfigItem = utils.cloneDeep(Template.config[type][index].config)
            currConfigItem.id = utils.nanoid()
            currConfigItem.slot = configItemAddId(currConfigItem.slot)
          } else {
            currConfigItem = utils.cloneDeep(Base.config[name])
            currConfigItem.id = utils.nanoid()
          }
          templateStore.config.push(currConfigItem)
          console.log(templateStore.config)
          key.value = Date.now()
        } else {
          console.log('false')
        }
        (document.querySelector('.subpage') as HTMLElement).classList.remove('active')
      }
    })
  })
}

const initSortableSubpage = (): void => {
  instance._sortableSubpage && instance._sortableSubpage.destroy()
  instance._sortableSubpage = Sortable.create(document.querySelector('.subpage'), {
    group: 'shared',
    filter: '.ignore',
    onStart: ({ originalEvent }: any) => {
      instance._startPageX = originalEvent.pageX
      instance._startPageY = originalEvent.pageY
    },
    onEnd: ({ newIndex, oldIndex, originalEvent }: any) => {
      const { pageX } = originalEvent
      const { left, right } = (document.querySelector('.subpage') as HTMLElement).getBoundingClientRect()
      if (pageX < left || pageX > right) {
        templateStore.config.splice(oldIndex, 1)
      } else {
        if (newIndex !== oldIndex) {
          if (newIndex === templateStore.config.length) {
            newIndex = newIndex - 1
          }
          if (oldIndex === templateStore.config.length) {
            oldIndex = oldIndex - 1
          }
          const oldVal = utils.cloneDeep(templateStore.config[oldIndex])
          const newVal = utils.cloneDeep(templateStore.config[newIndex])
          utils.fill(templateStore.config, oldVal, newIndex, newIndex + 1)
          utils.fill(templateStore.config, newVal, oldIndex, oldIndex + 1)
          console.log(templateStore.config)
        }
      }
    }
  })
}

const addToSubPage = (config: any): void => {
  const cloneConfig = utils.cloneDeep(config)
  cloneConfig.id = utils.nanoid()
  cloneConfig.slot && useLoopChangeId(cloneConfig.slot)
  templateStore.config.push(cloneConfig)
  key.value = Date.now()
}
onMounted(() => {
  initSortableSide()
})

watch(key, () => {
  initSortableSubpage()
})

</script>
<template>
  <div class="template-list">
    <el-tabs tab-position="left" class="tabs-list" v-model="activeType">
      <el-tab-pane v-for="item in props.tabConfig" :key="item.value" :label="item.label" :name="item.value">
        <template #label>
          <span class="tabs-list-item">
            <i :class="`iconfont ${item.icon}`"></i>
            <span>{{item.label}}</span>
          </span>
        </template>
        <div class="tab-content">
          <div class="tab-content-title">{{item.label}}</div>
          <div class="main-box" ref="mainBox">
            <div class="config-item" v-for="_item in item.children" :key="_item" :data-name="_item" @click="addToSubPage(Base.config[_item])">
              <div v-if="activeType === 'text'" class="config-item-text" v-html="Base.config[_item].value"></div>
              <img v-if="activeType === 'img'" class="config-item-img" :src="Base.config[_item].value"/>
            </div>
            <div class="config-item" v-for="(tItem, tIndex) in Template.config[activeType]" :key="tItem.id" :data-type="activeType" :data-index="tIndex" @click="addToSubPage(tItem.config)">
              <img :src="tItem.preview" class="preview">
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang='scss' scoped>
.template-list {
  height: 100%;
  background: #fff;
}
.tabs-list-item {
  display: flex;
  margin: 20px 0;
  .iconfont {
    font-size: 20px;
    margin-right: 10px;
  }
}
.config-item {
  width: 100%;
  margin: 10px 0;
  cursor: move;
  position: relative;
  .preview {
    width: 100%;
    position: relative;
    z-index: 1;
    display: inherit;
    object-fit: contain;
  }
  &-text {
    position: relative;
    z-index: 1;
  }
  &-img {
    position: relative;
    z-index: 1;
    width: 50px;
  }
  &:hover {
    &::after {
      content: "";
      width: 100%;
      height: 100%;
      background: #999;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      opacity: 0.3;
    }
  }
}
</style>