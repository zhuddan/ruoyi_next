<script setup>
import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'
import { AppMain, Navbar, Settings, TagsView } from './components'
import Sidebar from './components/Sidebar/index.vue'

const {
  theme,
  tagsView,
  fixedHeader,
} = toRefs(useSettingsStore())
const { isCollapse, isMobile } = storeToRefs(useAppStore())

const breakpoints = useAppBreakpoints()

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
  <div
    class="app-wrapper flex"
    :style="{ '--current-color': theme }"
  >
    <Sidebar />

    <div
      class="main-container flex-1 max-w-full"
    >
      <div
        :class="{ sticky: fixedHeader }"
        class="top-0 z-10 backdrop-blur-md"
      >
        <Navbar @set-layout="setLayout" />
        <TagsView v-if="tagsView" />
      </div>
      <AppMain />
      <Settings ref="settingRef" />
    </div>
  </div>
</template>
