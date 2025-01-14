import { useCssVar, useLocalStorage } from '@vueuse/core'

const ELEMENT_PLUS_SIZE = 'ELEMENT_PLUS_SIZE'
const useAppStore = defineStore(
  'app',
  () => {
    const isCollapse = ref(false)
    const drawer = ref(false)
    const breakpoints = useAppBreakpoints()
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

export default useAppStore
