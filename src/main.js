/* eslint-disable perfectionist/sort-imports */
import { createApp } from 'vue'

import ElementPlus from 'element-plus'

import ElementIcons from '@/components/SvgIcon/element-icons'

import App from './App.vue'

import directive from './directive'

import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/styles/index.scss' // global css
// svg图标
import 'virtual:svg-icons-register'
import './permission'
import { parseTime } from './utils/ruoyi'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(directive)
app.use(ElementIcons)
app.use(ElementPlus)
app.config.globalProperties.parseTime = parseTime
app.mount('#app')
