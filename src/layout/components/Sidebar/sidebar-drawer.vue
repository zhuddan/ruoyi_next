<script setup lang="ts">
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()
const { drawer } = storeToRefs(appStore)
</script>

<template>
  <el-drawer
    v-model="drawer"
    direction="ltr"
    :with-header="false"
    body-class="overflow-hidden p-0 "
    class="!w-[var(--sidebar-default-width)]"
  >
    <slot />
  </el-drawer>
</template>
