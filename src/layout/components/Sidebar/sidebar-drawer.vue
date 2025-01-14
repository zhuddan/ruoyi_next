<script setup lang="ts">
import useAppStoreV2 from '@/store/modules/app-v2'

const appStore = useAppStoreV2()
const { drawer } = storeToRefs(appStore)
</script>

<template>
  <el-drawer
    v-model="drawer"
    direction="ltr"
    :with-header="false"
    body-class="overflow-hidden p-0 "
    class="!w-[var(--sidebar-width)]"
  >
    <slot />
  </el-drawer>
</template>
