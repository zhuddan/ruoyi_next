<script setup>
import variables from '@/assets/styles/variables.module.scss'
import useAppStore from '@/store/modules/app'
import usePermissionStore from '@/store/modules/permission'
import useSettingsStoreV2 from '@/store/modules/settings-v2'
import AppLogo from './app-logo.vue'
import SidebarItem from './sidebar-item.vue'

const route = useRoute()
const {
  settings,
} = storeToRefs(useSettingsStoreV2())

const permissionStore = usePermissionStore()

const sidebarRouters = computed(() => permissionStore.sidebarRouters)
const { isCollapse } = storeToRefs(useAppStore())

// 获取菜单背景色
const getMenuBackground = computed(() => {
  if (settings.value.isDark) {
    return 'var(--sidebar-bg)'
  }
  return settings.value.sideTheme === 'theme-dark' ? variables.menuBg : variables.menuLightBg
})

// 获取菜单文字颜色
const getMenuTextColor = computed(() => {
  if (settings.value.isDark) {
    return 'var(--sidebar-text)'
  }
  return settings.value.sideTheme === 'theme-dark' ? variables.menuText : variables.menuLightText
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
    <AppLogo v-if="settings. sidebarLogo" :collapse="isCollapse" />
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
        :active-text-color="settings.theme"
        :collapse-transition="false"
        mode="vertical"
        :class="settings.sideTheme"
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
</template>

<style lang="scss" scoped>
.sidebar-container {
  background-color: v-bind(getMenuBackground);
  .scrollbar-wrapper {
    background-color: v-bind(getMenuBackground);
  }
}
</style>
