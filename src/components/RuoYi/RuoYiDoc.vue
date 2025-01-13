<script setup>
const url = ref('http://doc.ruoyi.vip/ruoyi-vue')

function goto() {
  window.open(url.value)
}
</script>

<template>
  <div class="!inline-flex items-center justify-center">
    <svg-icon icon-class="question" @click="goto" />
  </div>
</template>
