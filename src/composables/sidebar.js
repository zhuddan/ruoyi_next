import useSettingsStore from '@/store/modules/settings'

export const variables = {
  // 默认主题变量
  menuText: '#bfcbd9',
  menuActiveText: '#409eff',
  menuBg: '#304156',
  menuHover: '#263445',
  // 浅色主题theme-light
  menuLightBg: '#ffffff',
  menuLightHover: '#f0f1f5',
  menuLightText: '#303133',
  menuLightActiveText: '#409eff',
}

export function useMenuStyle() {
  const {
    settings,
  } = storeToRefs(useSettingsStore())
  const menuBg = computed(() => {
    if (settings.value.isDark) {
      return variables.menuBg
    }
    return settings.value.sideTheme === 'theme-dark' ? variables.menuBg : variables.menuLightBg
  })

  // 获取菜单文字颜色
  const menuText = computed(() => {
    if (settings.value.isDark) {
      return variables.menuText
    }
    return settings.value.sideTheme === 'theme-dark' ? variables.menuText : variables.menuLightText
  })
  return {
    menuBg,
    menuText,
  }
}
