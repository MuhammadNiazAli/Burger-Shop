import { toast as sonnerToast } from 'vue-sonner'

export type ToastType = 'success' | 'error' | 'info'

function push(type: ToastType, title: string, message?: string) {
  const opts = { description: message, duration: 3400 }
  if (type === 'success') sonnerToast.success(title, opts)
  else if (type === 'error') sonnerToast.error(title, opts)
  else sonnerToast(title, opts)
}

export function useToast() {
  return {
    success: (title: string, message?: string) => push('success', title, message),
    error: (title: string, message?: string) => push('error', title, message),
    info: (title: string, message?: string) => push('info', title, message)
  }
}
