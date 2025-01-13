/* eslint-disable */
// @ts-nocheck
declare module 'vue' {
  interface ComponentCustomProperties {
    parseTime: typeof import('@/utils/ruoyi')['parseTime']
    handleTree: typeof import('@/utils/ruoyi')['handleTree']
    addDateRange: typeof import('@/utils/ruoyi')['addDateRange']
    selectDictLabel: typeof import('@/utils/ruoyi')['selectDictLabel']
    selectDictLabels: typeof import('@/utils/ruoyi')['selectDictLabels']
  }
}
declare global {
  // @ts-ignore
  export type { ShallowRef } from 'vue'
  export type TemplateRef<T> = Readonly<ShallowRef<T | null>>
  import('vue')
}

export {}
