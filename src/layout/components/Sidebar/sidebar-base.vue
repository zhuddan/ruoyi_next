<script setup>
import useAppStore from '@/store/modules/app'
import usePermissionStore from '@/store/modules/permission'
import AppLogo from './app-logo.vue'
import SidebarItem from './sidebar-item.vue'

const route = useRoute()
const { settings } = useSettings()
const { menuBg, menuText } = useMenuStyle()
const permissionStore = usePermissionStore()
const sidebarRouters = computed(() => permissionStore.sidebarRouters)
const { isCollapse } = storeToRefs(useAppStore())

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
        ? 'w-[var(--sidevar-collapse-width)]'
        : 'w-[var(--sidebar-default-width)]',
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
        :background-color="menuBg"
        :text-color="menuText"
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
  background-color: v-bind(menuBg);
  .scrollbar-wrapper {
    background-color: v-bind(menuBg);
  }
}
</style>
