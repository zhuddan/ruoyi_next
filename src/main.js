/* eslint-disable perfectionist/sort-imports */
import { createApp } from 'vue'

import ElementPlus from 'element-plus'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import locale from 'element-plus/es/locale/lang/zh-cn'

import Cookies from 'js-cookie'

import App from './App.vue'

import directive from './directive'

import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/styles/index.scss' // global css
import './style.css'
// svg图标
import 'virtual:svg-icons-register'
import './permission'
import { parseTime } from './utils/ruoyi'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(directive)
app.config.globalProperties.parseTime = parseTime

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, {
  locale,
  size: Cookies.get('size') || 'default',
})

app.mount('#app')
