<script setup>
import useAppStoreV2 from '@/store/modules/app-v2'
import { getNormalPath } from '@/utils/ruoyi'
import { isExternal } from '@/utils/validate'

import LinkItem from './menu-link-item.vue'

const props = defineProps({
  // route object
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: '',
  },
})

const onlyOneChild = ref(/** @type {any} */({}))

function hasOneShowingChild(children = [], parent) {
  if (!children) {
    children = []
  }
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    }
    onlyOneChild.value = item
    return true
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
};

function resolvePath(routePath, routeQuery) {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  if (routeQuery) {
    const query = JSON.parse(routeQuery)
    return { path: getNormalPath(`${props.basePath}/${routePath}`), query }
  }
  return getNormalPath(`${props.basePath}/${routePath}`)
}

function hasTitle(title) {
  if (title.length > 5) {
    return title
  }
  else {
    return ''
  }
}
const { isMobile, drawer } = storeToRefs(useAppStoreV2())
function handleClick() {
  // 展开 drawer 的情况下点击菜单需要关闭
  if (isMobile.value && drawer.value) {
    drawer.value = false
  }
}
</script>

<template>
  <template v-if="!item.hidden">
    <template
      v-if="hasOneShowingChild(item.children, item)
        && (!onlyOneChild.children || onlyOneChild.noShowingChildren)
        && !item.alwaysShow"
    >
      <template
        v-if="onlyOneChild.meta"
      >
        <LinkItem
          :index="resolvePath(onlyOneChild.path)"
          :to="resolvePath(onlyOneChild.path)"
          @click="handleClick()"
        >
          <el-icon class="icon-box" size="15">
            <svg-icon :icon-class="onlyOneChild.meta.icon" />
          </el-icon>
          <template #title>
            <span :title="hasTitle(onlyOneChild.meta.title)">{{ onlyOneChild.meta.title }}</span>
          </template>
        </LinkItem>
      </template>
    </template>

    <el-sub-menu v-else :index="resolvePath(item.path)" teleported>
      <template v-if="item.meta" #title>
        <el-icon class="icon-box" size="15">
          <svg-icon :icon-class="item.meta.icon" />
        </el-icon>
        <span :title="hasTitle(item.meta.title)">{{ item.meta.title }}</span>
      </template>
      <!-- <el-menu-item-group> -->
      <sidebar-item
        v-for="(child, index) in item.children"
        :key="child.path + index"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
      <!-- </el-menu-item-group> -->
    </el-sub-menu>
  </template>
</template>
