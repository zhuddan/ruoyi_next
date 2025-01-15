/**
 * @typedef {import('element-plus').ElMessageBoxOptions} ElMessageBoxOptions
 */

/**
 * @typedef {Required<ElMessageBoxOptions>['type']} ConfirmType
 * @typedef {Omit<ElMessageBoxOptions, 'type' | 'message' | 'title'>} MessageOptionsSimple
 */

import { ElMessageBox } from 'element-plus'

/**
 * Create a base confirm dialog with predefined options.
 *
 * @param {ConfirmType} type - The type of the confirm dialog (e.g., 'warning', 'info').
 * @param {MessageOptionsSimple} [_options] - Additional options for the confirm dialog.
 * @returns {(message: string, title?: string, options?: MessageOptionsSimple) => Promise<void>} A function to create and show a confirm dialog.
 */
export function createBaseConfirm(type, _options = {}) {
  /** @type {MessageOptionsSimple} */
  const defaultOptions = {
    showCancelButton: true,
    showConfirmButton: true,
    showClose: false,
    closeOnClickModal: false,
    closeOnHashChange: false,
    closeOnPressEscape: false,
    ..._options,
  }
  return (message, title = '提示', options = {}) => {
    return ElMessageBox({
      title,
      message,
      type,
      ...defaultOptions,
      ...options,
    })
  }
}
