<!-- eslint-disable vue/no-undef-properties -->
<script>
import useAppStoreV2 from '@/store/modules/app-v2'

import { ElTooltip, menuItemEmits, menuItemProps, useNamespace } from 'element-plus'
import AppLink from './app-link.vue'
import useMenu from './use-menu'

const { isMobile, drawer } = storeToRefs(useAppStoreV2())
function throwError(scope, m) {
  throw new Error(`[${scope}] ${m}`)
}

const COMPONENT_NAME = 'menu-link-item'

export default defineComponent({
  name: COMPONENT_NAME,
  components: {
    ElTooltip,
    AppLink,
  },
  props: {
    ...menuItemProps,
    to: {
      type: String,
    },
  },
  emits: menuItemEmits,

  setup(props, { emit }) {
    const instance = getCurrentInstance()
    const rootMenu = inject('rootMenu')
    const nsMenu = useNamespace('menu')
    const nsMenuItem = useNamespace('menu-item')
    if (!rootMenu)
      throwError(COMPONENT_NAME, 'can not inject root menu')

    const { parentMenu, indexPath } = useMenu(instance, toRef(props, 'index'))

    const subMenu = inject(`subMenu:${parentMenu.value.uid}`)
    if (!subMenu)
      throwError(COMPONENT_NAME, 'can not inject sub menu')

    const active = computed(() => props.index === rootMenu.activeIndex)
    const item = reactive({
      index: props.index,
      indexPath,
      active,
    })

    const handleClick = () => {
      if (!props.disabled) {
        rootMenu.handleMenuItemClick({
          index: props.index,
          indexPath: indexPath.value,
          route: props.route,
        })
        emit('click', item)
        // 展开 drawer 的情况下点击菜单需要关闭
        if (isMobile.value && drawer.value) {
          drawer.value = false
        }
      }
    }

    onMounted(() => {
      subMenu.addSubMenu(item)
      rootMenu.addMenuItem(item)
    })

    onBeforeUnmount(() => {
      subMenu.removeSubMenu(item)
      rootMenu.removeMenuItem(item)
    })

    return {
      parentMenu,
      rootMenu,
      active,
      nsMenu,
      nsMenuItem,
      handleClick,
    }
  },
})
</script>

<template>
  <AppLink
    :to="to"
    :class="[
      nsMenuItem.b(),
      nsMenuItem.is('active', active),
      nsMenuItem.is('disabled', disabled),
    ]"
    role="menuitem"
    tabindex="-1"
    @click="handleClick"
  >
    <ElTooltip
      v-if="
        parentMenu.type.name === 'ElMenu'
          && rootMenu.props.collapse
          && $slots.title
      "
      :effect="rootMenu.props.popperEffect"
      placement="right"
      :fallback-placements="['left']"
      persistent
    >
      <template #content>
        <slot name="title" />
      </template>
      <div :class="nsMenu.be('tooltip', 'trigger')">
        <slot />
      </div>
    </ElTooltip>
    <template v-else>
      <slot />
      <slot name="title" />
    </template>
  </AppLink>
</template>
