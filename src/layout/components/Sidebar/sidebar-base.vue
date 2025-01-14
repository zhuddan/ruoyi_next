<script setup>
import variables from '@/assets/styles/variables.module.scss'
import useAppStoreV2 from '@/store/modules/app-v2'
import usePermissionStore from '@/store/modules/permission'
import useSettingsStore from '@/store/modules/settings'
import Logo from './Logo.vue'
import SidebarItem from './sidebar-item.vue'

const route = useRoute()
const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()

const sidebarRouters = computed(() => permissionStore.sidebarRouters)
const showLogo = computed(() => settingsStore.sidebarLogo)
const sideTheme = computed(() => settingsStore.sideTheme)
const theme = computed(() => settingsStore.theme)
const { isCollapse } = storeToRefs(useAppStoreV2())

// 获取菜单背景色
const getMenuBackground = computed(() => {
  if (settingsStore.isDark) {
    return 'var(--sidebar-bg)'
  }
  return sideTheme.value === 'theme-dark' ? variables.menuBg : variables.menuLightBg
})

// 获取菜单文字颜色
const getMenuTextColor = computed(() => {
  if (settingsStore.isDark) {
    return 'var(--sidebar-text)'
  }
  return sideTheme.value === 'theme-dark' ? variables.menuText : variables.menuLightText
})
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return /** @type {string} */ (meta.activeMenu)
  }
  return path
})
</script>

<template>
  <div
    :class="[
      {
        'sidebar-container_collapse': isCollapse,
      },
      isCollapse
        ? 'w-[calc(var(--el-menu-icon-width)_+_var(--el-menu-base-level-padding)_*_2)]'
        : 'w-[var(--sidebar-width)]',
    ]"
    class="sidebar-container  h-[100vh] flex-shrink-0 transition-[width] sticky top-0"
    style="border-right: 1px solid var(--el-menu-border-color);"
  >
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar
      wrap-class="scrollbar-wrapper"
      class="h-[calc(100vh_-_50px)]"
    >
      <el-menu
        class="!border-r-0"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="getMenuBackground"
        :text-color="getMenuTextColor"
        :unique-opened="true"
        :active-text-color="theme"
        :collapse-transition="false"
        mode="vertical"
        :class="sideTheme"
      >
        <SidebarItem
          v-for="(it, index) in sidebarRouters"
          :key="it.path + index"
          :item="it"
          :base-path="it.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
  <!-- <el-drawer
    v-model="sidebar.opened"
    direction="ltr"
    :with-header="false"
    body-class="overflow-hidden p-0 "
    class="!w-[var(--sidebar-width)]"
  >
  </el-drawer> -->
</template>

<style lang="scss" scoped>
.sidebar-container {
  background-color: v-bind(getMenuBackground);

  .scrollbar-wrapper {
    background-color: v-bind(getMenuBackground);
  }

  // .el-menu {
  //   border: none;
  //   height: 100%;
  //   width: 100% !important;

  //   .el-menu-item,
  //   .el-sub-menu__title {
  //     &:hover {
  //       background-color: var(--menu-hover, rgba(0, 0, 0, 0.06)) !important;
  //     }
  //   }

  //   .el-menu-item {
  //     color: v-bind(getMenuTextColor);

  //     &.is-active {
  //       color: var(--menu-active-text, #409eff);
  //       background-color: var(--menu-hover, rgba(0, 0, 0, 0.06)) !important;
  //     }
  //   }

  //   .el-sub-menu__title {
  //     color: v-bind(getMenuTextColor);
  //   }
  // }
}
</style>
