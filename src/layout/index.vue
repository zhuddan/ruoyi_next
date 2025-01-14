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

<style lang="scss" scoped>
// @import '@/assets/styles/mixin.scss';
// @import '@/assets/styles/variables.module.scss';

// .app-wrapper {
//   // @include clearfix;
//   position: relative;
//   height: 100%;
//   width: 100%;
//   // &.mobile.openSidebar {
//   //   position: fixed;
//   //   top: 0;
//   // }
// }

// .drawer-bg {
//   background: #000;
//   opacity: 0.3;
//   width: 100%;
//   top: 0;
//   height: 100%;
//   position: absolute;
//   z-index: 999;
// }

// .fixed-header {
//   position: fixed;
//   top: 0;
//   right: 0;
//   z-index: 9;
//   width: calc(100% - #{$base-sidebar-width});
//   transition: width 0.28s;
// }

// .hideSidebar .fixed-header {
//   width: calc(100% - 54px);
// }

// .sidebarHide .fixed-header {
//   width: 100%;
// }

// .mobile .fixed-header {
//   width: 100%;
// }
</style>
