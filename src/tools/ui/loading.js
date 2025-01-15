import { ElLoading } from 'element-plus'

let loadingInstance
/**
 * 打开loading
 * @param {string} content
 */
export function showLoading(content) {
  loadingInstance = ElLoading.service({
    lock: true,
    text: content,
    background: 'rgba(0, 0, 0, 0.7)',
  })
}
/**
 * 关闭loading
 */
export function hideLoading() {
  loadingInstance.close()
}
