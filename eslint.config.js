import antfu from '@antfu/eslint-config'
import globals from './global-vars.js'

export default antfu({
  formatters: true,
  vue: true,
  languageOptions: {
    globals,
  },
})
