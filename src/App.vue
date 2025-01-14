<script setup>
import useSettingsStore from '@/store/modules/settings'
import { handleThemeStyle } from '@/utils/theme'
import { ElConfigProvider } from 'element-plus'
import useAppStore from './store/modules/app'

const { settings } = useSettingsStore()
const { size } = storeToRefs(useAppStore())
onMounted(() => {
  nextTick(() => {
    // 初始化主题样式
    handleThemeStyle(settings.theme)
  })
})
</script>

<template>
  <ElConfigProvider
    :size="size"
  >
    <router-view />
  </ElConfigProvider>
</template>
