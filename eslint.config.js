import antfu from '@antfu/eslint-config'
import globals from './global-vars.js'

export default antfu({
  formatters: true,
  vue: true,
  languageOptions: {
    globals,
  },
  rules: {
    'vue/no-unused-refs': 'warn',
    'eqeqeq': 'warn',
    'vue/eqeqeq': 'warn',
    'no-unused-vars': 'warn',
    'unused-imports/no-unused-vars': 'warn',
    'vue/no-undef-properties': 'error',
    'prefer-spread': 'warn',
    'no-console': 'warn',
  },

})
