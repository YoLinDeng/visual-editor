<template>
  <div class="company-tree-container">
    <div class="parent-company" v-for="item in props.companyList" :key="item.level">
      <div class="parent-company-item" @click="switchExpand(item.level)">   
        <img :src="require('@/assets/right-arrow.png')" :class="['right-arrow', {'expand': item.isExpand}]" v-if="item.children">   
        <span>{{item.name}}</span>
      </div>
      <div class="children-company" v-if="item.children" v-show="item.isExpand">
        <company-tree :companyList="item.children"></company-tree>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import CompanyTree from '@/components/CompanyTree.vue'

interface companyProps {
  name: string;
  level: string;
}
const props = defineProps({
  companyList: {
    type: Array as PropType<companyProps[]>
  }
})

const emit = defineEmits(['update:companyList'])
let changeSiwtchStatus = (level: string) => {
  let list = props.companyList
  list.forEach(x => {
    if(x.level === level) {
      x.isExpand = !x.isExpand
    }
  })
  return list
}

let switchExpand = (level: string):void => {
  let list = changeSiwtchStatus(level)
  emit('update:companyList', list)
}

</script>

<style lang="scss">
.children-company {
  margin-left: 30px;
}
.parent-company-item {
  display: flex;
  align-items: center;
  margin: 10px auto;
  cursor: pointer;
}
.right-arrow {
  width: 15px;
  height: 15px;
}
.expand {
  transform: rotate(90deg);
  transition: all 250ms;
}

</style>