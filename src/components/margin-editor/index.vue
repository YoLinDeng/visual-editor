<script lang="ts">
export default {
  name: "MarginEditor"
};
</script>

<script setup lang='ts'>
import { reactive, watch } from 'vue'
import { useTemplateStore } from '@/stores/template'
import { findConfig } from '@/utils'

let state = reactive({
  marginTop: '',
  marginRight: '',
  marginBottom: '',
  marginLeft: '',
  paddingTop: '',
  paddingRight: '',
  paddingBottom: '',
  paddingLeft: '',
  width: '',
  height: ''
})
let template = useTemplateStore()
watch(() => template.activeElemId, () => {
  if (template.activeElemId) {
    const ele =  document.getElementById(template.activeElemId)
    let {
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      width,
      height
    } = window.getComputedStyle(ele as HTMLElement, null)
    state.width = width
    state.height = height
    state.paddingLeft = paddingLeft
    state.paddingBottom = paddingBottom
    state.paddingRight = paddingRight
    state.paddingTop = paddingTop
    state.marginLeft = marginLeft
    state.marginBottom = marginBottom
    state.marginRight = marginRight
    state.marginTop = marginTop
  }
})

watch(state, () => {
  const activeElem = findConfig(template.config, template.activeElemId)
  if (activeElem) {
    activeElem.style = {
      ...activeElem.style,
      ...state
    }
  }
})
</script>
<template>
  <div class="margin">
    <div class="margin-text">外边距</div>
    <el-input class="margin-top" v-model="state.marginTop"></el-input>
    <el-input class="margin-right" v-model="state.marginRight"></el-input>
    <el-input class="margin-bottom" v-model="state.marginBottom"></el-input>
    <el-input class="margin-left" v-model="state.marginLeft"></el-input>
    <div class="padding">
      <div class="padding-text">内边距</div>
      <el-input class="padding-top" v-model="state.paddingTop"></el-input>
      <el-input class="padding-right" v-model="state.paddingRight"></el-input>
      <el-input class="padding-bottom" v-model="state.paddingBottom"></el-input>
      <el-input class="padding-left" v-model="state.paddingLeft"></el-input>
      <div class="content">
        <div class="content-width content-item">
          <div class="label">宽</div>
          <el-input v-model="state.width"></el-input>
        </div>
        <div class="content-height content-item">
           <div class="label">高</div>
          <el-input v-model="state.height"></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
@mixin content-absolute {
  &-text {
    position: absolute;
    top: 5px;
    left: 5px;
  }
  &-top {
    position: absolute !important;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
  }
  &-right {
    position: absolute !important;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
  }
  &-bottom {
    position: absolute !important;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
  }
  &-left {
    position: absolute !important;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
  }
}
.margin {
  width: 100%;
  // height: 300px;
  background: #f9f9f9;
  border: 1px solid#dcdfe6;
  padding: 30px 46px;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  .el-input {
    width: 35px;
    height: 20px;
    .el-input__wrapper {
      padding: 0;
    }
  }
  @include content-absolute;
  .padding {
    background: #f1f1f1;
    padding: 30px 46px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    position: relative;
    @include content-absolute;

    .content {
      border: 1px dashed #ccc;
      &-item {
        display: flex;
        .label {
          width: 25px;
        }
        .el-input {
          flex: 1;
        }
      }
    }
  }
}
</style>