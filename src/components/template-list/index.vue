<script setup lang='ts'>
import { Sortable } from 'sortablejs/modular/sortable.core.esm'
import { onMounted, ref, getCurrentInstance, watch } from 'vue'
import { useTemplateStore } from '@/stores/template'
import base from '@/config/base.ts'
import * as utils from '@/utils'

const instance = getCurrentInstance()
const mainBox = ref(null)
let key = ref('')
const template = useTemplateStore()
let activeType = ref<string>('text')
const props = defineProps({
  tabConfig: {
    type: Array,
    default: () => []
  }
})

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
        document.querySelector('.subpage').classList.add('active')
        // document.querySelector('body').classList.add('dragging')
      },
      onEnd: async ({ item, originalEvent }) => {
        // console.log(newIndex, oldIndex, item, originalEvent)
        const { pageX, pageY } = originalEvent
        const { left, right, top, bottom } =  document.querySelector('.subpage').getBoundingClientRect()
        const { dataset } = item
        if (document.querySelector('.subpage').contains(item)) {
          item.remove()
        }
        if (pageX > left && pageX  < right && pageY > top && pageY < bottom) {
          const { name } = dataset
          const currConfigItem = utils.cloneDeep(base[name])
          currConfigItem.id = `${base[name].id}-${new Date().getTime()}`
          template.config.push(currConfigItem)
        } else {
          console.log('false')
        }
        document.querySelector('.subpage').classList.remove('active')
        key.value = Date.now()
      }
    })
  })
}

const initSortableSubpage = (): void => {
  instance._sortableSubpage && instance._sortableSubpage.destroy()
  instance._sortableSubpage = Sortable.create(document.querySelector('.subpage'), {
      group: 'shared',
      filter: '.ignore',
      onStart: ({ originalEvent }) => {
        instance._startPageX = originalEvent.pageX
        instance._startPageY = originalEvent.pageY
      },
      onEnd: ({ newIndex, oldIndex, item, originalEvent }) => {
        // item.style.display = 'none'
        const { pageX, pageY } = originalEvent
        const { left, right, top, bottom } = document.querySelector('.subpage').getBoundingClientRect()
        if (pageX < left || pageX > right || pageY < top || pageY > bottom) {
          template.config.splice(oldIndex, 1)
        }
      }
    })
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
            <div class="config-item" v-for="_item in item.children" :key="_item" :data-name="_item">
              <div v-if="activeType === 'text'" class="config-item-text" v-html="base[_item].value"></div>
              <img v-if="activeType === 'img'" class="config-item-img" :src="base[_item].value"/>
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
      background: #e1e1e3;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 0;
    }
  }
}
</style>