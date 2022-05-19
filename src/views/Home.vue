
<script lang="ts" setup>
// import { useTemplateStore } from '@/stores/template'
import TemplateList from '@/components/template-list'
import subpage from '@/components/subpage'
import { tabConfig } from '@/config/tab.ts'
// const template = useTemplateStore()
</script>

<template>
  <div class="editor-container">
    <el-container>
      <el-aside class="left-box">
        <TemplateList :tab-config="tabConfig"></TemplateList>
      </el-aside>
      <el-main>
        <subpage></subpage>
      </el-main>
      <el-aside width="300px" class="right-box">Aside</el-aside>
    </el-container>
  </div>
</template>

<style lang="scss">
body {
  background: #f0f2f5;
  margin: 0;
}
.left-box {
  height: 100vh;
}
.el-main {
  height: 100vh;
  padding-top: 70px !important;
}
</style>
