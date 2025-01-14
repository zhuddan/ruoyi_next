import defaultSettings from '@/settings'
import { useDark, useLocalStorage, useToggle } from '@vueuse/core'

const {
  sideTheme,
  showSettings,
  topNav,
  tagsView,
  fixedHeader,
  sidebarLogo,
  dynamicTitle,
} = defaultSettings

// const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || ''

const LAYOUT_SETTING = 'LAYOUT_SETTING'
const useSettingsStore = defineStore(
  'settings',
  () => {
    const isDark = useDark()
    const toggleTheme = useToggle(isDark)

    const settings = useLocalStorage(LAYOUT_SETTING, {
      title: '',
      theme: '#409EFF',
      sideTheme,
      showSettings,
      topNav,
      tagsView,
      fixedHeader,
      sidebarLogo,
      dynamicTitle,
      isDark: isDark.value,
    })

    function setTitle(title) {
      this.title = title
      if (settings.value.dynamicTitle) {
        document.title = `${settings.value.title} - ${defaultSettings.title}`
      }
      else {
        document.title = defaultSettings.title
      }
    }
    return {
      setTitle,
      toggleTheme,
      settings,
    }
  },
  //   state: () => ({
  //     title: '',
  //     theme: storageSetting.theme || '#409EFF',
  //     sideTheme: storageSetting.sideTheme || sideTheme,
  //     showSettings,
  //     topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
  //     tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
  //     fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
  //     sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
  //     dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle,
  //     isDark: isDark.value,
  //   }),
  //   actions: {
  //     // 修改布局设置
  //     changeSetting(data) {
  //       const { key, value } = data
  //       if (Object.prototype.hasOwnProperty.call(this, key)) {
  //         this[key] = value
  //       }
  //     },
  //     // 设置网页标题
  //     setTitle(title) {
  //       this.title = title
  //       useDynamicTitle()
  //     },
  //     // 切换暗黑模式
  //     toggleTheme() {
  //       this.isDark = !this.isDark
  //       toggleDark()
  //     },
  //   },
  // },
)

export default useSettingsStore
