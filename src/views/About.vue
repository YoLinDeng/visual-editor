<template>
  <div class="about">
    <canvas
      ref="canvas"
      width="800"
      height="800"
      style="border: 1px solid #ccc;"
    ></canvas>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  const canvas = ref()
  onMounted(() => {
    const ctx = canvas.value.getContext('2d')
    ctx.moveTo(50, 100)
    ctx.lineTo(200, 100)
    ctx.lineTo(100, 300)
    ctx.closePath()
    ctx.lineWidth = 10
    ctx.lineJoin = 'round'
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(150, 50)
    ctx.lineTo(250, 100)
    ctx.lineTo(150, 150)
    ctx.lineTo(50, 100)
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(500, 500, 80, 0, 360 * Math.PI/ 180)
    ctx.closePath()
    ctx.stroke()
  })
</script>

<style lang="scss" scoped>
.about {
  padding-top: 100px;
}
</style>