<script lang="ts">
export default {
  name: "subpage"
};
</script>

<script setup lang='ts'>
import MouseCatcher from '@/components/mouse-catcher/index.vue'
import { onMounted, ref, reactive } from 'vue'
import { useTemplateStore } from '@/stores/template'
import * as utils from '@/utils'

const editorElements: string[] = reactive([
  'content-asset', 'content-input', 'content-box'
])

interface rectInter {
  width: number;
  height: number;
  top: number;
  left: number;
}


const catcher: any = reactive(
  {
    hover: {
      id: '',
      rect: {},
      eleName: ''
    },
    select: {
      id: '',
      rect: {},
      eleName: ''
    }
  }
)

const template = useTemplateStore()
const subpage = ref()

const resetRect = ($el: HTMLElement, type: string): void => {
  if ($el) {
    const parentRect = utils.pick(subpage.value.getBoundingClientRect(), 'left', 'top')
    const rect: rectInter = utils.pick($el.getBoundingClientRect(), 'width', 'height', 'left', 'top')
    rect.left -= parentRect.left
    rect.top -= parentRect.top
    catcher[type].rect = rect
    catcher[type].eleName = $el.className
  }
}

const removeSelect = (): void => {
  catcher.select.rect.width = 0
  catcher.select.id = ''
  catcher.hover.rect.width = 0
  catcher.hover.id = ''
  template.activeElemId = ''
}

const resetSelectRect = (id: string): void => {
  if (id) {
    resetRect(document.querySelector(`#${id}`) as HTMLElement, 'select')
  } else {
    removeSelect()
  }
}

const listeners = {
  mouseover: (e: any) => {
    const $el = utils.findUpwardElement(e.target, editorElements, 'classList')
    if ($el) {
      catcher.hover.id = $el.id
      resetRect($el, 'hover')
    } else {
      catcher.hover.rect.width = 0
      catcher.hover.id = ''
    }
  },
  click: (e: any) => {
    const $el = utils.findUpwardElement(e.target, editorElements, 'classList')
    if ($el) {
      template.activeElemId = $el.id
      catcher.select.id = $el.id
      resetRect($el, 'select')
    } else if (!utils.findUpwardElement(e.target, ['mouse-catcher'], 'classList')) {
      removeSelect()
    }
  }
} as any
onMounted(() => {
  Object.keys(listeners).forEach(event => {
    subpage.value.addEventListener(event, listeners[event], true)
  })
})
</script>
<template>
  <div class="subpage" ref="subpage">
    <component v-for="item in template.config" :key="item.id" :is="item.name" :config="item" :id="item.id">
    </component>
    <MouseCatcher class="ignore" v-model="catcher" @resetSelectRect="resetSelectRect"></MouseCatcher>
  </div>
</template>

<style lang='scss'>
.subpage {
  max-width: 400px;
  min-height: 667px;
  position: relative;
  margin: 0 auto;
  background: #fff;
  .config-item {
    display: none;
  }
  &.active {
    border: 2px solid gold;
  }
}
</style>