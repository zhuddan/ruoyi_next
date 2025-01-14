import { breakpointsTailwind, useBreakpoints, useLocalStorage } from '@vueuse/core'

const ELEMENT_PLUS_SIZE = 'ELEMENT_PLUS_SIZE'
const useAppStoreV2 = defineStore(
  'appV2',
  () => {
    const isCollapse = ref(false)
    const drawer = ref(false)
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const isMobile = breakpoints.smaller('md')
    /** @type {import('@vueuse/core').RemovableRef<ComponentSize>} */
    const size = useLocalStorage(
      ELEMENT_PLUS_SIZE,
      'default',
    )

    const isOpenSideBar = computed(() => {
      if (isMobile.value) {
        return drawer.value
      }
      else {
        return !isCollapse.value
      }
    })

    function toggle() {
      if (isMobile.value) {
        drawer.value = !drawer.value
      }
      else {
        isCollapse.value = !isCollapse.value
      }
    }

    watchEffect(() => {
      if (isMobile.value && isCollapse.value) {
        isCollapse.value = false
      }
    })
    return {
      isCollapse,
      isOpenSideBar,
      drawer,
      isMobile,
      toggle,
      size,
    }
  },
)

export default useAppStoreV2
