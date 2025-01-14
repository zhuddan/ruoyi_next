<script setup>
import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import { ElMessageBox } from 'element-plus'
import AppBreadcrumb from './app-breadcrumb.vue'
import Doc from './doc.vue'
import Git from './git.vue'
import HeaderSearch from './header-search.vue'
import ScreenfullBtn from './screenfull-btn.vue'
import SizeSelect from './size-select.vue'
import ToggleBtn from './toggle-btn.vue'
import TopNav from './top-nav.vue'

const emits = defineEmits(['setLayout'])
const userStore = useUserStore()
const { isMobile } = storeToRefs(useAppStore())
const {
  settings,
  toggleTheme,
} = storeToRefs(useSettingsStore())

function handleCommand(command) {
  switch (command) {
    case 'setLayout':
      setLayout()
      break
    case 'logout':
      logout()
      break
    default:
      break
  }
}

function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    userStore.logOut().then(() => {
      location.href = '/index'
    })
  }).catch(() => { })
}

function setLayout() {
  emits('setLayout')
}
</script>

<template>
  <div class="navbar flex bg-[var(--el-bg-color) text-[var(--el-text-color-regular)]">
    <ToggleBtn />
    <AppBreadcrumb v-if="!settings.topNav" id="breadcrumb-container" class="breadcrumb-container" />

    <TopNav v-if="settings.topNav" id="topmenu-container" class="topmenu-container" />
    <div class="flex-1" />
    <div
      class=" flex items-center"
    >
      <template v-if="!isMobile">
        <HeaderSearch id="header-search" />

        <el-tooltip content="源码地址" effect="dark" placement="bottom">
          <Git id="ruoyi-git" />
        </el-tooltip>

        <el-tooltip content="文档地址" effect="dark" placement="bottom">
          <Doc id="ruoyi-doc" />
        </el-tooltip>

        <ScreenfullBtn />

        <el-tooltip content="主题模式" effect="dark" placement="bottom">
          <div class="inline-flex items-center justify-center h-full min-w-[34px] hover:cursor-pointer" @click="toggleTheme">
            <svg-icon v-if="settings.isDark" icon-class="sunny" />
            <svg-icon v-if="!settings.isDark" icon-class="moon" />
          </div>
        </el-tooltip>

        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <SizeSelect id="size-select" class="" />
        </el-tooltip>
      </template>

      <div class="mr-[20px]">
        <!-- <el-tooltip content="" effect="dark" placement="bottom"> -->
        <el-dropdown trigger="click" @command="handleCommand">
          <div class="h-[50px] flex items-center">
            <img
              :src="userStore.avatar" class="size-[40px] rounded-sm"
            >
            <el-icon>
              <caret-bottom />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link to="/user/profile">
                <el-dropdown-item>个人中心</el-dropdown-item>
              </router-link>
              <el-dropdown-item v-if="settings.showSettings" command="setLayout">
                <span>布局设置</span>
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- </el-tooltip> -->
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  // background: var(--navbar-bg);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    display: flex;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>
