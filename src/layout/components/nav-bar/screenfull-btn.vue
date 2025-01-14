<script setup>
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, enter, exit, toggle } = useFullscreen()
</script>

<template>
  <div class="inline-flex items-center justify-center h-full min-w-[34px] hover:cursor-pointer">
    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="toggle" />
  </div>
</template>

<style lang='scss' scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
