export type ToastType = 'success' | 'error' | 'info'

export interface ToastItem {
  id: number
  type: ToastType
  title: string
  message?: string
  duration: number
}

let counter = 0

export function useToast() {
  const toasts = useState<ToastItem[]>('cc_toasts', () => [])

  function dismiss(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  function push(type: ToastType, title: string, message?: string, duration = 3400) {
    const id = ++counter
    toasts.value = [...toasts.value, { id, type, title, message, duration }]
    if (import.meta.client) {
      setTimeout(() => dismiss(id), duration)
    }
    return id
  }

  return {
    toasts,
    dismiss,
    success: (title: string, message?: string) => push('success', title, message),
    error: (title: string, message?: string) => push('error', title, message),
    info: (title: string, message?: string) => push('info', title, message)
  }
}
