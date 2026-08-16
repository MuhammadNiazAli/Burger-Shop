// Global, delegated ripple effect for every .btn-primary / .btn-outline /
// .ripple element site-wide — added once here instead of wiring a handler
// into every page that has a button, so new buttons get it for free.
export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  document.addEventListener(
    'pointerdown',
    (e) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>('.btn-primary, .btn-outline, .ripple')
      if (!target || target.hasAttribute('disabled')) return

      const rect = target.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 1.8
      const dot = document.createElement('span')
      dot.className = 'ripple-dot'
      dot.style.width = `${size}px`
      dot.style.height = `${size}px`
      dot.style.left = `${e.clientX - rect.left - size / 2}px`
      dot.style.top = `${e.clientY - rect.top - size / 2}px`

      const prevPosition = target.style.position
      const prevOverflow = target.style.overflow
      if (!prevPosition) target.style.position = 'relative'
      target.style.overflow = 'hidden'
      target.appendChild(dot)

      dot.addEventListener('animationend', () => {
        dot.remove()
        if (!target.querySelector('.ripple-dot')) {
          target.style.overflow = prevOverflow
        }
      })
    },
    { passive: true }
  )
})
