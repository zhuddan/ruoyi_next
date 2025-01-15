/**
 * @typedef {import('element-plus').NotificationOptions} NotificationOptions
 */

/**
 * @typedef {Required<NotificationOptions>['type']} ModelType
 * @typedef {Partial<Omit<NotificationOptions, 'type' | 'message'>>} NotificationOptionsWithoutTypeAndMessage
 */

import { ElNotification } from 'element-plus'

/**
 * Create a base modal notification with predefined options.
 *
 * @param {ModelType} type - The type of the notification (e.g., 'success', 'warning', 'error', 'info').
 * @param {NotificationOptionsWithoutTypeAndMessage} [options] - Additional options for the notification.
 * @returns {(message: string, title?: string, options?: NotificationOptionsWithoutTypeAndMessage) => void} A function to create and show a notification.
 */
export function createBaseModal(type, options = {}) {
  /** @type {NotificationOptionsWithoutTypeAndMessage} */
  const defaultOptions = {
    duration: 2000,
    ...options,
  }

  return (message, title = '提示', options = {}) => {
    return ElNotification({
      type,
      title,
      message,
      ...defaultOptions,
      ...options,
    })
  }
}
