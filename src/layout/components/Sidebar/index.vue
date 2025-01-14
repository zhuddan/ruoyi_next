<script setup lang="ts">
import useAppStore from '@/store/modules/app'
import SidebarBase from './sidebar-base.vue'
import SidebarDrawer from './sidebar-drawer.vue'

const { isMobile } = storeToRefs(useAppStore())
</script>

<template>
  <SidebarDrawer v-if="isMobile">
    <SidebarBase />
  </SidebarDrawer>
  <SidebarBase v-else />
</template>
