<script setup>
import useSettingsStore from '@/store/modules/settings'
import { handleThemeStyle } from '@/utils/theme'

onMounted(() => {
  const { theme } = useSettingsStore()
  nextTick(() => {
    // 初始化主题样式
    handleThemeStyle(theme)
  })
})
</script>

<template>
  <router-view />
</template>
