<script setup>
import useAppStore from '@/store/modules/app'
import { useCssVar } from '@vueuse/core'
import { AppMain, Navbar, Settings, TagsView } from './components'
import AppBar from './components/app-bar/index.vue'
import Sidebar from './components/Sidebar/index.vue'

const { settings } = useSettings()
const { isCollapse, isMobile } = storeToRefs(useAppStore())
const breakpoints = useAppBreakpoints()
const sidevarDefaultWidth = useCssVar('--sidebar-default-width')
const sidevarCollapseWidth = useCssVar('--sidevar-collapse-width')
/**
 * 侧边栏真实占用的宽度
 */
const sidebarRealWidth = computed(() => {
  if (isMobile.value) {
    return '0px'
  }
  else if (isCollapse.value) {
    return sidevarCollapseWidth.value
  }
  else {
    return sidevarDefaultWidth.value
  }
})
const smaller_lg = breakpoints.smaller('lg')

watch(smaller_lg, () => {
  if (smaller_lg.value && !isMobile.value && !isCollapse.value) {
    isCollapse.value = true
  }
})

const settingRef = ref(null)
function setLayout() {
  settingRef.value.openSetting()
}
</script>

<template>
  <AppBar v-if="settings.showAppBar" />
  <div
    class="app-wrapper flex"
    :style="{ '--current-color': settings.theme }"
  >
    <Sidebar />
    <div
      class="main-container flex-1 max-w-full"
      :style="{
        width: `calc(100% - ${sidebarRealWidth})`,
      }"
    >
      <div
        :class="[
          settings.fixedHeader ? 'sticky' : '',
          settings.showAppBar ? 'top-[60px]' : 'top-0',
        ]"
        class="z-10 backdrop-blur-md"
      >
        <Navbar @set-layout="setLayout" />
        <TagsView v-if="settings.tagsView" />
      </div>
      <AppMain />
      <Settings ref="settingRef" />
    </div>
  </div>
</template>
