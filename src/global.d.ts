/* eslint-disable */
// @ts-nocheck
declare global {
  // @ts-ignore
  export type { ShallowRef } from 'vue'
  export type TemplateRef<T> = Readonly<ShallowRef<T | null>>
  import('vue')

  export type { ComponentSize } from 'element-plus'
  import('element-plus')
}

export {}
