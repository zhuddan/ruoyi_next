<script setup>
import useSettingsStore from '@/store/modules/settings'
import { handleThemeStyle } from '@/utils/theme'
import { ElConfigProvider } from 'element-plus'
import useAppStoreV2 from './store/modules/app-v2'

const { theme } = useSettingsStore()
const { size } = storeToRefs(useAppStoreV2())
onMounted(() => {
  nextTick(() => {
    // 初始化主题样式
    handleThemeStyle(theme)
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
