<script setup lang="ts">
import useAppStoreV2 from '@/store/modules/app-v2'
import SidebarBase from './sidebar-base.vue'
import SidebarDrawer from './sidebar-drawer.vue'

const { isMobile } = storeToRefs(useAppStoreV2())
</script>

<template>
  <SidebarDrawer v-if="isMobile">
    <SidebarBase />
  </SidebarDrawer>
  <SidebarBase v-else />
</template>
