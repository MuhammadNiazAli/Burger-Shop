export interface ConfirmOptions {
  title: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  tone?: 'default' | 'danger'
}

interface ConfirmState extends ConfirmOptions {
  open: boolean
  resolve?: (value: boolean) => void
}

export function useConfirm() {
  const state = useState<ConfirmState>('cc_confirm_state', () => ({
    open: false,
    title: '',
    message: '',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    tone: 'default'
  }))

  function ask(options: ConfirmOptions): Promise<boolean> {
    return new Promise((resolve) => {
      state.value = {
        open: true,
        title: options.title,
        message: options.message,
        confirmLabel: options.confirmLabel || 'Confirm',
        cancelLabel: options.cancelLabel || 'Cancel',
        tone: options.tone || 'default',
        resolve
      }
    })
  }

  function settle(result: boolean) {
    state.value.resolve?.(result)
    state.value = { ...state.value, open: false, resolve: undefined }
  }

  return { state, ask, settle }
}
