/**
 *
 * @param {string} title
 * @param {(...args:any[]) => Promise<any>} [deleteCallback] 选择器
 * @param {(...args:any[]) => Promise<any>} [callback] 刷新
 */
export function useTableSelection(title, deleteCallback, callback) {
  const ids = ref([])
  const single = ref(true)
  const multiple = ref(true)
  /**
   *
   * @param {any[]} selection
   */
  function onSelectionChange(selection) {
    ids.value = selection.map(item => item.postId)
    single.value = selection.length !== 1
    multiple.value = !selection.length
  }
  /** 删除按钮操作 */
  function onDelete(id) {
    $modal.confirm(`是否确认删除${title}编号为"${id}"的数据项？`).then(() => {
      return deleteCallback(id)
    }).then(() => {
      callback?.()
      $modal.msgSuccess('删除成功')
    }).catch(() => {})
  }

  return {
    ids,
    single,
    multiple,
    onDelete,
    onSelectionChange,
  }
}
