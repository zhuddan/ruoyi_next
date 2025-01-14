<script setup>
import logo from '@/assets/logo/logo.png'

defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
})

const title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <div
    class="sidebar-logo-container bg-[var(--el-bg-color) text-[var(--el-text-color-regular)]"
    :class="{
      'sidebar-logo-container_collapse': collapse,
    }"
  >
    <router-link
      key="collapse"
      class="sidebar-logo-link  h-[50px] flex items-center  "
      :class="!collapse ? 'px-[20px]' : 'justify-center'"
      to="/"
    >
      <img :src="logo" class="sidebar-logo size-[32px]">
      <h1 v-if="!collapse" class="sidebar-title text-nowrap ml-1">
        {{ title }}
      </h1>
    </router-link>
  </div>
</template>
