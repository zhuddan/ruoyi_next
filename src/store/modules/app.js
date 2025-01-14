import Cookies from 'js-cookie'

/**
 * @typedef {object} Sidebar
 * @property {boolean} opened
 * @property {boolean} withoutAnimation
 * @property {boolean} hide
 */

/**
 * @typedef {object} State
 * @property {Sidebar} sidebar
 * @property {string} device
 * @property {string} size
 * @property {boolean} isCollapse
 * @property {boolean} drawer
 */
const useAppStore = defineStore(
  'app',
  {
    state: () => /** @type {State} */({
      sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false,
        hide: false,
      },
      device: 'desktop',
      size: Cookies.get('size') || 'default',
      isCollapse: false,
      drawer: false,
    }),
    actions: {
      toggleSideBar(withoutAnimation) {
        if (this.sidebar.hide) {
          return false
        }
        this.sidebar.opened = !this.sidebar.opened
        this.sidebar.withoutAnimation = withoutAnimation
        if (this.sidebar.opened) {
          Cookies.set('sidebarStatus', 1)
        }
        else {
          Cookies.set('sidebarStatus', 0)
        }
      },
      closeSideBar({ withoutAnimation }) {
        Cookies.set('sidebarStatus', 0)
        this.sidebar.opened = false
        this.sidebar.withoutAnimation = withoutAnimation
      },
      toggleDevice(device) {
        this.device = device
      },
      setSize(size) {
        this.size = size
        Cookies.set('size', size)
      },
      toggleSideBarHide(status) {
        this.sidebar.hide = status
      },
    },
  },
)

export default useAppStore
