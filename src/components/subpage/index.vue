<script lang="ts">
export default {
  name: "subpage"
};
</script>

<script setup lang='ts'>
import MouseCatcher from '@/components/mouse-catcher'
import { onMounted, ref, reactive } from 'vue'
import { useTemplateStore } from '@/stores/template'
import * as utils from '@/utils'

const editorElements: string[] = reactive([
  'content-asset', 'content-input'
])

interface rectInter {
  width: number;
  height: number;
  top: number;
  left: number;
}

interface catcherInter {
  hover: {
    id: string;
    rect: rectInter;
  };
  select: {
    id: string;
    rect: rectInter;
    hasRange?: boolean;
    type?: string;
  };
}

const catcher: catcherInter = reactive(
  {
    hover: {
      id: '',
      rect: {}
    },
    select: {
      id: '',
      rect: {},
      hasRange: false,
      type: ''
    }
  }
)

const template = useTemplateStore()
const subpage = ref(null)

const resetRect = ($el: HTMLElement, type: string): void => {
  if ($el) {
    const parentRect = utils.pick(subpage.value.getBoundingClientRect(), 'left', 'top')
    const rect = utils.pick($el.getBoundingClientRect(), 'width', 'height', 'left', 'top')
    rect.left -= parentRect.left
    rect.top -= parentRect.top
    catcher[type].rect = rect
  }
}

const removeSelect = (): void => {
  catcher.select.rect.width = 0
  catcher.select.id = ''
  catcher.hover.rect.width = 0
  catcher.hover.id = ''
}

const resetSelectRect = (id: string): void => {
  if (id) {
    resetRect(document.querySelector(`#${id}`), 'select')
  } else {
    removeSelect()
  }
}

const listeners = {
  mouseover: e => {
    const $el = utils.findUpwardElement(e.target, editorElements, 'classList')
    if ($el) {
      catcher.hover.id = $el.id
      resetRect($el, 'hover')
    } else {
      catcher.hover.rect.width = 0
      catcher.hover.id = ''
    }
  },
  click: e => {
    const $el = utils.findUpwardElement(e.target, editorElements, 'classList')
    if ($el) {
      catcher.select.id = $el.id
      resetRect($el, 'select')
    } else if (!utils.findUpwardElement(e.target, ['mouse-catcher'], 'classList')) {
      removeSelect()
    }
  }
}
onMounted(() => {
  Object.keys(listeners).forEach(event => {
    subpage.value.addEventListener(event, listeners[event], true)
  })
})
</script>
<template>
  <div class="subpage" ref="subpage">
    <component v-for="item in template.config" :key="item.id" :is="item.name" v-model="item.value" :id="item.id">
    </component>
    <MouseCatcher class="ignore" v-model="catcher" @resetSelectRect="resetSelectRect"></MouseCatcher>
  </div>
</template>

<style lang='scss' scoped>
.subpage {
  max-width: 400px;
  height: 90vh;
  background: #fff;
  margin: 0 auto;
  position: relative;
  &.active {
    border: 2px solid gold;
  }
}
</style>