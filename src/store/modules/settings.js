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

const LAYOUT_SETTING = 'LAYOUT_SETTING'

const useSettingsStore = defineStore(
  'settings',
  () => {
    const isDark = useDark()
    const __toggleTheme = useToggle(isDark)
    function toggleTheme() {
      __toggleTheme()
    }

    const initial_settings = {
      title: '',
      theme: '#00ced1',
      sideTheme,
      showSettings,
      topNav,
      tagsView,
      fixedHeader,
      sidebarLogo,
      dynamicTitle,
      isDark: isDark.value,
    }
    const settings = useLocalStorage(LAYOUT_SETTING, initial_settings)

    function setTitle(/** @type {string} */ title) {
      this.title = title
      if (settings.value.dynamicTitle) {
        document.title = `${settings.value.title} - ${defaultSettings.title}`
      }
      else {
        document.title = defaultSettings.title
      }
    }

    function resetSetting() {
      settings.value = initial_settings
    }
    return {
      setTitle,
      settings,
      toggleTheme,
      resetSetting,
    }
  },
)

export default useSettingsStore
