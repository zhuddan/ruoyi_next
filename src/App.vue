<script setup>
import useSettingsStoreV2 from '@/store/modules/settings-v2'
import { handleThemeStyle } from '@/utils/theme'
import { ElConfigProvider } from 'element-plus'
import useAppStore from './store/modules/app'

const { settings } = useSettingsStoreV2()
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
