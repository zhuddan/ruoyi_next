import { download } from '@/utils/request'

/**
 * @template T
 * @template D
 * @typedef {object} UseBaseFormOptions
 * @property {D} [initial] 初始值
 * @property {(value: T)=>void} [callback] 选择器
 * @property {boolean} [setInitial] 选择器
 */

/**
 * @function useBaseForm 基础表单
 * @template T
 * @template D
 * @param {string} key
 * @param {(...args:any[]) => Promise<T>} [action] 选择器
 * @param {UseBaseFormOptions<T,D>} [options] 参数
 * @returns {{
 *  data: Ref<T|undefined>
 *  error: Ref<Error>
 *  loading: Ref<boolean>
 *  formRef: TemplateRef<import("element-plus").FormInstance>
 *  formData: Ref<Partial<D>>
 *  submit: () => Promise<void>
 *  reset(): void
 * }} result
 */
export function useBaseForm(
  key,
  action,
  options = {},
) {
  /**
   * @type {TemplateRef<import("element-plus").FormInstance>}
   */
  const formRef = useTemplateRef(key)

  const initialValue = /** @type {Ref<Partial<D>>} */(options.initial ?? {})

  const formData = ref(initialValue)

  const loading = ref(false)

  const data = ref()

  const error = ref()

  async function submit() {
    try {
      loading.value = true
      error.value = false
      data.value = await action(formData.value)
      options?.callback?.(data.value)
    }
    catch (e) {
      error.value = e
    }
    finally {
      loading.value = false
    }
  }

  function reset() {
    if (options.setInitial !== false) {
      formData.value = /** @type {any} */ (initialValue)
    }
    formRef.value?.resetFields()
  }

  return {
    formRef,
    formData,
    error,
    loading,
    data,
    submit,
    reset,
  }
}

const basePageParams = {
  pageNum: 1,
  pageSize: 10,
}

/**
 * @typedef {object} _UsePageFormQueryOptions
 * @property {string} [datakey] table data 的 key
 * @property {string} [downloadUrl] 下载地址
 */

/**
 * @template T
 * @template D
 * @typedef {UseBaseFormOptions<T,D> & _UsePageFormQueryOptions} usePageFormQueryOptions
 */
/**
 * @function usePageFormQuery
 * @template T
 * @template D
 * @param {string} key
 * @param {(...args:any[]) => Promise<T>} action
 * @param {usePageFormQueryOptions<T,D & Partial<typeof basePageParams>>} [options]
 */
export function usePageFormQuery(
  key,
  action,
  options = {},
) {
  const showSearch = ref(true)
  const total = ref(0)
  const initial /** @type {Ref<D & typeof basePageParams>} */= {
    ...basePageParams,
    ...options.initial,
  }
  const {
    formRef: queryRef,
    formData: queryParams,
    error,
    data: _data,
    submit: getList,
    reset,
    loading,
  } = useBaseForm(key, action, {
    setInitial: false,
    initial,
    callback: (res) => {
      total.value = /** @type {any} */(res).total
    },
    ...options,
  })

  const data = computed(() => _data.value?.[options.datakey ?? 'rows'])

  /** 搜索按钮操作 */
  function handleQuery() {
    // @ts-ignore
    queryParams.value.pageNum = 1
    getList()
  }

  /** 重置按钮操作 */
  function resetQuery() {
    reset()
    handleQuery()
  }
  /** 导出按钮操作 */
  function onExport() {
    if (options.downloadUrl) {
      download(options.downloadUrl, queryParams.value, `${key.replace(/ref/gi, '')}_${new Date().getTime()}.xlsx`)
    }
  }

  getList()
  return {
    error,
    data,
    queryRef,
    queryParams,
    loading,
    total,
    showSearch,
    getList,
    handleQuery,
    resetQuery,
    onExport,
  }
}

/**
 * @typedef {object} _UseModalFormOptions
 * @property {(row:any)=>Promise<void>} [beforeUpdate] 选择器
 * @property {string} [title] 选择器
 */

/**
 * @template T
 * @template D
 * @typedef {UseBaseFormOptions<T,D> & _UseModalFormOptions} UseModalFormOptions
 */
/**
 * @function useModalForm 表单
 * @template T
 * @template D
 * @param {string} key
 * @param {(...args:any[]) => Promise<T>} [action] 选择器
 * @param {UseModalFormOptions<T,D>} [options] 参数
 */
export function useModalForm(
  key,
  action,
  options = {},
) {
  const {
    formRef,
    formData,
    error,
    loading,
    data,
    submit,
    reset,
  } = useBaseForm(key, action, options)
  const open = ref(false)
  const _title = ref('')

  /** 修改按钮操作 */
  async function onUpdate(row) {
    reset()
    options.beforeUpdate(row)
    open.value = true
    _title.value = '修改'
  }

  /** 新增按钮操作 */
  function onAdd() {
    reset()
    open.value = true
    _title.value = '添加'
  }

  function cancel() {
    open.value = false
    reset()
  }

  const title = computed(() => _title.value + (options.title ?? ''))
  return {
    formRef,
    formData,
    error,
    loading,
    data,
    submit,
    open,
    title,
    onUpdate,
    onAdd,
    cancel,
  }
}
