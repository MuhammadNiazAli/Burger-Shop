// Toast notifications are now powered by vue-sonner (rendered via <Toaster />
// in app.vue, themed in main.css under the [data-sonner-toaster] block).
// The success/error/info API below is kept identical to before so every
// existing call site (MenuCard, TheNavbar, CartDrawer, checkout, login, ...)
// needs zero changes.
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
