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

<style lang="scss" scoped>
// @import '@/assets/styles/variables.module.scss';

// .sidebarLogoFade-enter-active {
//   transition: opacity 1.5s;
// }

// .sidebarLogoFade-enter,
// .sidebarLogoFade-leave-to {
//   opacity: 0;
// }

// .sidebar-logo-container {
//   position: relative;
//   width: 100%;
//   height: 50px;
//   line-height: 50px;
//   background: v-bind(getLogoBackground);
//   text-align: center;
//   overflow: hidden;

//   & .sidebar-logo-link {
//     height: 100%;
//     width: 100%;
//     display: flex !important;
//     align-items: center;

//     & .sidebar-logo {
//       width: 32px;
//       height: 32px;
//       vertical-align: middle;
//       margin-right: 12px;
//     }

//     & .sidebar-title {
//       display: inline-block;
//       margin: 0;
//       color: v-bind(getLogoTextColor);
//       font-weight: 600;
//       line-height: 50px;
//       font-size: 14px;
//       font-family:
//         Avenir,
//         Helvetica Neue,
//         Arial,
//         Helvetica,
//         sans-serif;
//       vertical-align: middle;
//       white-space: nowrap;
//     }
//   }

//   &.sidebar-logo-container_collapse {
//     .sidebar-logo {
//       margin-right: 0px;
//     }
//   }
// }
</style>
