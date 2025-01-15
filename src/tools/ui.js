import { createBaseConfirm } from './ui/confirm'
import { createBaseMessage } from './ui/message'
import { createBaseModal } from './ui/modal'

export * from './ui/loading'

// message
export const showMessage = createBaseMessage('info')

export const showSuccessMessage = createBaseMessage('success')
export const showErrorMessage = createBaseMessage('error')
export const showInfoMessage = createBaseMessage('info')
export const showWarningMessage = createBaseMessage('warning')

// comfirm
export const showConfirm = createBaseConfirm('info')

export const showSuccessConfirm = createBaseConfirm('success')
export const showErrorConfirm = createBaseConfirm('error')
export const showInfoConfirm = createBaseConfirm('info')
export const showWarningConfirm = createBaseConfirm('warning')

// alert
export const showAlert = createBaseConfirm('info', { showCancelButton: false })

export const showSuccessAlert = createBaseConfirm('success', { showCancelButton: false })
export const showErrorAlert = createBaseConfirm('error', { showCancelButton: false })
export const showInfoAlert = createBaseConfirm('info', { showCancelButton: false })
export const showWarningAlert = createBaseConfirm('warning', { showCancelButton: false })

// modal
export const showModal = createBaseModal('info')

export const showSuccessModal = createBaseModal('success')
export const showErrorModal = createBaseModal('error')
export const showInfoModal = createBaseModal('info')
export const showWarningModal = createBaseModal('warning')
