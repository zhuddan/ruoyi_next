<script setup>
import { variables } from '@/composables/sidebar'

const title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <div
    :style="{
      backgroundColor: variables.menuBg,
      color: variables.menuText,
    }"
    class="sticky top-0 z-50"
  >
    <router-link
      key="collapse"
      class="sidebar-logo-link h-[60px] flex items-center  px-[20px]"
      to="/"
    >
      <img src="/logo.png" class="sidebar-logo size-[32px]">
      <h1 class="sidebar-title text-nowrap ml-1">
        {{ title }}
      </h1>
    </router-link>
  </div>
</template>
