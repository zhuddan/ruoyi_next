import useSettingsStore from '@/store/modules/settings'

export function useSettings() {
  const settingsStore = useSettingsStore()
  const { settings } = storeToRefs(settingsStore)

  return {
    settings,
    setTitle: settingsStore.setTitle,
    toggleTheme: settingsStore.toggleTheme,
    resetSetting: settingsStore.resetSetting,
  }
}
