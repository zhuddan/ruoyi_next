/**
 * @typedef {import('vue').ComponentInternalInstance} ComponentInternalInstance
 * @typedef {import('vue').Ref<string>} RefString
 */

/**
 * @param {ComponentInternalInstance} instance - The current component instance.
 * @param {RefString} currentIndex - A ref containing the current index.
 * @returns {{ parentMenu: import('vue').ComputedRef<ComponentInternalInstance>, indexPath: import('vue').ComputedRef<string[]> }}
 */
export default function useMenu(instance, currentIndex) {
  const indexPath = computed(() => {
    let parent = instance.parent
    const path = [currentIndex.value]
    while (parent.type.name !== 'ElMenu') {
      if (parent.props.index) {
        path.unshift(parent.props.index)
      }
      parent = parent.parent
    }
    return path
  })

  const parentMenu = computed(() => {
    let parent = instance.parent
    while (parent && !['ElMenu', 'ElSubMenu'].includes(parent.type.name)) {
      parent = parent.parent
    }
    return parent
  })

  return {
    parentMenu,
    indexPath,
  }
}
