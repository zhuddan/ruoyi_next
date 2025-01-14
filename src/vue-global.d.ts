/* eslint-disable */
// @ts-nocheck
declare module 'vue' {
  interface ComponentCustomProperties {
    parseTime: typeof import('@/utils/ruoyi')['parseTime']
  }
}
export {}
