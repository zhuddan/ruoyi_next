import { getDicts } from '@/api/system/dict/data'
import useDictStore from '@/store/modules/dict'

/**
 * @typedef {object} DictData
 * @property {string} label 键
 * @property {string} value 值
 */
/**
 * @template {string} T
 * @param {...T} args
 * @returns {{ [key in T]: Ref<DictData[]> }} 返回啥了
 */
export function useDict(...args) {
  /** @type {Ref<{ [key in T]: DictData[] }>} */
  const res = ref(/** @type {any} */({}))
  const dictStore = useDictStore()
  args.forEach((dictType) => {
    res.value[dictType] = []
    const dicts = dictStore.getDict(dictType)
    if (dicts) {
      res.value[dictType] = dicts
    }
    else {
      getDicts(dictType).then((resp) => {
        res.value[dictType] = resp.data.map(p => ({ label: p.dictLabel, value: p.dictValue, elTagType: p.listClass, elTagClass: p.cssClass }))
        dictStore.setDict(dictType, res.value[dictType])
      })
    }
  })
  return toRefs(res.value)
}
