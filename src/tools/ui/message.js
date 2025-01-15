/**
 * @typedef {import('element-plus').MessageOptions} MessageOptions
 * @typedef {import('element-plus').MessageOptionsWithType} MessageOptionsWithType
 */

/**
 * @typedef {Required<MessageOptions>['type']} MessageOptionsType
 * @typedef {Omit<MessageOptions, 'type' | 'message'>} MessageOptionsWithoutTypeAndMessage
 */

import { ElMessage } from 'element-plus'

/**
 * Create a base message with predefined options.
 *
 * @param {MessageOptionsType} type - The type of the message (e.g., 'success', 'warning', 'error', 'info').
 * @returns {(message: string, options?: MessageOptionsWithType) => void} A function to create and show a message.
 */
export function createBaseMessage(type) {
  /** @type {MessageOptionsWithoutTypeAndMessage} */
  const defaultOptions = {
    duration: 2000,
    showClose: true,
  }
  return (message, options = {}) => {
    return ElMessage({
      message,
      type,
      ...defaultOptions,
      ...options,
    })
  }
}
