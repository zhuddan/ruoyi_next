import { useDict } from '@/utils/dict'
import { download } from '@/utils/request'
import {
  addDateRange,
  handleTree,
  parseTime,
  resetForm,
  selectDictLabel,
  selectDictLabels,
} from '@/utils/ruoyi'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn'
import Cookies from 'js-cookie'
import { createApp } from 'vue'

import App from './App.vue'

import directive from './directive'
// 注册指令
import plugins from './plugins'

import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/styles/index.scss' // global css
import './style.css'
// svg图标
import 'virtual:svg-icons-register'
import './permission'

const app = createApp(App)

// 全局方法挂载
app.config.globalProperties.useDict = useDict
app.config.globalProperties.download = download
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels

// 全局组件挂载

app.use(router)
app.use(store)
app.use(plugins)
app.use(directive)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, {
  locale,
  size: Cookies.get('size') || 'default',
})

app.mount('#app')
