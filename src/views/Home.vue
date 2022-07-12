
<script lang="ts" setup>
import { useTemplateStore } from '@/stores/template'
import TemplateList from '@/components/template-list/index.vue'
import subpage from '@/components/subpage/index.vue'
import ConfigEditor from '@/components/config-editor/index.vue'
import { Tab } from '@/config'
const template = useTemplateStore()
</script>

<template>
  <div class="editor-container">
    <el-container>
      <el-aside class="left-box">
        <template-list :tab-config="Tab.tabConfig"></template-list>
      </el-aside>
      <el-main>
        <subpage></subpage>
      </el-main>
      <el-aside class="right-box">
        <config-editor v-show="template.activeElemId"></config-editor>
      </el-aside>
    </el-container>
  </div>
</template>

<style lang="scss">
body {
  background: #f0f2f5;
  margin: 0;
}
.left-box {
  width: 400px !important;
  height: 100vh;
}
.right-box {
  width: 300px;
  height: 100vh;
  background: #fff;
  overflow: auto;
}
.el-main {
  height: 100vh;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: 70px !important;
  &::-webkit-scrollbar {
    display: none;/*隐藏滚动条*/
  }
}
</style>
